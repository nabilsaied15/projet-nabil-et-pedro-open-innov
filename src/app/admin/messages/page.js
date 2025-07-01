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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Messages des utilisateurs</h1>
          <button
            onClick={() => router.push('/admin')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retour au tableau de bord
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Liste des dossiers */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Dossiers</h2>
            <div className="space-y-2">
              {dossiers.map((dossier) => (
                <button
                  key={dossier.id}
                  onClick={() => handleDossierSelect(dossier)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedDossier?.id === dossier.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
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
          <div className="md:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
            {selectedDossier ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Conversation avec {selectedDossier.nom}
                  </h2>
                </div>
                <div className="flex flex-col h-[600px] bg-gray-900 rounded-lg">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        <p>Aucun message</p>
                        <p className="text-sm mt-2">Attendez que l'utilisateur envoie un message</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`w-full flex ${message.is_ai ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg flex flex-col ${
                              message.is_ai
                                ? 'bg-gray-700 text-white rounded-tl-none'
                                : 'bg-blue-600 text-white rounded-tr-none'
                            }`}
                          >
                            {message.is_ai && (
                              <span className="text-xs font-bold text-blue-300 mb-1 flex items-center gap-1">
                                <span className="inline-block w-4 h-4 bg-blue-500 rounded-full text-center text-white mr-1">A</span> Admin
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
                  <div className="border-t border-gray-700 p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre réponse..."
                        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSending}
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
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

        <style jsx>{`
          .message-container {
            display: flex;
            width: 100%;
            margin-bottom: 1rem;
          }
          .message-user {
            justify-content: flex-start;
          }
          .message-admin {
            justify-content: flex-end;
          }
          .message-bubble {
            max-width: 80%;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          .message-user-bubble {
            background-color: #374151;
            color: white;
            border-top-left-radius: 0;
          }
          .message-admin-bubble {
            background-color: #2563eb;
            color: white;
            border-top-right-radius: 0;
          }
          .message-bubble p {
            margin: 0;
            line-height: 1.5;
          }
          .message-bubble .timestamp {
            font-size: 0.75rem;
            opacity: 0.7;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    </div>
  );
} 