'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  // Liens pour utilisateur classique
  const userLinks = [
    { href: '/dashboard', label: 'Accueil' },
    { href: '/cours', label: 'Cours' },
    { href: '/offres', label: 'Offres' },
    { href: '/dossiers', label: 'Dossiers' },
    { href: '/contacts', label: 'Contacts' },
  ];
  // Liens pour admin
  const adminLinks = [
    { href: '/admin', label: 'Admin Home' },
    { href: '/admin/cours', label: 'Cours' },
    { href: '/admin/offres', label: 'Offres' },
    { href: '/dossiers', label: 'Dossiers' },
    { href: '/admin/contacts', label: 'Contacts' },
    { href: '/admin/messages', label: 'Messages' },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="flex justify-between items-center bg-blue-900 text-white px-10 py-5 shadow-xl rounded-b-2xl mb-8 text-lg border-b-4 border-blue-700/40" style={{minHeight:'70px'}}>
      <div className="flex gap-10">
        {links.map(link => (
          <Link key={link.href} href={link.href} className="!text-white hover:text-orange-300 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-white/10">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-6">
        {user && (
          <span className="flex items-center gap-2 font-semibold">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="inline-block"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"/></svg>
            {user.role === 'admin' ? 'Admin' : user.name}
          </span>
        )}
        <button onClick={handleLogout} className="bg-gradient-to-r from-fuchsia-600 via-blue-600 to-purple-600 hover:from-fuchsia-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border-2 border-white/10">
          Déconnexion
        </button>
      </div>
    </nav>
  );
} 