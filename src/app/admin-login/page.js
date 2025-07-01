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
    <div className="flex justify-center items-center min-h-screen  text-foreground">
      <div className="bg-card rounded-xl  max-w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-foreground">Connexion Admin </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">Connexion</button>
          {error && <p className="text-error text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
