'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DossiersPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [dossierOffres, setDossierOffres] = useState({});
  const [showAddDossierForm, setShowAddDossierForm] = useState(false);
  const [newDossier, setNewDossier] = useState({ nom: '', mot_de_passe: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    fetchDossiers();
  }, []);

  const fetchDossiers = async () => {
    try {
      const { data, error } = await supabase
        .from('dossiers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDossiers(data || []);

      // Récupérer les offres pour chaque dossier
      const offresPromises = data.map(async (dossier) => {
        const { data: offresData, error: offresError } = await supabase
          .from('dossier_offres')
          .select(`
            offre_id,
            offres (
              id,
              poste,
              entreprise,
              localisation,
              duree,
              lien,
              created_at
            )
          `)
          .eq('dossier_id', dossier.id);

        if (offresError) throw offresError;
        return { dossierId: dossier.id, offres: offresData.map(d => d.offres) };
      });

      const offresResults = await Promise.all(offresPromises);
      const offresMap = offresResults.reduce((acc, { dossierId, offres }) => {
        acc[dossierId] = offres;
        return acc;
      }, {});
      setDossierOffres(offresMap);
    } catch (error) {
      console.error('Erreur lors de la récupération des dossiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccess = async (dossier) => {
    if (user?.role === 'admin') {
      router.push(`/mes-candidatures?dossier_id=${dossier.id}`);
      return;
    }

    // Si le dossier n'a pas de mot de passe, accès direct
    if (!dossier.mot_de_passe) {
      router.push(`/mes-candidatures?dossier_id=${dossier.id}`);
      return;
    }

    setSelectedDossier(dossier);
    setPasswordInput('');
    setError('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Vérifier le mot de passe
      const { data, error } = await supabase
        .from('dossiers')
        .select('*')
        .eq('id', selectedDossier.id)
        .eq('mot_de_passe', passwordInput)
        .single();

      if (error) throw error;

      if (data) {
        // Mot de passe correct, rediriger vers le dossier
        router.push(`/mes-candidatures?dossier_id=${selectedDossier.id}`);
      } else {
        setError('Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe:', error);
      setError('Une erreur est survenue');
    }
  };

  const handleAddDossier = async () => {
    const { nom, mot_de_passe } = newDossier;
    if (!nom) return alert('Le nom du dossier est requis.');
    
    try {
      const { data, error } = await supabase
        .from('dossiers')
        .insert([{ 
          nom, 
          mot_de_passe: mot_de_passe || null,
          user_id: user.id 
        }])
        .select();

      if (error) throw error;

      setDossiers([...dossiers, data[0]]);
      setNewDossier({ nom: '', mot_de_passe: '' });
      setShowAddDossierForm(false);
    } catch (error) {
      console.error('Erreur lors de la création du dossier:', error);
      alert('Erreur lors de la création du dossier');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main content */}
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">📁 Dossiers de candidatures</h2>
          <button
            onClick={() => setShowAddDossierForm(!showAddDossierForm)}
            className="button px-2 py-1 rounded-full font-bold shadow transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 text-xs"
          >
            {showAddDossierForm ? 'Annuler' : 'Créer un dossier'}
          </button>
        </div>

        {showAddDossierForm && (
          <div className="rounded-xl p-6 mb-8 border border-primary bg-white">
            <h3 className="text-xl font-semibold mb-4">Nouveau dossier</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Nom du dossier
                </label>
                <input
                  type="text"
                  value={newDossier.nom}
                  onChange={(e) => setNewDossier({ ...newDossier, nom: e.target.value })}
                  className="w-full p-2 rounded border border-primary focus:outline-none"
                  placeholder="Ex: Recherche emploi 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Mot de passe (optionnel)
                </label>
                <input
                  type="password"
                  value={newDossier.mot_de_passe}
                  onChange={(e) => setNewDossier({ ...newDossier, mot_de_passe: e.target.value })}
                  className="w-full p-2 rounded border border-primary focus:outline-none"
                  placeholder="Laissez vide pour un accès sans mot de passe"
                />
              </div>
              <button
                onClick={handleAddDossier}
                className="button px-2 py-1 rounded-full font-bold shadow transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 text-xs"
              >
                Créer le dossier
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dossiers.map((dossier) => (
            <div key={dossier.id} className="rounded-xl p-6 border border-primary bg-white">
              <h3 className="text-xl font-semibold mb-2">{dossier.nom}</h3>
              <p className="text-sm mb-2">
                Créé le {new Date(dossier.created_at).toLocaleDateString()}
              </p>
              
              {/* Afficher les offres du dossier */}
              {dossierOffres[dossier.id]?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Offres likées :</h4>
                  <div className="space-y-2">
                    {dossierOffres[dossier.id].map((offre) => (
                      <div key={offre.id} className="rounded p-2 text-sm border border-primary bg-gray-100">
                        <p className="font-medium">{offre.poste}</p>
                        <p className="text-sm">{offre.entreprise}</p>
                        {offre.lien && (
                          <a
                            href={offre.lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline text-xs"
                          >
                            Voir l&apos;offre
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleAccess(dossier)}
                className="button px-2 py-1 rounded-full font-bold shadow transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 text-xs"
              >
                {user?.role === 'admin' ? 'Accéder' : 'Ouvrir'}
              </button>
            </div>
          ))}
        </div>

        {selectedDossier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-6 rounded-xl w-96 bg-white border border-primary">
              <h3 className="text-xl font-semibold mb-4">Accéder à {selectedDossier.nom}</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full border px-3 py-2 rounded"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                {error && <div className="text-error text-sm">{error}</div>}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 button px-2 py-1 rounded-full font-bold shadow transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 text-xs"
                  >
                    Accéder
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDossier(null)}
                    className="flex-1 px-2 py-1 rounded-full font-bold shadow transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 text-xs border border-primary"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 