'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white border-t border-white/20 shadow-inner mt-12 text-sm md:text-base">
      <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo + nom plateforme */}
        <div className="flex items-center gap-4">
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24" className="text-white">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" d="M8 12h8M12 8v8" />
          </svg>
          <span className="font-bold text-lg">Plateforme Candidatures</span>
        </div>

        {/* Message + liens */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-medium">Gérez vos candidatures, offres et dossiers facilement et en toute sécurité.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-blue-300 transition">Politique de confidentialité</Link>
            <a href="https://linkedin.com/company/exemple" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">LinkedIn</a>
          </div>
          <span className="text-blue-300 text-sm">&copy; {new Date().getFullYear()} Tous droits réservés.</span>
        </div>

        {/* Liens navigation */}
        <div className="flex gap-4 md:gap-6">
          <Link href="/" className="hover:text-blue-300 transition">Accueil</Link>
          <Link href="/contacts" className="hover:text-blue-300 transition">Contact</Link>
          <a href="mailto:support@exemple.com" className="hover:text-blue-300 transition">Support</a>
        </div>
      </div>
    </footer>
  );
}
