'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaPlus } from 'react-icons/fa'; // Assurez-vous d'avoir react-icons installé

export default function AddItemPage({ table, onItemAdded }) {
  if (!table) {
    return <div style={{color: 'red'}}>Erreur : prop "table" manquante dans AddItemPage</div>;
  }

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [nombreVideos, setNombreVideos] = useState(0);
  const [nombrePdfs, setNombrePdfs] = useState(0);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchItems();
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image_url = '';
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, file);
      if (uploadError) {
        setMessage("❌ Erreur lors de l'upload de l'image");
        return;
      }
      image_url = supabase.storage.from('uploads').getPublicUrl(fileName).data.publicUrl;
    }
    const { error } = await supabase.from(table).insert([{
      title,
      image_url,
      nombre_videos: Number(nombreVideos) || 0,
      nombre_pdfs: Number(nombrePdfs) || 0
    }]);
    if (error) {
      setMessage(`❌ Erreur en base : ${error.message}`);
    } else {
      setMessage('✅ Cours ajouté !');
      setTitle('');
      setFile(null);
      setNombreVideos(0);
      setNombrePdfs(0);
      fetchItems();
      if (typeof onItemAdded === 'function') {
        onItemAdded();
      }
      // Rafraîchir la page automatiquement après ajout
      if (typeof window !== 'undefined') {
        setTimeout(() => window.location.reload(), 800);
      }
    }
  };

  return (
    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {user?.role === 'admin' && (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1.2rem',
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '18px',
            border: '1px solid #374151',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            width: '100%',
            maxWidth: 320,
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <FaPlus /> Ajouter un cours
          </h2>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: '600', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>
              Titre du cours
            </label>
            <input
              type="text"
              placeholder="Ex: React JS"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                width: '100%',
                border: '1px solid #6b7280',
                backgroundColor: '#111827',
                color: 'white',
                fontSize: '0.95rem',
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: '600', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>
              Image du cours
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files[0])}
              required
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                width: '100%',
                border: '1px solid #6b7280',
                backgroundColor: '#111827',
                color: 'white',
                fontSize: '0.95rem',
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: '600', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>
              Nombre de vidéos
            </label>
            <input
              type="number"
              min="0"
              value={nombreVideos}
              onChange={e => setNombreVideos(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                width: '100%',
                border: '1px solid #6b7280',
                backgroundColor: '#111827',
                color: 'white',
                fontSize: '0.95rem',
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: '600', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>
              Nombre de PDF
            </label>
            <input
              type="number"
              min="0"
              value={nombrePdfs}
              onChange={e => setNombrePdfs(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                width: '100%',
                border: '1px solid #6b7280',
                backgroundColor: '#111827',
                color: 'white',
                fontSize: '0.95rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.7rem 1.2rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
              transition: 'background-color 0.3s ease',
            }}
          >
            ➕ Ajouter
          </button>
          {message && (
            <p style={{ textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{message}</p>
          )}
        </form>
      )}
    </div>
  );
}