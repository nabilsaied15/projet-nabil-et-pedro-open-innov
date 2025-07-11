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
    <div className="flex justify-center items-center p-4">
      {user?.role === 'admin' && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md bg-white text-primary rounded-3xl border-2 border-blue-100 shadow-2xl p-8"
        >
          <h2 className="text-xl font-bold text-blue-900 text-center flex items-center justify-center gap-2 mb-2">
            <FaPlus /> Ajouter un cours
          </h2>
          <div className="w-full">
            <label className="font-semibold mb-1 block text-left">Titre du cours</label>
            <input
              type="text"
              placeholder="Ex: React JS"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="p-2 rounded-xl w-full border border-primary bg-white text-primary text-base placeholder-gray-400 focus:border-blue-400 transition"
            />
          </div>
          <div className="w-full">
            <label className="font-semibold mb-1 block text-left">Image du cours</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files[0])}
              required
              className="p-2 rounded-xl w-full border border-primary bg-white text-primary text-base placeholder-gray-400 focus:border-blue-400 transition"
            />
          </div>
          <div className="w-full">
            <label className="font-semibold mb-1 block text-left">Nombre de vidéos</label>
            <input
              type="number"
              min="0"
              value={nombreVideos}
              onChange={e => setNombreVideos(e.target.value)}
              className="p-2 rounded-xl w-full border border-primary bg-white text-primary text-base placeholder-gray-400 focus:border-blue-400 transition"
            />
          </div>
          <div className="w-full">
            <label className="font-semibold mb-1 block text-left">Nombre de PDF</label>
            <input
              type="number"
              min="0"
              value={nombrePdfs}
              onChange={e => setNombrePdfs(e.target.value)}
              className="p-2 rounded-xl w-full border border-primary bg-white text-primary text-base placeholder-gray-400 focus:border-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl w-full text-lg transition"
          >
            ➕ Ajouter
          </button>
          {message && (
            <div className={message.startsWith('✅') ? 'text-green-600 font-semibold text-center mt-2' : 'text-red-600 font-semibold text-center mt-2'}>
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
}