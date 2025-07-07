(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/supabaseClient.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "supabase": (()=>supabase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabaseUrl = 'https://fbbsameldccmlnxpugpn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiYnNhbWVsZGNjbWxueHB1Z3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NDMyMTMsImV4cCI6MjA2NDUxOTIxM30.OLz7Xl3U41VA-jVXDwLDVOV0qG5ivwFcIF_uuCnL5M4';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/admin/cours/[id]/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CourseResourcesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CourseResourcesPage({ params }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [course, setCourse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pdfs, setPdfs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [videos, setVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadingPdf, setUploadingPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Form states
    const [showPdfForm, setShowPdfForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showVideoForm, setShowVideoForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPdf, setNewPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        file: null
    });
    const [newVideo, setNewVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        youtube_url: ''
    });
    const [editingPdfId, setEditingPdfId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingVideoId, setEditingVideoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editPdfTitle, setEditPdfTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editVideoTitle, setEditVideoTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editPdfFile, setEditPdfFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editVideoUrl, setEditVideoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadingEditPdf, setUploadingEditPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourseResourcesPage.useEffect": ()=>{
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                setUser(parsed);
            } else {
                router.push('/');
            }
            fetchCourseData();
        }
    }["CourseResourcesPage.useEffect"], [
        params.id
    ]);
    const fetchCourseData = async ()=>{
        try {
            // Fetch course details
            const { data: courseData, error: courseError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('cours').select('*').eq('id', params.id).single();
            if (courseError) throw courseError;
            setCourse(courseData);
            // Fetch PDFs
            const { data: pdfsData, error: pdfsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_pdfs').select('*').eq('course_id', params.id).order('created_at', {
                ascending: false
            });
            if (pdfsError) throw pdfsError;
            setPdfs(pdfsData);
            // Fetch videos
            const { data: videosData, error: videosError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_videos').select('*').eq('course_id', params.id).order('created_at', {
                ascending: false
            });
            if (videosError) throw videosError;
            setVideos(videosData);
        } catch (error) {
            console.error('Error fetching course data:', error);
            setError('Erreur lors du chargement des données du cours');
        } finally{
            setLoading(false);
        }
    };
    const handleAddPdf = async (e)=>{
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
            const { data: uploadData, error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('pdfs').upload(filePath, newPdf.file, {
                cacheControl: '3600',
                upsert: false
            });
            if (uploadError) {
                console.error('Upload error details:', uploadError);
                throw new Error(`Erreur lors de l'upload du fichier: ${uploadError.message}`);
            }
            console.log('Upload successful:', uploadData);
            // Get public URL
            const { data: { publicUrl } } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('pdfs').getPublicUrl(filePath);
            console.log('Public URL:', publicUrl);
            // Add PDF to database
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_pdfs').insert([
                {
                    course_id: params.id,
                    title: newPdf.title,
                    pdf_url: publicUrl
                }
            ]).select();
            if (error) {
                console.error('Database error:', error);
                throw new Error(`Erreur lors de l'ajout à la base de données: ${error.message}`);
            }
            setPdfs([
                ...pdfs,
                data[0]
            ]);
            setNewPdf({
                title: '',
                file: null
            });
            setShowPdfForm(false);
            setMessage('PDF ajouté avec succès!');
        } catch (error) {
            console.error('Error adding PDF:', error);
            setError(error.message || 'Erreur lors de l\'ajout du PDF');
        } finally{
            setUploadingPdf(false);
        }
    };
    const handleAddVideo = async (e)=>{
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
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_videos').insert([
                {
                    course_id: params.id,
                    title: newVideo.title.trim(),
                    youtube_url: newVideo.youtube_url.trim()
                }
            ]).select();
            if (error) {
                console.error('Erreur lors de l\'ajout de la vidéo:', error);
                throw new Error(`Erreur lors de l'ajout de la vidéo: ${error.message}`);
            }
            setVideos([
                ...videos,
                data[0]
            ]);
            setNewVideo({
                title: '',
                youtube_url: ''
            });
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
    const handleDeletePdf = async (pdfId)=>{
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce PDF ?')) return;
        try {
            // Récupérer l'URL du PDF pour supprimer le fichier du stockage
            const pdfToDelete = pdfs.find((pdf)=>pdf.id === pdfId);
            if (pdfToDelete) {
                const filePath = pdfToDelete.pdf_url.split('/').pop();
                const { error: storageError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('pdfs').remove([
                    filePath
                ]);
                if (storageError) {
                    console.error('Error deleting file from storage:', storageError);
                }
            }
            // Supprimer l'entrée de la base de données
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_pdfs').delete().eq('id', pdfId);
            if (error) throw error;
            setPdfs(pdfs.filter((pdf)=>pdf.id !== pdfId));
            setMessage('PDF supprimé avec succès!');
        } catch (error) {
            console.error('Error deleting PDF:', error);
            setError('Erreur lors de la suppression du PDF');
        }
    };
    const handleDeleteVideo = async (videoId)=>{
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) return;
        try {
            // Supprimer la vidéo
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_videos').delete().eq('id', videoId);
            if (error) {
                console.error('Erreur lors de la suppression de la vidéo:', error);
                throw new Error(`Erreur lors de la suppression de la vidéo: ${error.message}`);
            }
            // Mettre à jour l'état local
            setVideos(videos.filter((video)=>video.id !== videoId));
            setMessage('Vidéo supprimée avec succès!');
            setError(''); // Réinitialiser l'erreur en cas de succès
            // Recharger les données du cours
            fetchCourseData();
        } catch (error) {
            console.error('Erreur détaillée lors de la suppression de la vidéo:', error);
            setError(error.message || 'Erreur lors de la suppression de la vidéo');
        }
    };
    const handleEditPdf = async (pdfId)=>{
        try {
            let pdfUrl = pdfs.find((pdf)=>pdf.id === pdfId).pdf_url;
            // Si un nouveau fichier est sélectionné
            if (editPdfFile) {
                setUploadingEditPdf(true);
                // Supprimer l'ancien fichier
                const oldFilePath = pdfUrl.split('/').pop();
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('pdfs').remove([
                    oldFilePath
                ]);
                // Upload du nouveau fichier
                const fileExt = editPdfFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = fileName;
                const { data: uploadData, error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('pdfs').upload(filePath, editPdfFile, {
                    cacheControl: '3600',
                    upsert: false
                });
                if (uploadError) throw uploadError;
                // Obtenir la nouvelle URL publique
                const { data: { publicUrl } } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('pdfs').getPublicUrl(filePath);
                pdfUrl = publicUrl;
            }
            // Mettre à jour dans la base de données
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_pdfs').update({
                title: editPdfTitle,
                pdf_url: pdfUrl
            }).eq('id', pdfId);
            if (error) throw error;
            setPdfs(pdfs.map((pdf)=>pdf.id === pdfId ? {
                    ...pdf,
                    title: editPdfTitle,
                    pdf_url: pdfUrl
                } : pdf));
            setEditingPdfId(null);
            setEditPdfTitle('');
            setEditPdfFile(null);
            setMessage('PDF modifié avec succès!');
        } catch (error) {
            console.error('Error updating PDF:', error);
            setError('Erreur lors de la modification du PDF');
        } finally{
            setUploadingEditPdf(false);
        }
    };
    const handleEditVideo = async (videoId)=>{
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('course_videos').update({
                title: editVideoTitle,
                youtube_url: editVideoUrl
            }).eq('id', videoId);
            if (error) throw error;
            setVideos(videos.map((video)=>video.id === videoId ? {
                    ...video,
                    title: editVideoTitle,
                    youtube_url: editVideoUrl
                } : video));
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/cours/[id]/page.js",
                lineNumber: 358,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/cours/[id]/page.js",
            lineNumber: 357,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "font-bold mb-8 text-center",
                    children: course?.title
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                    lineNumber: 366,
                    columnNumber: 9
                }, this),
                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded mb-4",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                    lineNumber: 369,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded mb-4",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                    lineNumber: 375,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold",
                                    children: "PDFs du cours"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                user?.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowPdfForm(!showPdfForm),
                                    className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200",
                                    children: showPdfForm ? 'Annuler' : 'Ajouter un PDF'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this),
                        user?.role === 'admin' && showPdfForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleAddPdf,
                            className: "p-6 rounded-2xl mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2",
                                            children: "Titre du PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 397,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newPdf.title,
                                            onChange: (e)=>setNewPdf({
                                                    ...newPdf,
                                                    title: e.target.value
                                                }),
                                            className: "w-full p-2 border rounded",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2",
                                            children: "Fichier PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 407,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: ".pdf",
                                            onChange: (e)=>setNewPdf({
                                                    ...newPdf,
                                                    file: e.target.files[0]
                                                }),
                                            className: "w-full p-2 border rounded",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 408,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm mt-1",
                                            children: "Taille maximale : 10MB"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 406,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: uploadingPdf,
                                    className: "rounded-md",
                                    children: uploadingPdf ? 'Upload en cours...' : 'Ajouter'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 417,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                            lineNumber: 395,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: pdfs.map((pdf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary",
                                    children: [
                                        editingPdfId === pdf.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block mb-2",
                                                            children: "Titre du PDF"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 433,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: editPdfTitle,
                                                            onChange: (e)=>setEditPdfTitle(e.target.value),
                                                            className: "w-full p-2 border rounded mb-2",
                                                            placeholder: "Nouveau titre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 434,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 432,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block mb-2",
                                                            children: "Nouveau fichier PDF (optionnel)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 443,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: ".pdf",
                                                            onChange: (e)=>setEditPdfFile(e.target.files[0]),
                                                            className: "w-full p-2 border rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 444,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm mt-1",
                                                            children: "Laissez vide pour conserver le fichier actuel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 450,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 442,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleEditPdf(pdf.id),
                                                            disabled: uploadingEditPdf,
                                                            className: "rounded-md text-sm",
                                                            children: uploadingEditPdf ? 'Modification en cours...' : 'Sauvegarder'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 453,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setEditingPdfId(null);
                                                                setEditPdfTitle('');
                                                                setEditPdfFile(null);
                                                            },
                                                            className: "rounded-md text-sm",
                                                            children: "Annuler"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 460,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 452,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 431,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-lg mb-3",
                                            children: pdf.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 473,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: pdf.pdf_url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:underline mb-4 block",
                                            children: "Voir le PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 475,
                                            columnNumber: 17
                                        }, this),
                                        user?.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setEditingPdfId(pdf.id);
                                                        setEditPdfTitle(pdf.title);
                                                    },
                                                    className: "transition duration-200",
                                                    children: "Modifier"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 485,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDeletePdf(pdf.id),
                                                    className: "transition duration-200",
                                                    children: "Supprimer"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 494,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 484,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, pdf.id, true, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                            lineNumber: 427,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                    lineNumber: 381,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold",
                                    children: "Vidéos YouTube"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this),
                                user?.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowVideoForm(!showVideoForm),
                                    className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200",
                                    children: showVideoForm ? 'Annuler' : 'Ajouter une vidéo'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 512,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                            lineNumber: 509,
                            columnNumber: 11
                        }, this),
                        user?.role === 'admin' && showVideoForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleAddVideo,
                            className: "p-8 rounded-2xl mb-8 shadow-lg hover:shadow-xl transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold mb-6 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "🎥"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 524,
                                            columnNumber: 17
                                        }, this),
                                        " Ajouter une vidéo"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 523,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium mb-2",
                                                    children: "Titre de la vidéo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 529,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: newVideo.title,
                                                    onChange: (e)=>setNewVideo({
                                                            ...newVideo,
                                                            title: e.target.value
                                                        }),
                                                    className: "w-full p-3 rounded-lg border",
                                                    placeholder: "Ex: Introduction à React",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 532,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 528,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium mb-2",
                                                    children: "URL YouTube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 543,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    value: newVideo.youtube_url,
                                                    onChange: (e)=>setNewVideo({
                                                            ...newVideo,
                                                            youtube_url: e.target.value
                                                        }),
                                                    className: "w-full p-3 rounded-lg border",
                                                    placeholder: "https://www.youtube.com/watch?v=...",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 546,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm",
                                                    children: "Format accepté : https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 554,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 542,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4 pt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "flex-1 rounded-lg font-medium",
                                                    children: "Ajouter la vidéo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 560,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setShowVideoForm(false);
                                                        setNewVideo({
                                                            title: '',
                                                            youtube_url: ''
                                                        });
                                                        setError('');
                                                    },
                                                    className: "rounded-lg font-medium",
                                                    children: "Annuler"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 566,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 527,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-4 rounded-lg",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 581,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                            lineNumber: 522,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: videos.map((video)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary",
                                    children: [
                                        editingVideoId === video.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block mb-2",
                                                            children: "Titre de la vidéo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 594,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: editVideoTitle,
                                                            onChange: (e)=>setEditVideoTitle(e.target.value),
                                                            className: "w-full p-2 border rounded mb-2",
                                                            placeholder: "Nouveau titre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 595,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 593,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block mb-2",
                                                            children: "URL YouTube"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 604,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "url",
                                                            value: editVideoUrl,
                                                            onChange: (e)=>setEditVideoUrl(e.target.value),
                                                            className: "w-full p-2 border rounded",
                                                            placeholder: "Nouvelle URL YouTube"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 605,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 603,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleEditVideo(video.id),
                                                            className: "rounded-md text-sm",
                                                            children: "Sauvegarder"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 614,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setEditingVideoId(null);
                                                                setEditVideoTitle('');
                                                                setEditVideoUrl('');
                                                            },
                                                            className: "rounded-md text-sm",
                                                            children: "Annuler"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                            lineNumber: 620,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 613,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 592,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-lg mb-3",
                                            children: video.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 633,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: video.youtube_url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:underline mb-4 block",
                                            children: "Voir la vidéo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 635,
                                            columnNumber: 17
                                        }, this),
                                        user?.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setEditingVideoId(video.id);
                                                        setEditVideoTitle(video.title);
                                                        setEditVideoUrl(video.youtube_url);
                                                    },
                                                    className: "transition duration-200",
                                                    children: "Modifier"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 645,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDeleteVideo(video.id),
                                                    className: "transition duration-200",
                                                    children: "Supprimer"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                                    lineNumber: 655,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                            lineNumber: 644,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, video.id, true, {
                                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                                    lineNumber: 590,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/cours/[id]/page.js",
                            lineNumber: 588,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/cours/[id]/page.js",
                    lineNumber: 508,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/cours/[id]/page.js",
            lineNumber: 365,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/cours/[id]/page.js",
        lineNumber: 364,
        columnNumber: 5
    }, this);
}
_s(CourseResourcesPage, "9wCPDRExfOaj4rN/mmbmr1JeCMk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CourseResourcesPage;
var _c;
__turbopack_context__.k.register(_c, "CourseResourcesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_a6dc099e._.js.map