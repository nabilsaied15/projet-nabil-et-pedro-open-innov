import Link from 'next/link';

const menu = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/admin', label: 'Utilisateurs', icon: '👥' },
  { href: '/admin/cours', label: 'Cours', icon: '📚' },
  { href: '/dossiers', label: 'Dossiers', icon: '📁' },
  { href: '/mes-candidatures', label: 'Candidatures', icon: '📝' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed top-0 left-0 z-30 shadow-xl">
      <div>
        <div className="flex items-center gap-3 px-6 py-8">
          <span className="text-2xl font-extrabold text-primary">EpsiZone</span>
        </div>
        <nav className="flex flex-col gap-2 mt-6">
          {menu.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-gray-700 hover:bg-accent/10 rounded-xl transition">
              <span className="text-xl">{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-6 py-8 border-t border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">👤</div>
        <div>
          <div className="font-bold text-gray-700">Admin</div>
          <div className="text-xs text-gray-400">admin@site.com</div>
        </div>
      </div>
    </aside>
  );
} 