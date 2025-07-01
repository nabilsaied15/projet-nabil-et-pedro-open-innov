'use client';
import { useRef } from 'react';
import Link from 'next/link';

export default function Home() {

  const scrollToNav = () => {
  };

  return (
    <main className="flex flex-col items-center justify-center p-10 relative overflow-hidden min-h-screen">
      {/* Décor SVG */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="400" cy="300" r="300" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(400 300) scale(300)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <h1 className="text-5xl font-extrabold text-white mb-4 animate-fade-in drop-shadow-lg text-center">🚀 Bienvenue sur la Plateforme</h1>
      <p className="text-lg text-white/90 text-center max-w-xl mb-8 animate-slide-in">
        Gère les cours, les offres et les candidatures avec simplicité.
      </p>
      {/* Bouton Découvrir */}
      <button onClick={scrollToNav} className="mb-8 px-8 py-3 bg-white/20 hover:bg-white/40 text-white font-bold rounded-full shadow-lg backdrop-blur transition flex items-center gap-2 animate-scale-in">
        <span>Découvrir</span>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 5v14m0 0l-7-7m7 7l7-7"/></svg>
      </button>
      {/* Boutons principaux */}
      <div className="flex gap-6 mb-8 animate-fade-in">
        <Link href="/cours">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold transition-transform hover:scale-105">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 19V5a2 2 0 012-2h8a2 2 0 012 2v14m-6-4h6"/></svg>
            Utilisateur
          </button>
        </Link>
        <Link href="/admin-login">
          <button className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold transition-transform hover:scale-105">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            Administration
          </button>
        </Link>
      </div>
      {/* Citation ou slogan */}
      <div className="mt-8 text-center text-base text-white/70 italic animate-fade-in">
        "L'éducation est l'arme la plus puissante pour changer le monde." – Nelson Mandela
      </div>
    </main>
  );
}
