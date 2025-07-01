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
    <div className="min-h-screen bg-gray-900 text-white p-8">
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
        <form onSubmit={handleAddOffre} className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Poste</label>
            <input
              type="text"
              name="poste"
              value={formData.poste}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Entreprise</label>
            <input
              type="text"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Profil Recherché</label>
            <input
              type="text"
              name="profil_recherche"
              value={formData.profil_recherche}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Durée</label>
            <input
              type="text"
              name="duree"
              value={formData.duree}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Localisation</label>
            <input
              type="text"
              name="localisation"
              value={formData.localisation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Lien de l'offre</label>
            <input
              type="url"
              name="lien"
              value={formData.lien}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50">
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
            .map((offre) => (
              <div key={offre.id} className="bg-gray-800 rounded-xl shadow flex flex-col justify-between p-4">
                {editId === offre.id ? (
                  <>
                    <input type="text" name="poste" value={editData.poste || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Poste" />
                    <input type="text" name="entreprise" value={editData.entreprise || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Entreprise" />
                    <input type="text" name="profil_recherche" value={editData.profil_recherche || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Profil recherché" />
                    <input type="text" name="duree" value={editData.duree || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Durée" />
                    <input type="text" name="localisation" value={editData.localisation || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Localisation" />
                    <input type="url" name="lien" value={editData.lien || ''} onChange={handleEditChange} className="mb-2 w-full px-2 py-1 rounded bg-gray-700 text-white border border-gray-600" placeholder="Lien de l'offre" />
                    <div className="flex gap-2 mt-2">
                      <button onClick={handleEditSave} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">Enregistrer</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded">Annuler</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">{offre.poste} à {offre.entreprise}</h3>
                    <p className="text-gray-400 text-sm">Localisation: {offre.localisation}</p>
                    <p className="text-gray-400 text-sm">Durée: {offre.duree}</p>
                    <p className="text-gray-400 text-sm">Profil recherché: {offre.profil_recherche}</p>
                    {offre.lien && (
                      <a href={offre.lien} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Voir l'offre</a>
                    )}
                    <p className="text-gray-500 text-xs mt-2">Créé le: {new Date(offre.created_at).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleEditClick(offre)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">Modifier</button>
                      <button onClick={() => handleDelete(offre.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded">Supprimer</button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 