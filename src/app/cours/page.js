'use client';

import AddItemPage from '../../components/AddItemPage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function CoursPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    } else {
      router.push('/login');
      return;
    }
    fetchCourses(); // Charger les cours pour tous les utilisateurs

    // Rafraîchir les données toutes les 5 secondes
    const interval = setInterval(fetchCourses, 5000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  const fetchCourses = async () => {
    try {
      // Récupérer tous les cours
      const { data: coursesData, error: coursesError } = await supabase
        .from('cours')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Pour chaque cours, récupérer le nombre de vidéos
      const coursesWithVideos = await Promise.all(
        (coursesData || []).map(async (course) => {
          const { count, error: countError } = await supabase
            .from('course_videos')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);

          if (countError) throw countError;

          return {
            ...course,
            nombre_videos: count || 0
          };
        })
      );

      setCourses(coursesWithVideos);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  // 🔄 Recharge toute la page après l'ajout d'un cours
  const handleCourseAdded = () => {
    // Vérification de sécurité côté client
    if (!user || user.role !== 'admin') {
      console.error("Vous n'avez pas les permissions nécessaires pour ajouter un cours.");
      return;
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}


      {/* AJOUT COURS SI ADMIN */}
      <div className="p-10">
        {user?.role === 'admin' ? (
          <>
            <h2 className="font-bold mb-6 text-center">Ajouter un cours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              <AddItemPage table="cours" onItemAdded={handleCourseAdded} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center text-center border border-primary"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 
                    className="font-semibold text-base mb-2 cursor-pointer"
                    onClick={() => router.push(`/admin/cours/${course.id}`)}
                  >
                    {course.title}
                  </h4>
                  {course.description && (
                    <p className="text-sm mb-2">{course.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span>🎥</span>
                    <span>{course.nombre_videos || 0} vidéos</span>
                  </div>
                  {course.lien && (
                    <a
                      href={course.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm mb-2"
                    >
                      Accéder au cours
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="font-bold mt-4 mb-6 text-center">Cours disponibles en direct 📱</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center text-center border border-primary"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 
                    className="font-semibold text-base mb-2 cursor-pointer"
                    onClick={() => router.push(`/cours/${course.id}`)}
                  >
                    {course.title}
                  </h4>
                  {course.description && (
                    <p className="text-sm mb-2">{course.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span>🎥</span>
                    <span>{course.nombre_videos || 0} vidéos</span>
                  </div>
                  {course.lien && (
                    <a
                      href={course.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm mb-2"
                    >
                      Accéder au cours
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}