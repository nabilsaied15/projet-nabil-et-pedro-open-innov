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

  const userLinks = [
    { href: '/dashboard', label: 'Accueil' },
    { href: '/cours', label: 'Cours' },
    { href: '/offres', label: 'Offres' },
    { href: '/dossiers', label: 'Dossiers' },
    { href: '/contacts', label: 'Contacts' },
  ];

  // Liens pour admin
  const adminLinks = [
    { href: '/dashboard', label: 'Dashboard' },
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
    <nav className="w-full bg-blue-900 text-white border-b border-white/20 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <span className="text-2xl font-bold tracking-wide select-none">
            EpsiZone
          </span>
          <div className="hidden md:flex gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-base font-medium hover:text-blue-300 hover:underline transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Profil + Logout */}
        <div className="flex items-center gap-6 pl-6 border-l border-white/20">
          {user && (
            <span className="hidden md:flex items-center gap-2 font-medium text-base">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path stroke="currentColor" strokeWidth="2" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
              </svg>
              {user.role === 'admin' ? 'Admin' : user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-1.5 font-semibold border border-white/30 transition duration-150"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
