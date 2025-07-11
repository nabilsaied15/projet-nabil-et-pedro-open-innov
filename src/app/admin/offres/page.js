'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

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

  const [user, setUser] = useState(null);

  const [postuleStatus, setPostuleStatus] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetchOffres();
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

  const handleEditSave = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase
      .from('offres')
      .update(editData)
      .eq('id', editId);
    if (error) {
      setError("Erreur lors de la modification : " + error.message);
    } else {
      setMessage('Offre modifiée avec succès!');
      setEditId(null);
      fetchOffres();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette offre ?')) return;
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase
      .from('offres')
      .delete()
      .eq('id', id);
    if (error) {
      setError("Erreur lors de la suppression : " + error.message);
    } else {
      setMessage('Offre supprimée avec succès!');
      fetchOffres();
    }
    setLoading(false);
  };

  // Calcul des types de poste uniques pour le filtre
  const postesUniques = Array.from(new Set(offres.map(o => o.poste).filter(Boolean)));

  // TODO: Add admin navigation bar here

  return (
    <div className="min-h-screen  p-10 text-primary">
      <h1 className="text-3xl font-bold mb-6">Gestion des Offres</h1>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        {showAddForm ? 'Annuler' : 'Ajouter une Offre'}
      </button>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {showAddForm && (
        <form onSubmit={handleAddOffre} className="mb-8 flex justify-center">
          <div className="bg-gray-100 border border-primary shadow-md rounded-2xl p-8 w-full max-w-lg">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Poste</label>
              <input
                type="text"
                name="poste"
                value={formData.poste}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg  border border-primary text-primary px-4 py-2 focus:border-accent mb-4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Entreprise</label>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg  border border-primary text-primary px-4 py-2 focus:border-accent mb-4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Profil Recherché</label>
              <input
                type="text"
                name="profil_recherche"
                value={formData.profil_recherche}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg  border border-primary text-primary px-4 py-2 focus:border-accent mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Durée</label>
              <input
                type="text"
                name="duree"
                value={formData.duree}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg  border border-primary text-primary px-4 py-2 focus:border-accent mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Localisation</label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg  border border-primary text-primary px-4 py-2 focus:border-accent mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Lien de l&apos;offre</label>
              <input
                type="url"
                name="lien"
                value={formData.lien}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg  border border-primary text-primary px-4 py-2 focus:border-accent mb-4"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white rounded-lg font-semibold px-6 py-2 mt-4 hover:bg-accent transition">
              {loading ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher une offre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none w-full md:w-1/2"
        />
        <select
          value={niveau}
          onChange={e => setNiveau(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none w-full md:w-1/4"
        >
          <option value="">Tous niveaux</option>
          <option value="bachelor">Bachelor</option>
          <option value="bts">BTS</option>
          <option value="master">Master</option>
        </select>
        <select
          value={posteFilter}
          onChange={e => setPosteFilter(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none w-full md:w-1/4"
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
            .map((offre) => {
              const statusClass = user && postuleStatus[offre.id] === 'yes'
                ? 'bg-success/10 ring-4 ring-success'
                : user && postuleStatus[offre.id] === 'no'
                ? 'bg-error/10 ring-4 ring-error'
                : '';
              return (
                <div
                  key={offre.id}
                  className={`bg-white border border-primary rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center text-center ${statusClass}`}
                  style={!statusClass ? {background:'white'} : {}}
                >
                  {editId === offre.id ? (
                    <>
                      <input type="text" name="poste" value={editData.poste || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded-lg bg-white border border-primary text-primary" placeholder="Poste" />
                      <input type="text" name="entreprise" value={editData.entreprise || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded-lg bg-white border border-primary text-primary" placeholder="Entreprise" />
                      <input type="text" name="profil_recherche" value={editData.profil_recherche || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded-lg bg-white border border-primary text-primary" placeholder="Profil recherché" />
                      <input type="text" name="duree" value={editData.duree || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded-lg bg-white border border-primary text-primary" placeholder="Durée" />
                      <input type="text" name="localisation" value={editData.localisation || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded-lg bg-white border border-primary text-primary" placeholder="Localisation" />
                      <input type="url" name="lien" value={editData.lien || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded-lg bg-white border border-primary text-primary" placeholder="Lien de l&apos;offre" />
                      <div className="flex gap-2 mt-2">
                        <button onClick={handleEditSave} className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold transition">Enregistrer</button>
                        <button onClick={() => setEditId(null)} className="bg-gray-300 hover:bg-gray-400 text-primary px-4 py-2 rounded-lg font-semibold transition">Annuler</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-primary">{offre.poste} à {offre.entreprise}</h3>
                      <p className="text-sm text-primary">Localisation: {offre.localisation}</p>
                      <p className="text-sm text-primary">Durée: {offre.duree}</p>
                      <p className="text-sm text-primary">Profil recherché: {offre.profil_recherche}</p>
                      {offre.lien && (
                        <a href={offre.lien} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-4 px-5 py-2 rounded-full font-bold shadow-lg transition-all duration-200 button text-base hover:underline" style={{ minWidth: '160px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7" /></svg>
                          Voir l&apos;offre
                        </a>
                      )}
                      <p className="text-xs mt-2 text-primary">Créé le: {new Date(offre.created_at).toLocaleString()}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleEditClick(offre)} className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold transition">Modifier</button>
                        <button onClick={() => handleDelete(offre.id)} className="bg-error hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">Supprimer</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
} 