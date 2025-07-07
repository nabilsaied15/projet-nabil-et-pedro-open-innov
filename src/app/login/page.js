'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setSuccess(message);
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Récupérer les informations de l'utilisateur
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      // Stocker les informations de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Rediriger vers le dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-blue-100">
        <h1 className="text-3xl font-bold text-primary text-center mb-8">Connexion</h1>
        {error && (
          <div className="bg-red-50 border border-red-400 text-error px-4 py-3 rounded-xl mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-400 text-success px-4 py-3 rounded-xl mb-4 text-center font-semibold">
            {success}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-accent text-white font-bold py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 shadow"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-primary">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-accent hover:underline font-semibold">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
