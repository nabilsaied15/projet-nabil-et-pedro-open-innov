'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminOffresPage() {
  const [offres, setOffres] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    poste: '',
    entreprise: '',
    profil_recherche: '',
    duree: '',
    localisation: '',
    lien: '',
  });

  const [lien, setLien] = useState('');

  const [search, setSearch] = useState("");
  const [niveau, setNiveau] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [posteFilter, setPosteFilter] = useState("");

  const [postuleStatus, setPostuleStatus] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupOffre, setPopupOffre] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchOffres();
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const checkOffreConsultee = () => {
      const offreId = localStorage.getItem('offre_consultee');
      if (offreId) {
        setPopupOffre(offreId);
        setShowPopup(true);
        localStorage.removeItem('offre_consultee');
      }
    };
    checkOffreConsultee();
    const status = localStorage.getItem('postule_status');
    if (status) setPostuleStatus(JSON.parse(status));
    // Ajout des écouteurs pour détecter le retour sur la page
    window.addEventListener('focus', checkOffreConsultee);
    document.addEventListener('visibilitychange', checkOffreConsultee);
    return () => {
      window.removeEventListener('focus', checkOffreConsultee);
      document.removeEventListener('visibilitychange', checkOffreConsultee);
    };
  }, []);

  const fetchOffres = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('offres')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des offres:', error);
      setError('Erreur lors de la récupération des offres.');
      setOffres([]);
    } else {
      setOffres(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOffre = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase
      .from('offres')
      .insert([formData]);

    if (error) {
      console.error('Erreur lors de l\'ajout de l\'offre:', error);
      setError('Erreur lors de l\'ajout de l\'offre.' + error.message);
    } else {
      setMessage('Offre ajoutée avec succès!');
      setFormData({
        poste: '',
        entreprise: '',
        profil_recherche: '',
        duree: '',
        localisation: '',
        lien: '',
      });
      setShowAddForm(false);
      fetchOffres(); // Refresh the list
    }
    setLoading(false);
  };

  const handleEditClick = (offre) => {
    setEditId(offre.id);
    setEditData({ ...offre });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoirOffre = (offre) => {
    localStorage.setItem('offre_consultee', offre.id);
    window.open(offre.lien, '_blank');
  };

  const handlePopupResponse = async (response) => {
    setShowPopup(false);
    if (!popupOffre || !user) return;
    const newStatus = { ...postuleStatus, [popupOffre]: response };
    setPostuleStatus(newStatus);
    localStorage.setItem('postule_status', JSON.stringify(newStatus));
    if (response === 'yes') {
      const { data: dossiers } = await supabase
        .from('dossiers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (dossiers && dossiers.length > 0) {
        const dossierId = dossiers[0].id;
        await supabase.from('candidatures').insert({
          dossier_id: dossierId,
          offre_id: popupOffre,
          date_candidature: new Date().toISOString().split('T')[0],
          statut: 'Postulé',
        });
      }
    }
    setPopupOffre(null);
  };

  // Calcul des types de poste uniques pour le filtre
  const postesUniques = Array.from(new Set(offres.map(o => o.poste).filter(Boolean)));

  // TODO: Add admin navigation bar here

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">


      {loading && <p>Chargement...</p>}
      {error && <p className="text-error">{error}</p>}
      {message && <p className="text-success">{message}</p>}

      {showAddForm && (
        <form onSubmit={handleAddOffre} className="p-6 rounded-lg shadow-md mb-8 space-y-4 bg-white border border-primary">
          <div>
            <label className="block text-sm font-medium text-primary">Poste</label>
            <input
              type="text"
              name="poste"
              value={formData.poste}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-primary shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Entreprise</label>
            <input
              type="text"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-primary shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Profil Recherché</label>
            <input
              type="text"
              name="profil_recherche"
              value={formData.profil_recherche}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-primary shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Durée</label>
            <input
              type="text"
              name="duree"
              value={formData.duree}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-primary shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Localisation</label>
            <input
              type="text"
              name="localisation"
              value={formData.localisation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-primary shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Lien de l&apos;offre</label>
            <input
              type="url"
              name="lien"
              value={formData.lien}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-primary shadow-sm"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full button">
            {loading ? 'Ajout en cours...' : 'Ajouter'}
          </button>
        </form>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher une offre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded border border-primary focus:outline-none w-full md:w-1/2"
        />
        <select
          value={niveau}
          onChange={e => setNiveau(e.target.value)}
          className="px-4 py-2 rounded border border-primary focus:outline-none w-full md:w-1/4"
        >
          <option value="">Tous niveaux</option>
          <option value="bachelor">Bachelor</option>
          <option value="bts">BTS</option>
          <option value="master">Master</option>
        </select>
        <select
          value={posteFilter}
          onChange={e => setPosteFilter(e.target.value)}
          className="px-4 py-2 rounded border border-primary focus:outline-none w-full md:w-1/4"
        >
          <option value="">Tous types de poste</option>
          {postesUniques.map(poste => (
            <option key={poste} value={poste}>{poste}</option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Liste des Offres</h2>
        {offres.length === 0 && !loading && <p>Aucune offre disponible.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offres
            .filter(offre =>
              (!search ||
                offre.poste?.toLowerCase().includes(search.toLowerCase()) ||
                offre.entreprise?.toLowerCase().includes(search.toLowerCase()) ||
                offre.profil_recherche?.toLowerCase().includes(search.toLowerCase()) ||
                offre.localisation?.toLowerCase().includes(search.toLowerCase())
              ) &&
              (!niveau || (offre.profil_recherche && offre.profil_recherche.toLowerCase().includes(niveau)))
              && (!posteFilter || offre.poste === posteFilter)
            )
            .map((offre) => (
              <div
                key={offre.id}
                className={`rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center text-center border border-primary 
                  ${user && postuleStatus[offre.id] === 'yes' ? 'bg-success/10 ring-4 ring-success' : ''}
                  ${user && postuleStatus[offre.id] === 'no' ? 'bg-error/10 ring-4 ring-error' : ''}`}
                style={!user || !postuleStatus[offre.id] ? {background:'white'} : {}}
              >
                {editId === offre.id ? (
                  <>
                    <input type="text" name="poste" value={editData.poste || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Poste" />
                    <input type="text" name="entreprise" value={editData.entreprise || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Entreprise" />
                    <input type="text" name="profil_recherche" value={editData.profil_recherche || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Profil recherché" />
                    <input type="text" name="duree" value={editData.duree || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Durée" />
                    <input type="text" name="localisation" value={editData.localisation || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Localisation" />
                    <input type="url" name="lien" value={editData.lien || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Lien de l&apos;offre" />
                    <div className="flex gap-2 mt-2">
                      <button onClick={handleEditSave} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">Enregistrer</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded">Annuler</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">{offre.poste} à {offre.entreprise}</h3>
                    <p className="text-sm">Localisation: {offre.localisation}</p>
                    <p className="text-sm">Durée: {offre.duree}</p>
                    <p className="text-sm">Profil recherché: {offre.profil_recherche}</p>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); handleVoirOffre(offre); }}
                      className={`flex items-center justify-center gap-2 mt-4 px-5 py-2 rounded-full font-bold shadow-lg transition-all duration-200 button text-base ${!offre.lien ? 'opacity-50 pointer-events-none grayscale' : ''}`}
                      style={{ minWidth: '160px', filter: !offre.lien ? 'grayscale(1)' : 'none' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7" /></svg>
                      Voir l&apos;offre
                    </a>
                    <p className="text-xs mt-2">Créé le: {new Date(offre.created_at).toLocaleString()}</p>

                  </>
                )}
              </div>
            ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-primary rounded-2xl p-10 shadow-2xl w-full max-w-md relative border-4 border-primary animate-fadeIn">
            <h2 className="text-2xl font-extrabold mb-6 text-center drop-shadow-lg">Avez-vous postulé à cette offre ?</h2>
            <div className="flex justify-center gap-8 mt-8">
              <button
                onClick={() => handlePopupResponse('yes')}
                className="px-8 py-4 text-xl font-bold rounded-full shadow-xl transition-all duration-200 bg-success text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
              >
                Oui
              </button>
              <button
                onClick={() => handlePopupResponse('no')}
                className="px-8 py-4 text-xl font-bold rounded-full shadow-xl transition-all duration-200 bg-error text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 