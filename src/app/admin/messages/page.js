'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminMessages() {
  const [dossiers, setDossiers] = useState([]);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDossiers();
  }, []);

  const fetchDossiers = async () => {
    try {
      const { data, error } = await supabase
        .from('dossiers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDossiers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des dossiers:', error);
    }
  };

  const fetchMessages = async (dossierId) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('dossier_id', parseInt(dossierId))
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  const handleDossierSelect = async (dossier) => {
    setSelectedDossier(dossier);
    await fetchMessages(dossier.id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedDossier) return;

    try {
      setIsSending(true);
      const { data, error } = await supabase
        .from('conversations')
        .insert([{
          dossier_id: parseInt(selectedDossier.id),
          message: newMessage,
          is_ai: true
        }])
        .select();

      if (error) throw error;

      setMessages(prev => [...prev, data[0]]);
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen  p-10 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Messages des utilisateurs</h1>
          <button
            onClick={() => router.push('/admin')}
            className=" hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Retour au tableau de bord
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Liste des dossiers */}
          <div className="bg-gray-100 border border-primary rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-primary mb-4">Dossiers</h2>
            <div className="space-y-2">
              {dossiers.map((dossier) => (
                <button
                  key={dossier.id}
                  onClick={() => handleDossierSelect(dossier)}
                  className={`w-full text-left p-3 rounded-lg font-semibold transition
                    ${selectedDossier?.id === dossier.id ? 'bg-primary text-white' : ' text-primary border border-primary hover:bg-accent/10'}`}
                >
                  <p className="font-medium">{dossier.nom}</p>
                  <p className="text-sm opacity-75">
                    Créé le {new Date(dossier.created_at).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Section Conversation */}
          <div className="md:col-span-2 bg-gray-100 border border-primary rounded-2xl p-6 shadow-md">
            {selectedDossier ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-primary">
                    Conversation avec {selectedDossier.nom}
                  </h2>
                </div>
                <div className="flex flex-col h-[600px]  rounded-lg border border-primary">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        <p>Aucun message</p>
                        <p className="text-sm mt-2">Attendez que l&apos;utilisateur envoie un message</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`w-full flex ${message.is_ai ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg flex flex-col shadow
                              ${message.is_ai
                                ? 'bg-primary text-white rounded-tl-none'
                                : 'bg-accent/10 text-primary rounded-tr-none border border-accent'}
                            `}
                          >
                            {message.is_ai && (
                              <span className="text-xs font-bold text-accent mb-1 flex items-center gap-1">
                                <span className="inline-block w-4 h-4 bg-accent rounded-full text-center text-white mr-1">A</span> Admin
                              </span>
                            )}
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-75 mt-2">
                              {new Date(message.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t border-primary p-4 bg-gray-50 rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre réponse..."
                        className="flex-1  border border-primary text-primary rounded-lg px-4 py-2 focus:border-accent"
                        disabled={isSending}
                      />
                      <button
                        type="submit"
                        className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                        disabled={!newMessage.trim() || isSending}
                      >
                        {isSending ? 'Envoi...' : 'Envoyer'}
                      </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <p>Sélectionnez un dossier pour voir les messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 