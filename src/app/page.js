'use client';
import { useRef } from 'react';
import Link from 'next/link';

export default function Home() {

  const scrollToNav = () => {
  };

  return (
    <main className="flex flex-col items-center justify-center p-10 relative overflow-hidden min-h-screen">
      {/* Animation de fond SVG animée */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none animate-float-bg" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex:0}}>
        <circle cx="200" cy="200" r="120" fill="url(#grad1)" fillOpacity="0.18">
          <animate attributeName="cy" values="200;400;200" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="400" r="180" fill="url(#grad2)" fillOpacity="0.13">
          <animate attributeName="cy" values="400;200;400" dur="10s" repeatCount="indefinite" />
        </circle>
        <defs>
          <radialGradient id="grad1" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(120)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3da9fc" />
            <stop offset="1" stopColor="#232946" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad2" cx="0" cy="0" r="1" gradientTransform="translate(600 400) scale(180)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#eebbc3" />
            <stop offset="1" stopColor="#232946" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
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
      <h1 className="text-5xl font-extrabold text-primary mb-4 text-center">🚀 Bienvenue sur la Plateforme</h1>
      <p className="text-lg text-primary text-center max-w-xl mb-8">
        Gère les cours, les offres et les candidatures avec simplicité.
      </p>
      {/* Bouton Découvrir */}
      <button onClick={scrollToNav} className="mb-8 px-8 py-3 bg-white/20 hover:bg-white/40 text-white font-bold rounded-full shadow-lg backdrop-blur transition flex items-center gap-2 animate-scale-in">
        <span>Découvrir</span>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 5v14m0 0l-7-7m7 7l7-7"/></svg>
      </button>
      {/* Boutons principaux */}
      <div className="flex gap-6 mb-8 animate-fade-in">
        <a href="/login" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl shadow-lg text-lg font-semibold transition-transform hover:brightness-110">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6Z"/></svg>
          Utilisateur
        </a>
        <a href="/admin-login" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl shadow-lg text-lg font-semibold transition-transform hover:brightness-110">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6Z"/></svg>
          Administration
        </a>
      </div>
      {/* Citation ou slogan */}
      <div className="mt-8 text-center text-base text-primary italic animate-fade-in">
        "L'éducation est l'arme la plus puissante pour changer le monde." – Nelson Mandela
      </div>
    </main>
  );
}
