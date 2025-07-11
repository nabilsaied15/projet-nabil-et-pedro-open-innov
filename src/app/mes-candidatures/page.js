'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function MesCandidaturesPage() {
  const router = useRouter();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentDossier, setCurrentDossier] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingCandidature, setEditingCandidature] = useState(null);
  const [filterStatut, setFilterStatut] = useState('Tous');
  const [newCandidature, setNewCandidature] = useState({
    entreprise: '',
    poste: '',
    date_candidature: '',
    statut: 'En attente',
    notes: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvError, setCvError] = useState('');
  const [cvSuccess, setCvSuccess] = useState('');
  const [uploadedCvs, setUploadedCvs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      router.push('/login');
      return;
    }

    // Récupérer l'ID du dossier depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const dossierId = urlParams.get('dossier_id');
    
    if (!dossierId) {
      router.push('/dossiers');
      return;
    }

    // Récupérer le nom du dossier depuis la base de données
    const fetchDossierName = async () => {
      try {
        const { data, error } = await supabase
          .from('dossiers')
          .select('nom')
          .eq('id', parseInt(dossierId))
          .single();

        if (error) throw error;
        
        setCurrentUser(user);
        setCurrentDossier({ id: dossierId, nom: data.nom });
        fetchCandidatures(dossierId);
        fetchMessages(dossierId);
        fetchCvs(dossierId);
      } catch (error) {
        console.error('Erreur lors de la récupération du dossier:', error);
        router.push('/dossiers');
      }
    };

    fetchDossierName();
  }, []);

  const fetchCandidatures = async (dossierId) => {
    try {
      const { data, error } = await supabase
        .from('candidatures')
        .select('*')
        .eq('dossier_id', parseInt(dossierId))
        .order('date_candidature', { ascending: false });

      if (error) throw error;
      setCandidatures(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures:', error);
    } finally {
      setLoading(false);
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
      console.log('Fetched messages data:', data);
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  const fetchCvs = async (dossierId) => {
    try {
      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('dossier_id', parseInt(dossierId))
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUploadedCvs(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des CVs:', error);
    }
  };

  const getCvUrl = async (filePath) => {
    try {
      const { data } = await supabase.storage
        .from('cvs')
        .createSignedUrl(filePath, 60); // URL valide pendant 60 secondes
      return data?.signedUrl;
    } catch (error) {
      console.error('Erreur lors de la génération de l\'URL:', error);
      return null;
    }
  };

  const handleDownloadCv = async (cv) => {
    try {
      const url = await getCvUrl(cv.file_path);
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  const handleDeleteCv = async (cvId, filePath) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) return;

    try {
      // Supprimer le fichier du stockage
      const { error: storageError } = await supabase.storage
        .from('cvs')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Supprimer l'enregistrement de la base de données
      const { error: dbError } = await supabase
        .from('cvs')
        .delete()
        .eq('id', cvId);

      if (dbError) throw dbError;

      // Rafraîchir la liste des CVs
      await fetchCvs(currentDossier.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du CV');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCandidature) {
        // Modification d'une candidature existante
        const { data, error } = await supabase
          .from('candidatures')
          .update(newCandidature)
          .eq('id', editingCandidature.id)
          .select();

        if (error) throw error;

        setCandidatures(candidatures.map(c => 
          c.id === editingCandidature.id ? data[0] : c
        ));
        // Afficher la popup si statut Accepté ou Refusé
        if (data[0].statut === 'Accepté') {
          setPopup({ show: true, type: 'success', message: 'Candidature acceptée !' });
        } else if (data[0].statut === 'Refusé') {
          setPopup({ show: true, type: 'error', message: 'Candidature refusée. Pleure pas ' });
        }
      } else {
        // Création d'une nouvelle candidature
        const { data, error } = await supabase
          .from('candidatures')
          .insert([
            {
              ...newCandidature,
              dossier_id: parseInt(currentDossier.id)
            }
          ])
          .select();

        if (error) throw error;

        setCandidatures([...candidatures, data[0]]);
        // Afficher la popup si statut Accepté ou Refusé
        if (data[0].statut === 'Accepté') {
          setPopup({ show: true, type: 'success', message: 'Candidature acceptée !' });
        } else if (data[0].statut === 'Refusé') {
          setPopup({ show: true, type: 'error', message: 'Candidature refusée.' });
        }
      }

      setNewCandidature({
        entreprise: '',
        poste: '',
        date_candidature: '',
        statut: 'En attente',
        notes: ''
      });
      setEditingCandidature(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la création/modification de la candidature:', error);
      alert('Erreur lors de la création/modification de la candidature');
    }
  };

  const handleEdit = (candidature) => {
    setEditingCandidature(candidature);
    setNewCandidature({
      entreprise: candidature.entreprise,
      poste: candidature.poste,
      date_candidature: candidature.date_candidature,
      statut: candidature.statut,
      notes: candidature.notes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (candidatureId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('candidatures')
        .delete()
        .eq('id', candidatureId);

      if (error) throw error;

      setCandidatures(candidatures.filter(c => c.id !== candidatureId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la candidature:', error);
      alert('Erreur lors de la suppression de la candidature');
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setCvError('Format de fichier non supporté. Utilisez PDF, DOC ou DOCX.');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setCvError('Le fichier est trop volumineux. Taille maximale : 5MB');
      return;
    }

    setCvFile(file);
    setCvError('');
    setCvSuccess('');
  };

  const uploadCv = async () => {
    if (!cvFile || !currentDossier) return;

    setCvUploading(true);
    setCvError('');
    setCvSuccess('');

    try {
      // 1. Téléverser le fichier dans le bucket Supabase
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${currentDossier.id}/${Date.now()}.${fileExt}`;
      
      console.log('Tentative de téléversement du fichier:', fileName);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(fileName, cvFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur de téléversement:', uploadError);
        throw new Error(`Erreur de téléversement: ${uploadError.message}`);
      }

      console.log('Fichier téléversé avec succès:', uploadData);

      // 2. Enregistrer les métadonnées dans la table cvs
      const { data: dbData, error: dbError } = await supabase
        .from('cvs')
        .insert([{
          dossier_id: parseInt(currentDossier.id),
          file_name: cvFile.name,
          file_path: fileName,
          file_type: cvFile.type,
          file_size: cvFile.size
        }])
        .select();

      if (dbError) {
        console.error('Erreur de base de données:', dbError);
        // Si l'insertion échoue, supprimer le fichier téléversé
        await supabase.storage
          .from('cvs')
          .remove([fileName]);
        throw new Error(`Erreur de base de données: ${dbError.message}`);
      }

      console.log('Métadonnées enregistrées avec succès:', dbData);
      setCvSuccess('CV téléversé avec succès !');
      setCvFile(null);
      // Rafraîchir la liste des CVs
      await fetchCvs(currentDossier.id);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setCvError(`Erreur lors du téléversement du CV: ${error.message}`);
    } finally {
      setCvUploading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentDossier || !currentUser) {
      console.log('Validation failed:', {
        message: newMessage,
        dossier: currentDossier,
        user: currentUser
      });
      return;
    }

    try {
      // Si l'utilisateur est admin, le message est considéré comme un message de l'IA
      const isAdmin = currentUser.role === 'admin';

      console.log('Attempting to send message with data:', {
        dossier_id: parseInt(currentDossier.id),
        message: newMessage,
        user_name: isAdmin ? 'Admin' : currentUser.name,
        is_ai: isAdmin
      });

      // Ajouter le message
      const { data: userMessageData, error: userError } = await supabase
        .from('conversations')
        .insert([{
          dossier_id: parseInt(currentDossier.id),
          message: newMessage,
          is_ai: isAdmin,
          user_name: isAdmin ? 'Admin' : currentUser.name,
          created_at: new Date().toISOString()
        }])
        .select();

      if (userError) {
        console.error('Erreur détaillée lors de l\'envoi du message:', userError);
        throw new Error(`Erreur lors de l'envoi du message: ${userError.message}`);
      }

      console.log('Message envoyé avec succès:', userMessageData);

      // Mettre à jour l'état local
      setMessages(prev => [...prev, userMessageData[0]]);
      setNewMessage('');
    } catch (error) {
      console.error('Erreur complète lors de l\'envoi du message:', error);
      alert(`Erreur lors de l'envoi du message: ${error.message}`);
    }
  };

  const filteredCandidatures = candidatures.filter(candidature => 
    filterStatut === 'Tous' || candidature.statut === filterStatut
  );

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup({ show: false, type: '', message: '' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* POPUP MODAL */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`p-8 rounded-xl shadow-lg text-2xl font-bold transition-all
            ${popup.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${popup.type === 'error' ? 'bg-red-500 text-white' : ''}
          `}>
            {popup.message}
          </div>
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setPopup({ show: false, type: '', message: '' })}
          />
        </div>
      )}
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Mes Candidatures</h2>
            {currentDossier && (
              <p className="text-gray-400 mt-2">Dossier : {currentDossier.nom}</p>
            )}
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="px-4 py-2 rounded-md border focus:outline-none"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Entretien">Entretien</option>
              <option value="Refusé">Refusé</option>
              <option value="Accepté">Accepté</option>
            </select>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) {
                  setEditingCandidature(null);
                  setNewCandidature({
                    entreprise: '',
                    poste: '',
                    date_candidature: '',
                    statut: 'En attente',
                    notes: ''
                  });
                }
              }}
              className="button px-4 py-2 rounded-md transition duration-200"
            >
              {showForm ? 'Annuler' : 'Ajouter une candidature'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {editingCandidature ? 'Modifier la candidature' : 'Nouvelle Candidature'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={newCandidature.entreprise}
                  onChange={(e) => setNewCandidature({ ...newCandidature, entreprise: e.target.value })}
                  className="w-full p-2 rounded border focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Poste
                </label>
                <input
                  type="text"
                  value={newCandidature.poste}
                  onChange={(e) => setNewCandidature({ ...newCandidature, poste: e.target.value })}
                  className="w-full p-2 rounded border focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date de candidature
                </label>
                <input
                  type="date"
                  value={newCandidature.date_candidature}
                  onChange={(e) => setNewCandidature({ ...newCandidature, date_candidature: e.target.value })}
                  className="w-full p-2 rounded border focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Statut
                </label>
                <select
                  value={newCandidature.statut}
                  onChange={(e) => setNewCandidature({ ...newCandidature, statut: e.target.value })}
                  className="w-full p-2 rounded border focus:outline-none"
                  required
                >
                  <option value="En attente">En attente</option>
                  <option value="Entretien">Entretien</option>
                  <option value="Refusé">Refusé</option>
                  <option value="Accepté">Accepté</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newCandidature.notes}
                  onChange={(e) => setNewCandidature({ ...newCandidature, notes: e.target.value })}
                  className="w-full p-2 rounded border focus:outline-none"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                className="button px-4 py-2 rounded-md transition duration-200"
              >
                {editingCandidature ? 'Modifier' : 'Ajouter'} la candidature
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidatures.map((candidature) => (
            <div
              key={candidature.id}
              className={`rounded-2xl p-4 shadow-md hover:shadow-xl transition relative overflow-hidden border border-primary
                ${candidature.statut === 'Accepté' ? 'bg-green-200 ring-4 ring-success' : ''}
                ${candidature.statut === 'Refusé' ? 'bg-red-200' : ''}
                ${candidature.statut !== 'Accepté' && candidature.statut !== 'Refusé' ? 'bg-white' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-primary">{candidature.entreprise}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(candidature)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(candidature.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-sm mb-1">Poste : {candidature.poste}</p>
              <p className="text-sm mb-1">
                Date : {new Date(candidature.date_candidature).toLocaleDateString()}
              </p>
              <p className="text-sm mb-1">
                Statut : <span className={`${
                  candidature.statut === 'Accepté' ? 'text-green-400 font-bold animate-bounce' :
                  candidature.statut === 'Refusé' ? 'text-red-400' :
                  candidature.statut === 'Entretien' ? 'text-yellow-400' :
                  'text-gray-400'
                }`}>{candidature.statut}</span>
              </p>
              {candidature.notes && (
                <p className="text-sm mt-2 border-t border-primary pt-2">
                  {candidature.notes}
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredCandidatures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {candidatures.length === 0 
                ? "Aucune candidature enregistrée."
                : "Aucune candidature ne correspond au filtre sélectionné."}
            </p>
          </div>
        )}

        {/* Section CV et Conversation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section Téléversement CV */}
          <div className="rounded-xl p-6 border border-primary bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">📄 CV pour {currentDossier?.nom}</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center bg-white">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="cv-upload"
                  onChange={handleCvUpload}
                />
                <label
                  htmlFor="cv-upload"
                  className="cursor-pointer block"
                >
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Cliquez pour sélectionner votre CV</p>
                  <p className="text-gray-400 text-sm mt-1">Formats acceptés: PDF, DOC, DOCX</p>
                </label>
              </div>
              {cvFile && (
                <div className="text-sm text-primary">
                  Fichier sélectionné : {cvFile.name}
                </div>
              )}
              {cvError && (
                <div className="text-sm text-error">
                  {cvError}
                </div>
              )}
              {cvSuccess && (
                <div className="text-sm text-success">
                  {cvSuccess}
                </div>
              )}
              <button
                className="button px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                onClick={uploadCv}
                disabled={!cvFile || cvUploading}
              >
                {cvUploading ? 'Téléversement en cours...' : 'Téléverser CV'}
              </button>

              {/* Liste des CVs téléversés */}
              {uploadedCvs.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">CVs téléversés</h4>
                  <div className="space-y-3">
                    {uploadedCvs.map((cv) => (
                      <div key={cv.id} className="bg-gray-200 rounded-lg p-3 flex items-center justify-between border border-primary">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary">{cv.file_name}</p>
                          <p className="text-xs text-primary/70">
                            Téléversé le {new Date(cv.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownloadCv(cv)}
                            className="text-accent hover:text-accent/80"
                            title="Télécharger"
                          >
                            ⬇️
                          </button>
                          <button
                            onClick={() => handleDeleteCv(cv.id, cv.file_path)}
                            className="text-error hover:text-error/80"
                            title="Supprimer"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section Conversation */}
          <div className="rounded-xl p-6 border border-primary bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">💬 Messages pour {currentDossier?.nom}</h3>
            <div className="flex flex-col h-[600px] bg-white rounded-lg border border-primary">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-primary/60 py-8">
                    <p>Aucun message</p>
                    <p className="text-sm mt-2">Envoyez un message pour commencer la conversation</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    // Si le nom de l'utilisateur est 'Admin', afficher à gauche en gris
                    // Sinon, afficher à droite en bleu
                    const isMessageFromAdmin = message.user_name === 'Admin';

                    return (
                      <div
                        key={message.id}
                        className={`w-full flex ${isMessageFromAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg border ${
                            isMessageFromAdmin
                              ? 'bg-gray-200 text-primary rounded-tl-none border-gray-200'
                              : 'bg-primary text-white rounded-tr-none border-primary'
                          }`}
                        >
                          <p className="text-xs font-semibold mb-1">
                            {message.user_name || 'Admin'}
                          </p>
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-75 mt-2">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="border-t border-primary p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 bg-gray-100 text-primary rounded-lg px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    className="button px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    disabled={!newMessage.trim()}
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>

      <style jsx>{`
        .message-container {
          display: flex;
          width: 100%;
          margin-bottom: 1rem;
        }
        .message-user {
          justify-content: flex-end;
        }
        .message-admin {
          justify-content: flex-start;
        }
        .message-bubble {
          max-width: 80%;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .message-user-bubble {
          background-color: #2563eb;
          color: white;
          border-top-right-radius: 0;
        }
        .message-admin-bubble {
          background-color: #374151;
          color: white;
          border-top-left-radius: 0;
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
  );
}