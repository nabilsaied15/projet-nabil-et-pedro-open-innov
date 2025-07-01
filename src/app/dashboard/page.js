'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddUserTableForm, setShowAddUserTableForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Redirection des non-admins vers la page des cours
      if (parsedUser.role !== 'admin') {
        router.push('/cours');
      } else {
        fetchCounts();
        fetchUsers();
        fetchCourses();
        fetchDossiersAndCandidatures();
      }
    }
  }, []);

  const fetchCounts = async () => {
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    const { count: courseCount } = await supabase
      .from('cours')
      .select('*', { count: 'exact', head: true });
    const { count: videoCount } = await supabase
      .from('videos')
      .select('*', { count: 'exact', head: true });

    if (userCount !== null) setUserCount(userCount);
    if (courseCount !== null) setCourseCount(courseCount);
    if (videoCount !== null) setVideoCount(videoCount);
    setIsLoading(false);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error && data) setUsers(data);
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('cours').select('*');
    if (!error && data) setCourses(data);
  };

  const fetchDossiersAndCandidatures = async () => {
    // Récupérer les dossiers
    const { data: dossiersData, error: dossiersError } = await supabase
      .from('dossiers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!dossiersError && dossiersData) {
      setDossiers(dossiersData);
    }

    // Récupérer les candidatures
    const { data: candidaturesData, error: candidaturesError } = await supabase
      .from('candidatures')
      .select(`
        *,
        dossiers (
          nom
        )
      `)
      .order('date_candidature', { ascending: false });

    if (!candidaturesError && candidaturesData) {
      setCandidatures(candidaturesData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">


      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Tableau de bord 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 text-white rounded-xl shadow-md p-6 text-center border border-gray-700">
            <p className="text-4xl font-bold mb-2 text-blue-400">{userCount}</p>
            <p className="text-lg font-semibold">Utilisateurs</p>
          </div>
          <div className="bg-gray-800 text-white rounded-xl shadow-md p-6 text-center border border-gray-700">
            <p className="text-4xl font-bold mb-2 text-blue-400">{courseCount}</p>
            <p className="text-lg font-semibold">Cours</p>
          </div>
          <div className="bg-gray-800 text-white rounded-xl shadow-md p-6 text-center border border-gray-700">
            <p className="text-4xl font-bold mb-2 text-blue-400">{videoCount}</p>
            <p className="text-lg font-semibold">Vidéos</p>
          </div>
        </div>

        {/* BOUTON POUR AFFICHER LE FORMULAIRE AJOUT UTILISATEUR */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowAddUserTableForm(f => !f)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors"
          >
            {showAddUserTableForm ? '– Fermer le formulaire' : '➕ Ajouter un utilisateur'}
          </button>
        </div>
        {showAddUserTableForm && (
          <div className="mb-8 max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-center text-blue-300">Ajouter un utilisateur</h3>
            <AddUserTableForm onUserAdded={fetchUsers} />
          </div>
        )}

        {/* TABLE UTILISATEURS */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <a href="/admin" className="block">
              <h3 className="text-xl font-bold mb-4 text-center hover:text-blue-400 transition-colors">Utilisateurs 👥</h3>
            </a>
            <div className="overflow-x-auto rounded-xl shadow-xl">
              <table className="w-full text-sm text-left border border-gray-700">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-700">ID</th>
                    <th className="px-6 py-3 border-b border-gray-700">Nom</th>
                    <th className="px-6 py-3 border-b border-gray-700">Email</th>
                    <th className="px-6 py-3 border-b border-gray-700">Rôle</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 text-white">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-800 border-b border-gray-700">
                      <td className="px-6 py-4 break-all">{u.id}</td>
                      <td className="px-6 py-4">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE COURS */}
          <div>
            <a href="/admin/cours" className="block">
              <h3 className="text-xl font-bold mb-4 text-center hover:text-blue-400 transition-colors">Cours 📚</h3>
            </a>
            <div className="overflow-x-auto rounded-xl shadow-xl">
              <table className="w-full text-sm text-left border border-gray-700">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-700">ID</th>
                    <th className="px-6 py-3 border-b border-gray-700">Titre</th>
                    <th className="px-6 py-3 border-b border-gray-700">Image</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 text-white">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-800 border-b border-gray-700">
                      <td className="px-6 py-4 break-all">{c.id}</td>
                      <td className="px-6 py-4">{c.title}</td>
                      <td className="px-6 py-4">
                        {c.image_url && <img src={c.image_url} alt={c.title} className="w-16 h-16 object-cover rounded" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TABLE DOSSIERS */}
        <div className="mt-10">
          <a href="/dossiers" className="block">
            <h3 className="text-xl font-bold mb-4 text-center hover:text-blue-400 transition-colors">Dossiers 📁</h3>
          </a>
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className="w-full text-sm text-left border border-gray-700">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-700">ID</th>
                  <th className="px-6 py-3 border-b border-gray-700">Nom</th>
                  <th className="px-6 py-3 border-b border-gray-700">Date de création</th>
                  <th className="px-6 py-3 border-b border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 text-white">
                {dossiers.map((dossier) => (
                  <tr key={dossier.id} className="hover:bg-gray-800 border-b border-gray-700">
                    <td className="px-6 py-4 break-all">{dossier.id}</td>
                    <td className="px-6 py-4">{dossier.nom}</td>
                    <td className="px-6 py-4">{new Date(dossier.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => router.push(`/mes-candidatures?dossier_id=${dossier.id}`)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Voir les candidatures
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLE CANDIDATURES */}
        <div className="mt-10">
          <a href="/mes-candidatures" className="block">
            <h3 className="text-xl font-bold mb-4 text-center hover:text-blue-400 transition-colors">Candidatures 📝</h3>
          </a>
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className="w-full text-sm text-left border border-gray-700">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-700">ID</th>
                  <th className="px-6 py-3 border-b border-gray-700">Entreprise</th>
                  <th className="px-6 py-3 border-b border-gray-700">Poste</th>
                  <th className="px-6 py-3 border-b border-gray-700">Dossier</th>
                  <th className="px-6 py-3 border-b border-gray-700">Date</th>
                  <th className="px-6 py-3 border-b border-gray-700">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 text-white">
                {candidatures.map((candidature) => (
                  <tr key={candidature.id} className="hover:bg-gray-800 border-b border-gray-700">
                    <td className="px-6 py-4 break-all">{candidature.id}</td>
                    <td className="px-6 py-4">{candidature.entreprise}</td>
                    <td className="px-6 py-4">{candidature.poste}</td>
                    <td className="px-6 py-4">{candidature.dossiers?.nom}</td>
                    <td className="px-6 py-4">{new Date(candidature.date_candidature).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`${
                        candidature.statut === 'Accepté' ? 'text-green-400' :
                        candidature.statut === 'Refusé' ? 'text-red-400' :
                        candidature.statut === 'Entretien' ? 'text-yellow-400' :
                        'text-gray-400'
                      }`}>
                        {candidature.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddUserTableForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    if (!name || !email || !role || !password) {
      setError('Tous les champs sont obligatoires.');
      setLoading(false);
      return;
    }
    // Vérifie si l'email existe déjà
    const { data: existing, error: checkError } = await supabase.from('users').select('*').eq('email', email);
    if (existing && existing.length > 0) {
      setError('Cet email existe déjà.');
      setLoading(false);
      return;
    }
    // Ajoute l'utilisateur dans la table users
    const { error: insertError } = await supabase.from('users').insert([
      { name, email, role, password }
    ]);
    if (insertError) {
      setError(`Erreur lors de l'ajout : ${insertError.message}`);
    } else {
      setMessage('Utilisateur ajouté !');
      setName(''); setEmail(''); setRole('user'); setPassword('');
      if (typeof onUserAdded === 'function') onUserAdded();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} className="rounded p-2 bg-gray-900 border border-gray-700 text-white" required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="rounded p-2 bg-gray-900 border border-gray-700 text-white" required />
      <select value={role} onChange={e => setRole(e.target.value)} className="rounded p-2 bg-gray-900 border border-gray-700 text-white" required>
        <option value="user">Utilisateur</option>
        <option value="admin">Admin</option>
      </select>
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="rounded p-2 bg-gray-900 border border-gray-700 text-white" required />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-2" disabled={loading}>
        {loading ? 'Ajout...' : 'Ajouter'}
      </button>
      {message && <div className="text-green-400 font-bold text-center">{message}</div>}
      {error && <div className="text-red-400 font-bold text-center">{error}</div>}
    </form>
  );
}