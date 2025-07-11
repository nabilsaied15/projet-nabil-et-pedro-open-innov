'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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

  // Générer les stats par mois à partir des candidatures et utilisateurs
  function getMonthlyStats(items, dateField) {
    const stats = {};
    items.forEach(item => {
      const date = new Date(item[dateField]);
      if (isNaN(date)) return;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      stats[key] = (stats[key] || 0) + 1;
    });
    return stats;
  }

  // Générer les labels (mois) sur la période couverte
  function getLabels(stats1, stats2) {
    const allKeys = new Set([...Object.keys(stats1), ...Object.keys(stats2)]);
    const sorted = Array.from(allKeys).sort();
    return sorted;
  }

  // Calculer les stats
  const candidatureStats = getMonthlyStats(candidatures, 'date_candidature');
  const userStats = getMonthlyStats(users, 'created_at');
  const labels = getLabels(candidatureStats, userStats);

  // Générer les datasets dynamiquement
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Candidatures',
        data: labels.map(l => candidatureStats[l] || 0),
        fill: true,
        backgroundColor: 'rgba(46, 196, 182, 0.1)',
        borderColor: 'rgba(46, 196, 182, 1)',
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'Utilisateurs',
        data: labels.map(l => userStats[l] || 0),
        fill: true,
        backgroundColor: 'rgba(61, 169, 252, 0.1)',
        borderColor: 'rgba(61, 169, 252, 1)',
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#232946', font: { size: 14, weight: 'bold' } }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { color: '#eaeaea' },
        ticks: { color: '#232946', font: { size: 13 } }
      },
      y: {
        grid: { color: '#eaeaea' },
        ticks: { color: '#232946', font: { size: 13 } }
      },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Removed Sidebar */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Removed DashboardHeader */}
        <div className="flex flex-1 gap-8 p-8 max-w-[1600px] mx-auto">
          {/* Main content */}
          <main className="flex-1">
            {/* Cartes de stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="rounded-2xl shadow-lg p-8 text-center bg-white border border-[var(--primary)]">
                <div className="flex items-center justify-center mb-3">
                  <span className="inline-block bg-[var(--accent)] text-white rounded-full p-3 text-3xl shadow">👤</span>
                </div>
                <p className="text-5xl font-extrabold mb-2 text-[var(--primary)]">{userCount}</p>
                <p className="text-lg font-semibold text-gray-500">Utilisateurs</p>
              </div>
              <div className="rounded-2xl shadow-lg p-8 text-center bg-white border border-[var(--primary)]">
                <div className="flex items-center justify-center mb-3">
                  <span className="inline-block bg-purple-500 text-white rounded-full p-3 text-3xl shadow">📚</span>
                </div>
                <p className="text-5xl font-extrabold mb-2 text-[var(--primary)]">{courseCount}</p>
                <p className="text-lg font-semibold text-gray-500">Cours</p>
              </div>
              <div className="rounded-2xl shadow-lg p-8 text-center bg-white border border-[var(--primary)]">
                <div className="flex items-center justify-center mb-3">
                  <span className="inline-block bg-green-500 text-white rounded-full p-3 text-3xl shadow">🎬</span>
                </div>
                <p className="text-5xl font-extrabold mb-2 text-[var(--primary)]">1000</p>
                <p className="text-lg font-semibold text-gray-500">Vidéos</p>
              </div>
            </div>
            {/* Section Statistics (graphique) */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-[var(--primary)] min-h-[320px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-4 text-[var(--primary)]">Statistics</h3>
              <div className="w-full h-56 flex items-center justify-center">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            {/* TABLES (Utilisateurs, Cours, Dossiers, Candidatures) */}
            <div className="space-y-12">
              {/* Cours - courbe d'évolution */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-[var(--primary)] min-h-[320px] flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold mb-4 text-[var(--primary)]">Évolution des cours 📚</h3>
                <div className="w-full h-56 flex items-center justify-center">
                  <Line data={getCoursesChartData(courses)} options={chartOptions} />
                </div>
              </div>
              {/* Dossiers */}
              <div>
                <a href="/dossiers" className="block">
                  <h3 className="text-2xl font-bold mb-6 text-center text-[var(--primary)] flex items-center justify-center gap-2">
                    <span>Dossiers</span> <span className="text-2xl">📁</span>
                  </h3>
                </a>
                <div className="overflow-x-auto rounded-2xl shadow-xl bg-white border border-[var(--primary)]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--primary)] text-white sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nom</th>
                        <th className="px-6 py-3">Date de création</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dossiers.map((dossier, idx) => (
                        <tr key={dossier.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                          <td className="px-6 py-4 break-all">{dossier.id}</td>
                          <td className="px-6 py-4">{dossier.nom}</td>
                          <td className="px-6 py-4">{new Date(dossier.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => router.push(`/mes-candidatures?dossier_id=${dossier.id}`)}
                              className="text-[var(--accent)] hover:text-[var(--primary)] font-bold underline"
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
              {/* Candidatures */}
              <div>
                <a href="/mes-candidatures" className="block">
                  <h3 className="text-2xl font-bold mb-6 text-center text-[var(--primary)] flex items-center justify-center gap-2">
                    <span>Candidatures</span> <span className="text-2xl">📝</span>
                  </h3>
                </a>
                <div className="overflow-x-auto rounded-2xl shadow-xl bg-white border border-[var(--primary)]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--primary)] text-white sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Entreprise</th>
                        <th className="px-6 py-3">Poste</th>
                        <th className="px-6 py-3">Dossier</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidatures.map((candidature, idx) => (
                        <tr key={candidature.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                          <td className="px-6 py-4 break-all">{candidature.id}</td>
                          <td className="px-6 py-4">{candidature.entreprise}</td>
                          <td className="px-6 py-4">{candidature.poste}</td>
                          <td className="px-6 py-4">{candidature.dossiers?.nom}</td>
                          <td className="px-6 py-4">{new Date(candidature.date_candidature).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              candidature.statut === 'Accepté' ? 'bg-green-100 text-green-700' :
                              candidature.statut === 'Refusé' ? 'bg-red-100 text-red-700' :
                              candidature.statut === 'Entretien' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-200 text-gray-700'
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
            </div>
          </main>
          {/* Right panel (placeholders) */}
          <aside className="w-[350px] hidden xl:block flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <h3 className="text-lg font-bold mb-3 text-[var(--primary)] flex items-center gap-2"><span>⭐ Admins</span></h3>
              <p className="text-gray-500 mb-4 text-sm">Liste des administrateurs de la plateforme</p>
              <div className="flex -space-x-3">
                {users.filter(u => u.role === 'admin').slice(0, 5).map((admin, idx) => (
                  <div key={admin.id} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 inline-flex items-center justify-center text-lg relative group cursor-pointer" title={admin.name + ' (' + admin.email + ')'}>
                    <span>{admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}</span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-white text-gray-700 text-xs rounded shadow-lg px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none z-20 whitespace-nowrap">
                      {admin.name}<br/>{admin.email}
                    </div>
                  </div>
                ))}
                {users.filter(u => u.role === 'admin').length > 5 && (
                  <span className="ml-4 text-gray-400 text-sm font-bold">+{users.filter(u => u.role === 'admin').length - 5}</span>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold mb-3 text-[var(--primary)] flex items-center gap-2"><span>Dernières inscriptions</span></h3>
              <ul className="divide-y divide-gray-100">
                {users
                  .slice()
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map((u) => (
                    <li key={u.id} className="flex items-center gap-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">🧑‍💼</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-700">{u.name}</div>
                        <div className="text-gray-500 text-sm">{u.email}</div>
                      </div>
                      <div className="text-gray-400 text-xs">{new Date(u.created_at).toLocaleDateString()}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
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

function getCoursesChartData(courses) {
  // Générer les stats par mois à partir des cours
  const stats = {};
  courses.forEach(course => {
    const date = new Date(course.created_at);
    if (isNaN(date)) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    stats[key] = (stats[key] || 0) + 1;
  });
  const labels = Object.keys(stats).sort();
  // Dégradé pour Chart.js (utilise le contexte du canvas)
  // On utilise une couleur moderne (bleu-violet)
  return {
    labels,
    datasets: [
      {
        label: 'Cours créés',
        data: labels.map(l => stats[l] || 0),
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return 'rgba(99, 102, 241, 0.1)'; // fallback
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.25)'); // Indigo-500
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)'); // Violet-500
          return gradient;
        },
        borderColor: 'rgba(99, 102, 241, 1)', // Indigo-500
        borderWidth: 4,
        tension: 0.5,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(139, 92, 246, 1)', // Violet-500
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 8,
        shadowColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
  };
}