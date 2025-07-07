'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CourseResourcesPage({ params }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [uploadingPdf, setUploadingPdf] = useState(false);

  // Form states
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [newPdf, setNewPdf] = useState({ title: '', file: null });
  const [newVideo, setNewVideo] = useState({ title: '', youtube_url: '' });

  const [editingPdfId, setEditingPdfId] = useState(null);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editPdfTitle, setEditPdfTitle] = useState('');
  const [editVideoTitle, setEditVideoTitle] = useState('');
  const [editPdfFile, setEditPdfFile] = useState(null);
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [uploadingEditPdf, setUploadingEditPdf] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    } else {
      router.push('/');
    }
    fetchCourseData();
  }, [params.id]);

  const fetchCourseData = async () => {
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('cours')
        .select('*')
        .eq('id', params.id)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch PDFs
      const { data: pdfsData, error: pdfsError } = await supabase
        .from('course_pdfs')
        .select('*')
        .eq('course_id', params.id)
        .order('created_at', { ascending: false });

      if (pdfsError) throw pdfsError;
      setPdfs(pdfsData);

      // Fetch videos
      const { data: videosData, error: videosError } = await supabase
        .from('course_videos')
        .select('*')
        .eq('course_id', params.id)
        .order('created_at', { ascending: false });

      if (videosError) throw videosError;
      setVideos(videosData);

    } catch (error) {
      console.error('Error fetching course data:', error);
      setError('Erreur lors du chargement des données du cours');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPdf = async (e) => {
    e.preventDefault();
    if (!newPdf.file) {
      setError('Veuillez sélectionner un fichier PDF');
      return;
    }

    // Vérifier la taille du fichier (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB en bytes
    if (newPdf.file.size > maxSize) {
      setError('Le fichier est trop volumineux. Taille maximale : 10MB');
      return;
    }

    // Vérifier le type de fichier
    if (newPdf.file.type !== 'application/pdf') {
      setError('Le fichier doit être au format PDF');
      return;
    }

    try {
      setUploadingPdf(true);
      setError('');
      
      // Upload PDF to Supabase Storage
      const fileExt = newPdf.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      console.log('Uploading file:', fileName);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, newPdf.file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Erreur lors de l'upload du fichier: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      // Add PDF to database
      const { data, error } = await supabase
        .from('course_pdfs')
        .insert([{
          course_id: params.id,
          title: newPdf.title,
          pdf_url: publicUrl
        }])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw new Error(`Erreur lors de l'ajout à la base de données: ${error.message}`);
      }

      setPdfs([...pdfs, data[0]]);
      setNewPdf({ title: '', file: null });
      setShowPdfForm(false);
      setMessage('PDF ajouté avec succès!');
    } catch (error) {
      console.error('Error adding PDF:', error);
      setError(error.message || 'Erreur lors de l\'ajout du PDF');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      // Validation de l'URL YouTube
      const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (!youtubeUrlPattern.test(newVideo.youtube_url)) {
        setError('Veuillez entrer une URL YouTube valide');
        return;
      }

      // Validation du titre
      if (!newVideo.title.trim()) {
        setError('Le titre de la vidéo est requis');
        return;
      }

      // Ajouter la vidéo
      const { data, error } = await supabase
        .from('course_videos')
        .insert([{
          course_id: params.id,
          title: newVideo.title.trim(),
          youtube_url: newVideo.youtube_url.trim()
        }])
        .select();

      if (error) {
        console.error('Erreur lors de l\'ajout de la vidéo:', error);
        throw new Error(`Erreur lors de l'ajout de la vidéo: ${error.message}`);
      }

      setVideos([...videos, data[0]]);
      setNewVideo({ title: '', youtube_url: '' });
      setShowVideoForm(false);
      setMessage('Vidéo ajoutée avec succès!');
      setError(''); // Réinitialiser l'erreur en cas de succès
      
      // Recharger les données du cours
      fetchCourseData();
    } catch (error) {
      console.error('Erreur détaillée lors de l\'ajout de la vidéo:', error);
      setError(error.message || 'Erreur lors de l\'ajout de la vidéo');
    }
  };

  const handleDeletePdf = async (pdfId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce PDF ?')) return;

    try {
      // Récupérer l'URL du PDF pour supprimer le fichier du stockage
      const pdfToDelete = pdfs.find(pdf => pdf.id === pdfId);
      if (pdfToDelete) {
        const filePath = pdfToDelete.pdf_url.split('/').pop();
        const { error: storageError } = await supabase.storage
          .from('pdfs')
          .remove([filePath]);

        if (storageError) {
          console.error('Error deleting file from storage:', storageError);
        }
      }

      // Supprimer l'entrée de la base de données
      const { error } = await supabase
        .from('course_pdfs')
        .delete()
        .eq('id', pdfId);

      if (error) throw error;

      setPdfs(pdfs.filter(pdf => pdf.id !== pdfId));
      setMessage('PDF supprimé avec succès!');
    } catch (error) {
      console.error('Error deleting PDF:', error);
      setError('Erreur lors de la suppression du PDF');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) return;

    try {
      // Supprimer la vidéo
      const { error } = await supabase
        .from('course_videos')
        .delete()
        .eq('id', videoId);

      if (error) {
        console.error('Erreur lors de la suppression de la vidéo:', error);
        throw new Error(`Erreur lors de la suppression de la vidéo: ${error.message}`);
      }

      // Mettre à jour l'état local
      setVideos(videos.filter(video => video.id !== videoId));
      setMessage('Vidéo supprimée avec succès!');
      setError(''); // Réinitialiser l'erreur en cas de succès
      
      // Recharger les données du cours
      fetchCourseData();
    } catch (error) {
      console.error('Erreur détaillée lors de la suppression de la vidéo:', error);
      setError(error.message || 'Erreur lors de la suppression de la vidéo');
    }
  };

  const handleEditPdf = async (pdfId) => {
    try {
      let pdfUrl = pdfs.find(pdf => pdf.id === pdfId).pdf_url;

      // Si un nouveau fichier est sélectionné
      if (editPdfFile) {
        setUploadingEditPdf(true);
        
        // Supprimer l'ancien fichier
        const oldFilePath = pdfUrl.split('/').pop();
        await supabase.storage
          .from('pdfs')
          .remove([oldFilePath]);

        // Upload du nouveau fichier
        const fileExt = editPdfFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = fileName;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('pdfs')
          .upload(filePath, editPdfFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Obtenir la nouvelle URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('pdfs')
          .getPublicUrl(filePath);

        pdfUrl = publicUrl;
      }

      // Mettre à jour dans la base de données
      const { error } = await supabase
        .from('course_pdfs')
        .update({ 
          title: editPdfTitle,
          pdf_url: pdfUrl
        })
        .eq('id', pdfId);

      if (error) throw error;

      setPdfs(pdfs.map(pdf => 
        pdf.id === pdfId ? { ...pdf, title: editPdfTitle, pdf_url: pdfUrl } : pdf
      ));
      setEditingPdfId(null);
      setEditPdfTitle('');
      setEditPdfFile(null);
      setMessage('PDF modifié avec succès!');
    } catch (error) {
      console.error('Error updating PDF:', error);
      setError('Erreur lors de la modification du PDF');
    } finally {
      setUploadingEditPdf(false);
    }
  };

  const handleEditVideo = async (videoId) => {
    try {
      const { error } = await supabase
        .from('course_videos')
        .update({ 
          title: editVideoTitle,
          youtube_url: editVideoUrl
        })
        .eq('id', videoId);

      if (error) throw error;

      setVideos(videos.map(video => 
        video.id === videoId ? { ...video, title: editVideoTitle, youtube_url: editVideoUrl } : video
      ));
      setEditingVideoId(null);
      setEditVideoTitle('');
      setEditVideoUrl('');
      setMessage('Vidéo modifiée avec succès!');
    } catch (error) {
      console.error('Error updating video:', error);
      setError('Erreur lors de la modification de la vidéo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="p-8">
        <h1 className="font-bold mb-8 text-center">{course?.title}</h1>

        {message && (
          <div className="rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded mb-4">
            {error}
          </div>
        )}

        {/* PDFs Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">PDFs du cours</h2>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowPdfForm(!showPdfForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
              >
                {showPdfForm ? 'Annuler' : 'Ajouter un PDF'}
              </button>
            )}
          </div>

          {user?.role === 'admin' && showPdfForm && (
            <form onSubmit={handleAddPdf} className="p-6 rounded-2xl mb-6">
              <div className="mb-4">
                <label className="block mb-2">Titre du PDF</label>
                <input
                  type="text"
                  value={newPdf.title}
                  onChange={(e) => setNewPdf({ ...newPdf, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Fichier PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setNewPdf({ ...newPdf, file: e.target.files[0] })}
                  className="w-full p-2 border rounded"
                  required
                />
                <p className="text-sm mt-1">Taille maximale : 10MB</p>
              </div>
              <button
                type="submit"
                disabled={uploadingPdf}
                className="rounded-md"
              >
                {uploadingPdf ? 'Upload en cours...' : 'Ajouter'}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary">
                {editingPdfId === pdf.id ? (
                  <div className="mb-4">
                    <div className="mb-4">
                      <label className="block mb-2">Titre du PDF</label>
                      <input
                        type="text"
                        value={editPdfTitle}
                        onChange={(e) => setEditPdfTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Nouveau titre"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Nouveau fichier PDF (optionnel)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setEditPdfFile(e.target.files[0])}
                        className="w-full p-2 border rounded"
                      />
                      <p className="text-sm mt-1">Laissez vide pour conserver le fichier actuel</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPdf(pdf.id)}
                        disabled={uploadingEditPdf}
                        className="rounded-md text-sm"
                      >
                        {uploadingEditPdf ? 'Modification en cours...' : 'Sauvegarder'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingPdfId(null);
                          setEditPdfTitle('');
                          setEditPdfFile(null);
                        }}
                        className="rounded-md text-sm"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="font-semibold text-lg mb-3">{pdf.title}</h3>
                )}
                <a
                  href={pdf.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline mb-4 block"
                >
                  Voir le PDF
                </a>
                {user?.role === 'admin' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditingPdfId(pdf.id);
                        setEditPdfTitle(pdf.title);
                      }}
                      className="transition duration-200"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeletePdf(pdf.id)}
                      className="transition duration-200"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">Vidéos YouTube</h2>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowVideoForm(!showVideoForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
              >
                {showVideoForm ? 'Annuler' : 'Ajouter une vidéo'}
              </button>
            )}
          </div>

          {user?.role === 'admin' && showVideoForm && (
            <form onSubmit={handleAddVideo} className="p-8 rounded-2xl mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <span>🎥</span> Ajouter une vidéo
              </h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Titre de la vidéo
                  </label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    className="w-full p-3 rounded-lg border"
                    placeholder="Ex: Introduction à React"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    URL YouTube
                  </label>
                  <input
                    type="url"
                    value={newVideo.youtube_url}
                    onChange={(e) => setNewVideo({ ...newVideo, youtube_url: e.target.value })}
                    className="w-full p-3 rounded-lg border"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                  <p className="mt-2 text-sm">
                    Format accepté : https://www.youtube.com/watch?v=... ou https://youtu.be/...
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg font-medium"
                  >
                    Ajouter la vidéo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowVideoForm(false);
                      setNewVideo({ title: '', youtube_url: '' });
                      setError('');
                    }}
                    className="rounded-lg font-medium"
                  >
                    Annuler
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 rounded-lg">
                  {error}
                </div>
              )}
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary">
                {editingVideoId === video.id ? (
                  <div className="mb-4">
                    <div className="mb-4">
                      <label className="block mb-2">Titre de la vidéo</label>
                      <input
                        type="text"
                        value={editVideoTitle}
                        onChange={(e) => setEditVideoTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Nouveau titre"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">URL YouTube</label>
                      <input
                        type="url"
                        value={editVideoUrl}
                        onChange={(e) => setEditVideoUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Nouvelle URL YouTube"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditVideo(video.id)}
                        className="rounded-md text-sm"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => {
                          setEditingVideoId(null);
                          setEditVideoTitle('');
                          setEditVideoUrl('');
                        }}
                        className="rounded-md text-sm"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="font-semibold text-lg mb-3">{video.title}</h3>
                )}
                <a
                  href={video.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline mb-4 block"
                >
                  Voir la vidéo
                </a>
                {user?.role === 'admin' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditingVideoId(video.id);
                        setEditVideoTitle(video.title);
                        setEditVideoUrl(video.youtube_url);
                      }}
                      className="transition duration-200"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="transition duration-200"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 