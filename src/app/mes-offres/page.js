'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function MesOffresPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('liked'); // 'liked', 'saved', 'interested'
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchOffres();
    } else {
      router.push('/login');
    }
  }, [activeTab]);

  const fetchOffres = async () => {
    setLoading(true);
    try {
      let query;
      switch (activeTab) {
        case 'liked':
          query = supabase
            .from('offre_likes')
            .select('offres(*)')
            .eq('user_id', user.id)
            .eq('liked', true);
          break;
        case 'saved':
          query = supabase
            .from('offre_saves')
            .select('offres(*)')
            .eq('user_id', user.id)
            .eq('saved', true);
          break;
        case 'interested':
          query = supabase
            .from('offre_interests')
            .select('offres(*)')
            .eq('user_id', user.id)
            .eq('interested', true);
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      setOffres(data.map(item => item.offres));
    } catch (error) {
      console.error('Erreur lors de la récupération des offres:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">Mes offres</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-4 py-2 rounded ${
              activeTab === 'liked' ? 'button' : ''
            }`}
          >
            ❤️ Offres likées
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded ${
              activeTab === 'saved' ? 'button' : ''
            }`}
          >
            💾 Offres sauvegardées
          </button>
          <button
            onClick={() => setActiveTab('interested')}
            className={`px-4 py-2 rounded ${
              activeTab === 'interested' ? 'button' : ''
            }`}
          >
            ✨ Offres qui m'intéressent
          </button>
        </div>

        {/* Liste des offres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offres.map((offre) => (
            <div key={offre.id} className="rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-2">{offre.poste}</h3>
              <p className="text-gray-400 text-sm mb-1">Entreprise : {offre.entreprise}</p>
              <p className="text-gray-400 text-sm mb-1">Localisation : {offre.localisation}</p>
              <p className="text-gray-400 text-sm mb-1">Durée : {offre.duree}</p>
              {offre.profil_recherche && (
                <p className="text-gray-400 text-sm mb-1">Profil : {offre.profil_recherche}</p>
              )}
              {offre.lien && (
                <a
                  href={offre.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm block mb-2"
                >
                  Voir l'offre
                </a>
              )}
              <p className="text-gray-500 text-xs mt-3">
                Créé le : {new Date(offre.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {offres.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            Aucune offre {activeTab === 'liked' ? 'lik&eacute;e' : activeTab === 'saved' ? 'sauvegard&eacute;e' : 'qui vous int&eacute;resse'}
          </div>
        )}
      </div>
    </div>
  );
} 