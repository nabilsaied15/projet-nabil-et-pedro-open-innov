'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    // Vérifier la longueur du mot de passe
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      console.log('Début de l\'inscription...');
      
      // Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          }
        }
      });

      if (authError) {
        console.error('Erreur Auth:', authError);
        throw new Error(authError.message);
      }

      if (!authData?.user) {
        throw new Error('Aucun utilisateur créé');
      }

      console.log('Utilisateur Auth créé:', authData.user);

      // Créer l'utilisateur dans la table users
      const { error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            name: formData.name,
            email: formData.email,
            role: 'user',
            created_at: new Date().toISOString()
          }
        ]);

      if (userError) {
        console.error('Erreur DB:', userError);
        throw new Error(userError.message);
      }

      console.log('Inscription réussie!');
      
      // Rediriger vers la page de connexion
      router.push('/login?message=Inscription réussie! Vous pouvez maintenant vous connecter.');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setError(error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-2">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-blue-100">
        <h1 className="text-3xl font-bold text-primary text-center mb-8">Inscription</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
              Nom complet
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
              required
              minLength={2}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
              required
              minLength={6}
            />
            <p className="text-sm text-gray-400 mt-1">Le mot de passe doit contenir au moins 6 caractères</p>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-accent text-white font-bold py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 shadow"
          >
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-primary">
            Déjà un compte ?{' '}
            <a href="/login" className="text-accent hover:underline font-semibold">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
