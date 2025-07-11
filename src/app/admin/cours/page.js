'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AddItemPage from '@/components/AddItemPage';

const courseFields = [
  {
    name: 'title',
    label: 'Titre du cours',
    type: 'text',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false
  },
  {
    name: 'image_url',
    label: 'URL de l\'image',
    type: 'text',
    required: true
  },
  {
    name: 'lien',
    label: 'Lien du cours',
    type: 'text',
    required: false
  }
];

export default function CoursPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('cours')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCourses(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleAddCourse = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('cours')
        .insert([formData])
        .select();

      if (error) throw error;

      setCourses([...courses, data[0]]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du cours:', error);
      alert('Erreur lors de l\'ajout du cours');
    }
  };

  const handleCourseChange = async (id, field, value) => {
    try {
      const { data, error } = await supabase
        .from('cours')
        .update({ [field]: value })
        .eq('id', id)
        .select();

      if (error) throw error;

      setCourses(courses.map((course) =>
        course.id === id ? data[0] : course
      ));
      setEditingCourseId(null);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du champ ${field} pour le cours ${id}:`, error);
      alert(`Erreur lors de la mise à jour du champ ${field} pour le cours ${id}`);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const { data, error } = await supabase
        .from('cours')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;

      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error(`Erreur lors de la suppression du cours ${id}:`, error);
      alert(`Erreur lors de la suppression du cours ${id}`);
    }
  };

  return (
    <div className="min-h-screen  p-10 text-primary">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-center text-primary">Gestion des cours</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition-colors"
        >
          {showAddForm ? '– Fermer le formulaire' : '➕ Ajouter un cours'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 flex justify-center">
          <div className="bg-gray-100 border border-primary shadow-md rounded-2xl p-8 w-full max-w-lg">
            <AddItemPage
              table="cours"
              title="Ajouter un cours"
              fields={courseFields}
              onSubmit={handleAddCourse}
              onCancel={() => setShowAddForm(false)}
              inputClassName="bg-white border border-primary text-primary rounded-lg px-4 py-2 focus:border-accent mb-4 w-full"
              labelClassName="text-primary font-semibold mb-2"
              buttonClassName="bg-primary text-white rounded-lg font-semibold px-6 py-2 mt-4 hover:bg-accent transition"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-primary rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h4 
              className="font-semibold text-base mb-2 cursor-pointer text-primary hover:underline"
              onClick={() => router.push(`/admin/cours/${course.id}`)}
            >
              {course.title}
            </h4>
            {course.description && (
              <p className="text-sm mb-2 text-primary">{course.description}</p>
            )}
            <div className="mt-2">
              <button
                onClick={() => router.push(`/admin/cours/${course.id}`)}
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition"
              >
                Gérer les ressources
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}