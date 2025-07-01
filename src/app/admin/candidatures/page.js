'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminCandidaturesPage() {
  const router = useRouter();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCandidature, setEditingCandidature] = useState(null);
  const [filterStatut, setFilterStatut] = useState('Tous');
  const [filterDossier, setFilterDossier] = useState('Tous');
  const [dossiers, setDossiers] = useState([]);
  const [newCandidature, setNewCandidature] = useState({
    entreprise: '',
    poste: '',
    date_candidature: '',
    statut: 'En attente',
    notes: '',
    dossier_id: ''
  });

  useEffect(() => {
    checkUser();
    fetchDossiers();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Vérifier si l'utilisateur est admin
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('auth_id', user.id)
      .single();

    if (error || userData?.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchCandidatures();
  };

  const fetchDossiers = async () => {
    try {
      const { data, error } = await supabase
        .from('dossiers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDossiers(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des dossiers:', error);
    }
  };

  const fetchCandidatures = async () => {
    try {
      const { data, error } = await supabase
        .from('candidatures')
        .select(`
          *,
          dossiers (
            nom
          )
        `)
        .order('date_candidature', { ascending: false });

      if (error) throw error;
      setCandidatures(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCandidature) {
        const { data, error } = await supabase
          .from('candidatures')
          .update(newCandidature)
          .eq('id', editingCandidature.id)
          .select();

        if (error) throw error;

        setCandidatures(candidatures.map(c => 
          c.id === editingCandidature.id ? data[0] : c
        ));
      } else {
        const { data, error } = await supabase
          .from('candidatures')
          .insert([newCandidature])
          .select();

        if (error) throw error;

        setCandidatures([...candidatures, data[0]]);
      }

      setNewCandidature({
        entreprise: '',
        poste: '',
        date_candidature: '',
        statut: 'En attente',
        notes: '',
        dossier_id: ''
      });
      setEditingCandidature(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la création/modification de la candidature:', error);
      alert('Erreur lors de la création/modification de la candidature');
    }
  };

  const handleEdit = (candidature) => {
    setEditingCandidature(candidature);
    setNewCandidature({
      entreprise: candidature.entreprise,
      poste: candidature.poste,
      date_candidature: candidature.date_candidature,
      statut: candidature.statut,
      notes: candidature.notes || '',
      dossier_id: candidature.dossier_id
    });
    setShowForm(true);
  };

  const handleDelete = async (candidatureId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('candidatures')
        .delete()
        .eq('id', candidatureId);

      if (error) throw error;

      setCandidatures(candidatures.filter(c => c.id !== candidatureId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la candidature:', error);
      alert('Erreur lors de la suppression de la candidature');
    }
  };

  const filteredCandidatures = candidatures.filter(candidature => 
    (filterStatut === 'Tous' || candidature.statut === filterStatut) &&
    (filterDossier === 'Tous' || candidature.dossier_id === parseInt(filterDossier))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Administration des Candidatures</h2>
          <div className="flex gap-4">
            <select
              value={filterDossier}
              onChange={(e) => setFilterDossier(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="Tous">Tous les dossiers</option>
              {dossiers.map(dossier => (
                <option key={dossier.id} value={dossier.id}>
                  {dossier.nom}
                </option>
              ))}
            </select>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Entretien">Entretien</option>
              <option value="Refusé">Refusé</option>
              <option value="Accepté">Accepté</option>
            </select>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) {
                  setEditingCandidature(null);
                  setNewCandidature({
                    entreprise: '',
                    poste: '',
                    date_candidature: '',
                    statut: 'En attente',
                    notes: '',
                    dossier_id: ''
                  });
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              {showForm ? 'Annuler' : 'Ajouter une candidature'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3">
              {editingCandidature ? 'Modifier la candidature' : 'Nouvelle Candidature'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Dossier
                </label>
                <select
                  value={newCandidature.dossier_id}
                  onChange={(e) => setNewCandidature({ ...newCandidature, dossier_id: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  required
                >
                  <option value="">Sélectionner un dossier</option>
                  {dossiers.map(dossier => (
                    <option key={dossier.id} value={dossier.id}>
                      {dossier.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={newCandidature.entreprise}
                  onChange={(e) => setNewCandidature({ ...newCandidature, entreprise: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Poste
                </label>
                <input
                  type="text"
                  value={newCandidature.poste}
                  onChange={(e) => setNewCandidature({ ...newCandidature, poste: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date de candidature
                </label>
                <input
                  type="date"
                  value={newCandidature.date_candidature}
                  onChange={(e) => setNewCandidature({ ...newCandidature, date_candidature: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Statut
                </label>
                <select
                  value={newCandidature.statut}
                  onChange={(e) => setNewCandidature({ ...newCandidature, statut: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  required
                >
                  <option value="En attente">En attente</option>
                  <option value="Entretien">Entretien</option>
                  <option value="Refusé">Refusé</option>
                  <option value="Accepté">Accepté</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={newCandidature.notes}
                  onChange={(e) => setNewCandidature({ ...newCandidature, notes: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  rows="2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition duration-200 text-sm"
              >
                {editingCandidature ? 'Modifier' : 'Ajouter'} la candidature
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCandidatures.map((candidature) => (
            <div
              key={candidature.id}
              className="bg-[#121826] border border-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base text-white">{candidature.entreprise}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(candidature)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(candidature.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-xs mb-0.5">Dossier : {candidature.dossiers?.nom}</p>
              <p className="text-gray-400 text-xs mb-0.5">Poste : {candidature.poste}</p>
              <p className="text-gray-400 text-xs mb-0.5">
                Date : {new Date(candidature.date_candidature).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-xs mb-1">
                Statut : <span className={`${
                  candidature.statut === 'Accepté' ? 'text-green-400' :
                  candidature.statut === 'Refusé' ? 'text-red-400' :
                  candidature.statut === 'Entretien' ? 'text-yellow-400' :
                  'text-gray-400'
                }`}>{candidature.statut}</span>
              </p>
              {candidature.notes && (
                <p className="text-gray-400 text-xs mt-1 border-t border-gray-700 pt-1">
                  {candidature.notes}
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredCandidatures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {candidatures.length === 0 
                ? "Aucune candidature enregistrée."
                : "Aucune candidature ne correspond aux filtres sélectionnés."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 