'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'admin') {
      const user = {
        name: 'Admin',
        email: 'admin@gmail.com',
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard'); // Redirection vers le dashboard
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)] px-2 text-foreground">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-blue-100 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">Connexion Admin</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 rounded-xl border-2 border-primary bg-gray-100 text-primary placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-primary hover:bg-accent text-white font-bold py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 shadow" type="submit">Connexion</button>
          {error && <p className="text-error text-sm text-center font-semibold">{error}</p>}
        </form>
      </div>
    </div>
  );
}
