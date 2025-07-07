'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full px-10 py-5 shadow-2xl rounded-t-2xl mt-12 text-lg flex flex-col md:flex-row items-center justify-between gap-10 bg-[var(--primary)] text-[var(--foreground)] font-sans" style={{minHeight:'70px'}}>
      <div className="flex gap-10 items-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block text-[var(--foreground)]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M8 12h8M12 8v8"/></svg>
        <span className="font-bold text-lg">Plateforme Candidatures</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-base">
        <span className="font-semibold">Gérez vos candidatures, offres et dossiers facilement et en toute sécurité.</span>
        <Link href="/privacy" className="font-semibold transition-colors px-2 py-1 rounded-lg text-[var(--foreground)] hover:text-[var(--accent)]">Politique de confidentialité</Link>
        <a href="https://linkedin.com/company/exemple" target="_blank" rel="noopener noreferrer" className="font-semibold transition-colors px-2 py-1 rounded-lg text-[var(--foreground)] hover:text-[var(--accent)]">LinkedIn</a>
        <span className="text-[var(--accent)]">&copy; {new Date().getFullYear()} Tous droits réservés.</span>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-semibold transition-colors px-2 py-1 rounded-lg text-[var(--foreground)] hover:text-[var(--accent)]">Accueil</Link>
        <Link href="/contacts" className="font-semibold transition-colors px-2 py-1 rounded-lg text-[var(--foreground)] hover:text-[var(--accent)]">Contact</Link>
        <a href="mailto:support@exemple.com" className="font-semibold transition-colors px-2 py-1 rounded-lg text-[var(--foreground)] hover:text-[var(--accent)]">Support</a>
      </div>
    </footer>
  );
} 