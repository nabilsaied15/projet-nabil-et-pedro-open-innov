'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingDossierId, setEditingDossierId] = useState(null);
  const [editingCandidatureId, setEditingCandidatureId] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [showAddDossierForm, setShowAddDossierForm] = useState(false);
  const [showAddCandidatureForm, setShowAddCandidatureForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [newCourse, setNewCourse] = useState({ title: '', image_url: '' });
  const [newDossier, setNewDossier] = useState({ nom: '', mot_de_passe: '' });
  const [newCandidature, setNewCandidature] = useState({
    entreprise: '',
    poste: '',
    date_candidature: '',
    statut: 'En attente',
    notes: '',
    dossier_id: ''
  });
  const [dossiers, setDossiers] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [dossiersCount, setDossiersCount] = useState(0);
  const [candidaturesPending, setCandidaturesPending] = useState(0);
  const [cvCount, setCvCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [addUserMessage, setAddUserMessage] = useState('');
  const [addUserError, setAddUserError] = useState('');
  // 1. Ajouter un état pour le fichier image
  const [newCourseImageFile, setNewCourseImageFile] = useState(null);
  const [newCourseImagePreview, setNewCourseImagePreview] = useState('');
  const [allRdvs, setAllRdvs] = useState([]);
  const [searchRdv, setSearchRdv] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/admin-login');
    } else {
      setUser(storedUser);
      fetchUsers();
      fetchCourses();
      fetchDossiers();
      fetchCandidatures();
      fetchAllRdvs();
    }
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase.from('users').select('*');
    if (data) setUsers(data);
    setIsLoading(false);
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('cours').select('*');
    console.log('Courses data (raw):', data);
    console.log('Courses error:', error);
    if (data) {
      setCourses(data);
    }
  };

  const fetchDossiers = async () => {
    try {
      const { data, error } = await supabase
        .from('dossiers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDossiers(data || []);
      setDossiersCount(data.length);
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
      setCandidaturesPending(data.filter(c => c.statut === 'En attente').length);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures:', error);
    }
  };

  const fetchCounts = async () => {
    // Fetch user count
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    console.log('User count data:', userCount);
    console.log('User count error:', userError);
    if (userCount !== null) setUserCount(userCount);
    if (userError) console.error('Error fetching user count:', userError);

    // Fetch course count
    const { count: courseCount, error: courseError } = await supabase
      .from('cours')
      .select('*', { count: 'exact', head: true });
    console.log('Course count data:', courseCount);
    console.log('Course count error:', courseError);
    if (courseCount !== null) setCourseCount(courseCount);
    if (courseError) console.error('Error fetching course count:', courseError);

    // Fetch video count (assuming table name is 'videos')
    const { count: videoCount, error: videoError } = await supabase
      .from('videos')
      .select('*', { count: 'exact', head: true });
    console.log('Video count data:', videoCount);
    console.log('Video count error:', videoError);
    if (videoCount !== null) setVideoCount(videoCount);
    if (videoError) console.error('Error fetching video count:', videoError);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const { error } = await supabase.from('users').delete().eq('id', userId);
      if (!error) setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleUserChange = (id, field, value) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const handleSaveUser = async (id) => {
    const userToUpdate = users.find(u => u.id === id);
    const { error } = await supabase.from('users').update({
      name: userToUpdate.name,
      email: userToUpdate.email,
      role: userToUpdate.role
    }).eq('id', id);
    if (!error) {
      setEditingUserId(null);
    }
  };

  const handleAddUser = async () => {
    const { name, email, password, role } = newUser;
    setAddUserMessage('');
    setAddUserError('');
    if (!name || !email || !password) return setAddUserError('Nom, email et mot de passe obligatoires.');
    const { data: existing, error: checkError } = await supabase.from('users').select('*').eq('email', email);
    if (existing && existing.length > 0) {
      setAddUserError('Cet email existe déjà.');
      return;
    }
    const { error: insertError } = await supabase.from('users').insert([{ name, email, password, role }]);
    if (insertError) {
      setAddUserError(insertError.message);
    } else {
      setAddUserMessage('Utilisateur ajouté !');
      fetchUsers();
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      setShowAddUserForm(false);
    }
  };

  const handleCourseChange = (id, field, value) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSaveCourse = async (id) => {
    const courseToUpdate = courses.find(c => c.id === id);
    const { error } = await supabase.from('cours').update({
      title: courseToUpdate.title,
      image_url: courseToUpdate.image_url
    }).eq('id', id);
    if (!error) {
      setEditingCourseId(null);
    }
  };

  const handleAddCourse = async () => {
    const { title } = newCourse;
    if (!title) return alert('Le titre est requis.');
    let image_url = '';
    if (newCourseImageFile) {
      // Upload image to Supabase Storage
      const fileExt = newCourseImageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('uploads').upload(fileName, newCourseImageFile);
      if (error) {
        alert('Erreur lors de l\'upload de l\'image');
        return;
      }
      image_url = supabase.storage.from('uploads').getPublicUrl(fileName).data.publicUrl;
    }
    const { error } = await supabase.from('cours').insert([{ title, image_url }]);
    if (!error) {
      fetchCourses();
      setNewCourse({ title: '', image_url: '' });
      setNewCourseImageFile(null);
      setNewCourseImagePreview('');
      setShowAddCourseForm(false);
    } else {
      alert('Erreur lors de l\'ajout');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      const { error } = await supabase.from('cours').delete().eq('id', courseId);
      if (!error) {
        setCourses(courses.filter(c => c.id !== courseId));
      }
    }
  };

  const handleDossierChange = (id, field, value) => {
    setDossiers(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleSaveDossier = async (id) => {
    const dossierToUpdate = dossiers.find(d => d.id === id);
    const { error } = await supabase
      .from('dossiers')
      .update({
        nom: dossierToUpdate.nom,
        mot_de_passe: dossierToUpdate.mot_de_passe
      })
      .eq('id', id);
    if (!error) {
      setEditingDossierId(null);
    }
  };

  const handleAddDossier = async () => {
    const { nom, mot_de_passe } = newDossier;
    if (!nom || !mot_de_passe) return alert('Tous les champs sont requis.');
    const { data, error } = await supabase
      .from('dossiers')
      .insert([{ nom, mot_de_passe }]);
    if (!error) {
      fetchDossiers();
      setNewDossier({ nom: '', mot_de_passe: '' });
      setShowAddDossierForm(false);
    } else {
      alert('Erreur lors de l\'ajout');
    }
  };

  const handleDeleteDossier = async (dossierId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce dossier ?')) {
      const { error } = await supabase
        .from('dossiers')
        .delete()
        .eq('id', dossierId);
      if (!error) {
        setDossiers(dossiers.filter(d => d.id !== dossierId));
      }
    }
  };

  const handleCandidatureChange = (id, field, value) => {
    setCandidatures(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSaveCandidature = async (id) => {
    const candidatureToUpdate = candidatures.find(c => c.id === id);
    const { error } = await supabase
      .from('candidatures')
      .update({
        entreprise: candidatureToUpdate.entreprise,
        poste: candidatureToUpdate.poste,
        date_candidature: candidatureToUpdate.date_candidature,
        statut: candidatureToUpdate.statut,
        notes: candidatureToUpdate.notes,
        dossier_id: candidatureToUpdate.dossier_id
      })
      .eq('id', id);
    if (!error) {
      setEditingCandidatureId(null);
    }
  };

  const handleAddCandidature = async () => {
    const { entreprise, poste, date_candidature, statut, notes, dossier_id } = newCandidature;
    if (!entreprise || !poste || !date_candidature || !dossier_id) {
      return alert('Tous les champs obligatoires doivent être remplis.');
    }
    const { data, error } = await supabase
      .from('candidatures')
      .insert([{ entreprise, poste, date_candidature, statut, notes, dossier_id }]);
    if (!error) {
      fetchCandidatures();
      setNewCandidature({
        entreprise: '',
        poste: '',
        date_candidature: '',
        statut: 'En attente',
        notes: '',
        dossier_id: ''
      });
      setShowAddCandidatureForm(false);
    } else {
      alert('Erreur lors de l\'ajout');
    }
  };

  const handleDeleteCandidature = async (candidatureId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      const { error } = await supabase
        .from('candidatures')
        .delete()
        .eq('id', candidatureId);
      if (!error) {
        setCandidatures(candidatures.filter(c => c.id !== candidatureId));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const pendingCount = candidatures.filter(c => c.statut === 'En attente').length;

  const totalDossiers = dossiers.length;
  const enAttente = candidatures.filter(c => c.statut === 'En attente').length;
  const acceptees = candidatures.filter(c => c.statut === 'Accepté').length;
  const refusees = candidatures.filter(c => c.statut === 'Refusé').length;
  const entretiens = candidatures.filter(c => c.statut === 'Entretien').length;

  const fetchAllRdvs = async () => {
    const { data, error } = await supabase.from('rdvs2').select('*');
    if (!error) setAllRdvs(data || []);
  };

  return (
    <div className="min-h-screen bg-white p-10 text-primary">
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">👑 Panneau d'administration</h2>

        <div className="flex justify-center gap-4 mb-6">
            <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === 'users' ? 'bg-primary text-white shadow' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            >
            Utilisateurs
            </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === 'courses' ? 'bg-primary text-white shadow' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Cours
          </button>
          <button
            onClick={() => setActiveTab('dossiers')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === 'dossiers' ? 'bg-primary text-white shadow' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Dossiers
            {dossiersCount > 0 && <span className="badge">{dossiersCount}</span>}
          </button>
          <button
            onClick={() => setActiveTab('candidatures')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === 'candidatures' ? 'bg-primary text-white shadow' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Candidatures
            {candidaturesPending > 0 && <span className="badge">{candidaturesPending}</span>}
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === 'contacts' ? 'bg-primary text-white shadow' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Contacts
          </button>
        </div>

        {activeTab === 'users' && (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAddUserForm(!showAddUserForm)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors"
              >
                {showAddUserForm ? '– Fermer le formulaire' : '➕ Ajouter un utilisateur'}
              </button>
            </div>

            {showAddUserForm && (
              <>
                <div
                  className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center"
                  onClick={() => setShowAddUserForm(false)}
                />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="bg-white text-blue-900 rounded-3xl p-8 border-2 border-blue-100 shadow-xl max-w-xl w-full relative animate-fade-in"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 text-2xl text-blue-400 hover:text-blue-700 font-bold"
                      onClick={() => setShowAddUserForm(false)}
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                    <h4 className="text-2xl font-bold mb-6 text-center">Ajouter un utilisateur</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Nom"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newUser.name}
                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Mot de passe"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                      />
                      <select
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                      >
                        <option value="" disabled hidden>Rôle</option>
                        <option value="user">Utilisateur</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <button
                      onClick={handleAddUser}
                      className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 border-2 border-white/10 text-lg"
                    >
                      Ajouter
                    </button>
                    {addUserMessage && <div className="text-green-600 font-bold mt-4 text-center animate-fade-in">{addUserMessage}</div>}
                    {addUserError && <div className="text-red-600 font-bold mt-4 text-center animate-fade-in">{addUserError}</div>}
                  </div>
                </div>
              </>
            )}

            <div className="overflow-x-auto border-2 border-blue-100 rounded-none">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-900">
                  <tr>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">ID</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Nom</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Email</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Rôle</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="px-6 py-4 border-b border-blue-100">{u.id}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingUserId === u.id ? (<input value={u.name || ''} onChange={e => handleUserChange(u.id, 'name', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{u.name}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingUserId === u.id ? (<input value={u.email || ''} onChange={e => handleUserChange(u.id, 'email', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{u.email}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingUserId === u.id ? (<select value={u.role} onChange={e => handleUserChange(u.id, 'role', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded"><option value="user">user</option><option value="admin">admin</option></select>) : (<span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs">{u.role}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100"><div className="flex gap-3">{editingUserId === u.id ? (<button onClick={() => handleSaveUser(u.id)} className="text-green-600 hover:text-green-400 text-sm">💾 Sauvegarder</button>) : (<button onClick={() => setEditingUserId(u.id)} className="text-blue-600 hover:text-blue-400 text-sm">✏️ Modifier</button>)}<button onClick={() => handleDeleteUser(u.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors">🗑️ Supprimer</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAddCourseForm(!showAddCourseForm)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors"
              >
                {showAddCourseForm ? '– Fermer le formulaire' : '➕ Ajouter un cours'}
              </button>
            </div>

            {showAddCourseForm && (
              <>
                <div
                  className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center"
                  onClick={() => setShowAddCourseForm(false)}
                />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="bg-white text-blue-900 rounded-3xl p-8 border-2 border-blue-100 shadow-xl max-w-xl w-full relative animate-fade-in"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 text-2xl text-blue-400 hover:text-blue-700 font-bold"
                      onClick={() => setShowAddCourseForm(false)}
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                    <h4 className="text-2xl font-bold mb-6 text-center">Ajouter un cours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Titre"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newCourse.title}
                        onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                        required
                      />
                      <input
                        type="file"
                        accept="image/*"
                        placeholder="Image"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        onChange={e => {
                          const file = e.target.files[0];
                          setNewCourseImageFile(file);
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = ev => setNewCourseImagePreview(ev.target.result);
                            reader.readAsDataURL(file);
                          } else {
                            setNewCourseImagePreview('');
                          }
                        }}
                      />
                      {newCourseImagePreview && (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden border-2 border-blue-100">
                          <img src={newCourseImagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAddCourse}
                      className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 border-2 border-white/10 text-lg"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="overflow-x-auto border-2 border-blue-100 rounded-none">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-900">
                  <tr>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">ID</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Titre</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Image</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, idx) => (
                    <tr key={course.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="px-6 py-4 border-b border-blue-100">{course.id}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingCourseId === course.id ? (<input value={course.title || ''} onChange={e => handleCourseChange(course.id, 'title', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{course.title}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingCourseId === course.id ? (<input value={course.image_url || ''} onChange={e => handleCourseChange(course.id, 'image_url', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (course.image_url && (<img src={course.image_url} alt={course.title} className="w-12 h-12 object-cover rounded" />))}</td>
                      <td className="px-6 py-4 border-b border-blue-100"><div className="flex gap-3">{editingCourseId === course.id ? (<button onClick={() => handleSaveCourse(course.id)} className="text-green-600 hover:text-green-400 text-sm">💾 Sauvegarder</button>) : (<button onClick={() => setEditingCourseId(course.id)} className="text-blue-600 hover:text-blue-400 text-sm">✏️ Modifier</button>)}<button onClick={() => handleDeleteCourse(course.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors">🗑️ Supprimer</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'dossiers' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-800 text-white rounded-lg p-4 text-center shadow">
                <div className="text-lg font-bold">{totalDossiers}</div>
                <div className="text-sm">Dossiers</div>
              </div>
              <div className="bg-yellow-600 text-white rounded-lg p-4 text-center shadow">
                <div className="text-lg font-bold">{enAttente}</div>
                <div className="text-sm">En attente</div>
              </div>
              <div className="bg-green-700 text-white rounded-lg p-4 text-center shadow">
                <div className="text-lg font-bold">{acceptees}</div>
                <div className="text-sm">Acceptées</div>
              </div>
              <div className="bg-red-700 text-white rounded-lg p-4 text-center shadow">
                <div className="text-lg font-bold">{refusees}</div>
                <div className="text-sm">Refusées</div>
              </div>
              <div className="bg-purple-700 text-white rounded-lg p-4 text-center shadow col-span-2 md:col-span-1">
                <div className="text-lg font-bold">{entretiens}</div>
                <div className="text-sm">Entretiens</div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAddDossierForm(!showAddDossierForm)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors"
              >
                {showAddDossierForm ? '– Fermer le formulaire' : '➕ Ajouter un dossier'}
              </button>
            </div>

            {showAddDossierForm && (
              <>
                <div
                  className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center"
                  onClick={() => setShowAddDossierForm(false)}
                />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="bg-white text-blue-900 rounded-3xl p-8 border-2 border-blue-100 shadow-xl max-w-xl w-full relative animate-fade-in"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 text-2xl text-blue-400 hover:text-blue-700 font-bold"
                      onClick={() => setShowAddDossierForm(false)}
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                    <h4 className="text-2xl font-bold mb-6 text-center">Ajouter un dossier</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Nom du dossier"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newDossier.nom}
                        onChange={e => setNewDossier({ ...newDossier, nom: e.target.value })}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Mot de passe"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newDossier.mot_de_passe}
                        onChange={e => setNewDossier({ ...newDossier, mot_de_passe: e.target.value })}
                        required
                      />
                    </div>
                    <button
                      onClick={handleAddDossier}
                      className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 border-2 border-white/10 text-lg"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="overflow-x-auto border-2 border-blue-100 rounded-none">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-900">
                  <tr>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">ID</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Nom</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Mot de passe</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Date de création</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Notifications</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dossiers.map((dossier, idx) => {
                    const dossierPending = candidatures.filter(c => c.dossier_id === dossier.id && c.statut === 'En attente').length;
                    return (
                      <tr key={dossier.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        <td className="px-6 py-4 border-b border-blue-100">{dossier.id}</td>
                        <td className="px-6 py-4 border-b border-blue-100">{editingDossierId === dossier.id ? (<input value={dossier.nom || ''} onChange={e => handleDossierChange(dossier.id, 'nom', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{dossier.nom}</span>)}</td>
                        <td className="px-6 py-4 border-b border-blue-100">{editingDossierId === dossier.id ? (<input type="text" value={dossier.mot_de_passe || ''} onChange={e => handleDossierChange(dossier.id, 'mot_de_passe', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span className="text-green-400">{dossier.mot_de_passe}</span>)}</td>
                        <td className="px-6 py-4 border-b border-blue-100">{new Date(dossier.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 border-b border-blue-100">{dossierPending > 0 && (<span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">{dossierPending}</span>)}</td>
                        <td className="px-6 py-4 border-b border-blue-100"><div className="flex gap-3">{editingDossierId === dossier.id ? (<button onClick={() => handleSaveDossier(dossier.id)} className="text-green-600 hover:text-green-400 text-sm">💾 Sauvegarder</button>) : (<button onClick={() => setEditingDossierId(dossier.id)} className="text-blue-600 hover:text-blue-400 text-sm">✏️ Modifier</button>)}<button onClick={() => handleDeleteDossier(dossier.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors">🗑️ Supprimer</button></div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'candidatures' && (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAddCandidatureForm(!showAddCandidatureForm)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors"
              >
                {showAddCandidatureForm ? '– Fermer le formulaire' : '➕ Ajouter une candidature'}
              </button>
            </div>

            {showAddCandidatureForm && (
              <>
                <div
                  className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center"
                  onClick={() => setShowAddCandidatureForm(false)}
                />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="bg-white text-blue-900 rounded-3xl p-8 border-2 border-blue-100 shadow-xl max-w-xl w-full relative animate-fade-in"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 text-2xl text-blue-400 hover:text-blue-700 font-bold"
                      onClick={() => setShowAddCandidatureForm(false)}
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                    <h4 className="text-2xl font-bold mb-6 text-center">Ajouter une candidature</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <select
                        value={newCandidature.dossier_id}
                        onChange={e => setNewCandidature({ ...newCandidature, dossier_id: e.target.value })}
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        required
                      >
                        <option value="" disabled hidden>Sélectionner un dossier</option>
                        {dossiers.map(dossier => (
                          <option key={dossier.id} value={dossier.id}>
                            {dossier.nom}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Entreprise"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newCandidature.entreprise}
                        onChange={e => setNewCandidature({ ...newCandidature, entreprise: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Poste"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newCandidature.poste}
                        onChange={e => setNewCandidature({ ...newCandidature, poste: e.target.value })}
                        required
                      />
                      <input
                        type="date"
                        placeholder="Date de candidature"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newCandidature.date_candidature}
                        onChange={e => setNewCandidature({ ...newCandidature, date_candidature: e.target.value })}
                        required
                      />
                      <select
                        value={newCandidature.statut}
                        onChange={e => setNewCandidature({ ...newCandidature, statut: e.target.value })}
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                      >
                        <option value="" disabled hidden>Statut</option>
                        <option value="En attente">En attente</option>
                        <option value="Entretien">Entretien</option>
                        <option value="Refusé">Refusé</option>
                        <option value="Accepté">Accepté</option>
                      </select>
                      <textarea
                        placeholder="Notes"
                        className="bg-blue-50 border-2 border-blue-100 text-blue-900 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-blue-400 transition"
                        value={newCandidature.notes}
                        onChange={e => setNewCandidature({ ...newCandidature, notes: e.target.value })}
                        rows="3"
                      />
                    </div>
                    <button
                      onClick={handleAddCandidature}
                      className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 border-2 border-white/10 text-lg"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="overflow-x-auto border-2 border-blue-100 rounded-none">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-900">
                  <tr>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">ID</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Dossier</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Entreprise</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Poste</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Date</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Statut</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatures.map((candidature, idx) => (
                    <tr key={candidature.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="px-6 py-4 border-b border-blue-100">{candidature.id}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{candidature.dossiers?.nom}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingCandidatureId === candidature.id ? (<input value={candidature.entreprise || ''} onChange={e => handleCandidatureChange(candidature.id, 'entreprise', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{candidature.entreprise}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingCandidatureId === candidature.id ? (<input value={candidature.poste || ''} onChange={e => handleCandidatureChange(candidature.id, 'poste', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{candidature.poste}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingCandidatureId === candidature.id ? (<input type="date" value={candidature.date_candidature || ''} onChange={e => handleCandidatureChange(candidature.id, 'date_candidature', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded w-full" />) : (<span>{new Date(candidature.date_candidature).toLocaleDateString()}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{editingCandidatureId === candidature.id ? (<select value={candidature.statut} onChange={e => handleCandidatureChange(candidature.id, 'statut', e.target.value)} className="bg-gray-100 border border-blue-200 text-blue-900 px-2 py-1 rounded"><option value="En attente">En attente</option><option value="Entretien">Entretien</option><option value="Refusé">Refusé</option><option value="Accepté">Accepté</option></select>) : (<span className={`${candidature.statut === 'Accepté' ? 'text-green-600' : candidature.statut === 'Refusé' ? 'text-red-600' : candidature.statut === 'Entretien' ? 'text-yellow-600' : 'text-gray-600'}`}>{candidature.statut}</span>)}</td>
                      <td className="px-6 py-4 border-b border-blue-100"><div className="flex gap-3">{editingCandidatureId === candidature.id ? (<button onClick={() => handleSaveCandidature(candidature.id)} className="text-green-600 hover:text-green-400 text-sm">💾 Sauvegarder</button>) : (<button onClick={() => setEditingCandidatureId(candidature.id)} className="text-blue-600 hover:text-blue-400 text-sm">✏️ Modifier</button>)}<button onClick={() => handleDeleteCandidature(candidature.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors">🗑️ Supprimer</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'contacts' && (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">Tous les rendez-vous</h2>
            <input
              type="text"
              placeholder="Rechercher par nom de contact..."
              className="mb-8 p-3 border-2 border-blue-100 rounded-xl w-full max-w-md mx-auto block text-blue-900 placeholder-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              value={searchRdv || ''}
              onChange={e => setSearchRdv(e.target.value)}
            />
            <div className="overflow-x-auto border-2 border-blue-100 rounded-none">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-900">
                  <tr>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Contact</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Date</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Heure</th>
                    <th className="px-6 py-3 border-b border-blue-100 font-bold text-base">Pris par</th>
                  </tr>
                </thead>
                <tbody>
                  {allRdvs
                    .filter(rdv => !searchRdv || (rdv.contactName && rdv.contactName.toLowerCase().includes(searchRdv.toLowerCase())))
                    .map((rdv, idx) => (
                      <tr key={rdv.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        <td className="px-6 py-4 border-b border-blue-100">{rdv.contactName}</td>
                        <td className="px-6 py-4 border-b border-blue-100">{rdv.date}</td>
                        <td className="px-6 py-4 border-b border-blue-100">{rdv.hour}h</td>
                        <td className="px-6 py-4 border-b border-blue-100">{rdv.userName || rdv.userEmail}</td>
                      </tr>
                    ))}
                  {allRdvs.length === 0 && (
                    <tr><td colSpan={4} className="text-center text-gray-400 py-8">Aucun rendez-vous</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}