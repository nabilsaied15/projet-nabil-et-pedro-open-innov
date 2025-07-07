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
"[project]/src/app/mes-candidatures/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MesCandidaturesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function MesCandidaturesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [candidatures, setCandidatures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentDossier, setCurrentDossier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCandidature, setEditingCandidature] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filterStatut, setFilterStatut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Tous');
    const [newCandidature, setNewCandidature] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        entreprise: '',
        poste: '',
        date_candidature: '',
        statut: 'En attente',
        notes: ''
    });
    const [cvFile, setCvFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cvUploading, setCvUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cvError, setCvError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [cvSuccess, setCvSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadedCvs, setUploadedCvs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAiResponding, setIsAiResponding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [popup, setPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        type: '',
        message: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MesCandidaturesPage.useEffect": ()=>{
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
            const fetchDossierName = {
                "MesCandidaturesPage.useEffect.fetchDossierName": async ()=>{
                    try {
                        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('dossiers').select('nom').eq('id', parseInt(dossierId)).single();
                        if (error) throw error;
                        setCurrentUser(user);
                        setCurrentDossier({
                            id: dossierId,
                            nom: data.nom
                        });
                        fetchCandidatures(dossierId);
                        fetchMessages(dossierId);
                        fetchCvs(dossierId);
                    } catch (error) {
                        console.error('Erreur lors de la récupération du dossier:', error);
                        router.push('/dossiers');
                    }
                }
            }["MesCandidaturesPage.useEffect.fetchDossierName"];
            fetchDossierName();
        }
    }["MesCandidaturesPage.useEffect"], []);
    const fetchCandidatures = async (dossierId)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('candidatures').select('*').eq('dossier_id', parseInt(dossierId)).order('date_candidature', {
                ascending: false
            });
            if (error) throw error;
            setCandidatures(data || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des candidatures:', error);
        } finally{
            setLoading(false);
        }
    };
    const fetchMessages = async (dossierId)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('conversations').select('*').eq('dossier_id', parseInt(dossierId)).order('created_at', {
                ascending: true
            });
            if (error) throw error;
            console.log('Fetched messages data:', data);
            setMessages(data || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages:', error);
        }
    };
    const fetchCvs = async (dossierId)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('cvs').select('*').eq('dossier_id', parseInt(dossierId)).order('created_at', {
                ascending: false
            });
            if (error) throw error;
            setUploadedCvs(data || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des CVs:', error);
        }
    };
    const getCvUrl = async (filePath)=>{
        try {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('cvs').createSignedUrl(filePath, 60); // URL valide pendant 60 secondes
            return data?.signedUrl;
        } catch (error) {
            console.error('Erreur lors de la génération de l\'URL:', error);
            return null;
        }
    };
    const handleDownloadCv = async (cv)=>{
        try {
            const url = await getCvUrl(cv.file_path);
            if (url) {
                window.open(url, '_blank');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
        }
    };
    const handleDeleteCv = async (cvId, filePath)=>{
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) return;
        try {
            // Supprimer le fichier du stockage
            const { error: storageError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('cvs').remove([
                filePath
            ]);
            if (storageError) throw storageError;
            // Supprimer l'enregistrement de la base de données
            const { error: dbError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('cvs').delete().eq('id', cvId);
            if (dbError) throw dbError;
            // Rafraîchir la liste des CVs
            await fetchCvs(currentDossier.id);
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            alert('Erreur lors de la suppression du CV');
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if (editingCandidature) {
                // Modification d'une candidature existante
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('candidatures').update(newCandidature).eq('id', editingCandidature.id).select();
                if (error) throw error;
                setCandidatures(candidatures.map((c)=>c.id === editingCandidature.id ? data[0] : c));
                // Afficher la popup si statut Accepté ou Refusé
                if (data[0].statut === 'Accepté') {
                    setPopup({
                        show: true,
                        type: 'success',
                        message: 'Candidature acceptée !'
                    });
                } else if (data[0].statut === 'Refusé') {
                    setPopup({
                        show: true,
                        type: 'error',
                        message: 'Candidature refusée. Pleure pas '
                    });
                }
            } else {
                // Création d'une nouvelle candidature
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('candidatures').insert([
                    {
                        ...newCandidature,
                        dossier_id: parseInt(currentDossier.id)
                    }
                ]).select();
                if (error) throw error;
                setCandidatures([
                    ...candidatures,
                    data[0]
                ]);
                // Afficher la popup si statut Accepté ou Refusé
                if (data[0].statut === 'Accepté') {
                    setPopup({
                        show: true,
                        type: 'success',
                        message: 'Candidature acceptée !'
                    });
                } else if (data[0].statut === 'Refusé') {
                    setPopup({
                        show: true,
                        type: 'error',
                        message: 'Candidature refusée.'
                    });
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
    const handleEdit = (candidature)=>{
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
    const handleDelete = async (candidatureId)=>{
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
            return;
        }
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('candidatures').delete().eq('id', candidatureId);
            if (error) throw error;
            setCandidatures(candidatures.filter((c)=>c.id !== candidatureId));
        } catch (error) {
            console.error('Erreur lors de la suppression de la candidature:', error);
            alert('Erreur lors de la suppression de la candidature');
        }
    };
    const handleCvUpload = async (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        // Vérifier le type de fichier
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
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
    const uploadCv = async ()=>{
        if (!cvFile || !currentDossier) return;
        setCvUploading(true);
        setCvError('');
        setCvSuccess('');
        try {
            // 1. Téléverser le fichier dans le bucket Supabase
            const fileExt = cvFile.name.split('.').pop();
            const fileName = `${currentDossier.id}/${Date.now()}.${fileExt}`;
            console.log('Tentative de téléversement du fichier:', fileName);
            const { data: uploadData, error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('cvs').upload(fileName, cvFile, {
                cacheControl: '3600',
                upsert: false
            });
            if (uploadError) {
                console.error('Erreur de téléversement:', uploadError);
                throw new Error(`Erreur de téléversement: ${uploadError.message}`);
            }
            console.log('Fichier téléversé avec succès:', uploadData);
            // 2. Enregistrer les métadonnées dans la table cvs
            const { data: dbData, error: dbError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('cvs').insert([
                {
                    dossier_id: parseInt(currentDossier.id),
                    file_name: cvFile.name,
                    file_path: fileName,
                    file_type: cvFile.type,
                    file_size: cvFile.size
                }
            ]).select();
            if (dbError) {
                console.error('Erreur de base de données:', dbError);
                // Si l'insertion échoue, supprimer le fichier téléversé
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('cvs').remove([
                    fileName
                ]);
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
        } finally{
            setCvUploading(false);
        }
    };
    const handleSendMessage = async (e)=>{
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
            const { data: userMessageData, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('conversations').insert([
                {
                    dossier_id: parseInt(currentDossier.id),
                    message: newMessage,
                    is_ai: isAdmin,
                    user_name: isAdmin ? 'Admin' : currentUser.name,
                    created_at: new Date().toISOString()
                }
            ]).select();
            if (userError) {
                console.error('Erreur détaillée lors de l\'envoi du message:', userError);
                throw new Error(`Erreur lors de l'envoi du message: ${userError.message}`);
            }
            console.log('Message envoyé avec succès:', userMessageData);
            // Mettre à jour l'état local
            setMessages((prev)=>[
                    ...prev,
                    userMessageData[0]
                ]);
            setNewMessage('');
        } catch (error) {
            console.error('Erreur complète lors de l\'envoi du message:', error);
            alert(`Erreur lors de l'envoi du message: ${error.message}`);
        }
    };
    const filteredCandidatures = candidatures.filter((candidature)=>filterStatut === 'Tous' || candidature.statut === filterStatut);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MesCandidaturesPage.useEffect": ()=>{
            if (popup.show) {
                const timer = setTimeout({
                    "MesCandidaturesPage.useEffect.timer": ()=>{
                        setPopup({
                            show: false,
                            type: '',
                            message: ''
                        });
                    }
                }["MesCandidaturesPage.useEffect.timer"], 2000);
                return ({
                    "MesCandidaturesPage.useEffect": ()=>clearTimeout(timer)
                })["MesCandidaturesPage.useEffect"];
            }
        }
    }["MesCandidaturesPage.useEffect"], [
        popup
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
            }, void 0, false, {
                fileName: "[project]/src/app/mes-candidatures/page.js",
                lineNumber: 415,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mes-candidatures/page.js",
            lineNumber: 414,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-27bc374a2354a793" + " " + "min-h-screen",
        children: [
            popup.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-27bc374a2354a793" + " " + "fixed inset-0 flex items-center justify-center z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-27bc374a2354a793" + " " + `p-8 rounded-xl shadow-lg text-2xl font-bold transition-all
            ${popup.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${popup.type === 'error' ? 'bg-red-500 text-white' : ''}
          `,
                        children: popup.message
                    }, void 0, false, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 425,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setPopup({
                                show: false,
                                type: '',
                                message: ''
                            }),
                        className: "jsx-27bc374a2354a793" + " " + "fixed inset-0 bg-black opacity-30"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 431,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mes-candidatures/page.js",
                lineNumber: 424,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-27bc374a2354a793" + " " + "p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-27bc374a2354a793" + " " + "flex justify-between items-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-27bc374a2354a793",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-2xl font-bold",
                                        children: "Mes Candidatures"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 440,
                                        columnNumber: 13
                                    }, this),
                                    currentDossier && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-gray-400 mt-2",
                                        children: [
                                            "Dossier : ",
                                            currentDossier.nom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 439,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-27bc374a2354a793" + " " + "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterStatut,
                                        onChange: (e)=>setFilterStatut(e.target.value),
                                        className: "jsx-27bc374a2354a793" + " " + "px-4 py-2 rounded-md border focus:outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Tous",
                                                className: "jsx-27bc374a2354a793",
                                                children: "Tous les statuts"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 451,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "En attente",
                                                className: "jsx-27bc374a2354a793",
                                                children: "En attente"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 452,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Entretien",
                                                className: "jsx-27bc374a2354a793",
                                                children: "Entretien"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 453,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Refusé",
                                                className: "jsx-27bc374a2354a793",
                                                children: "Refusé"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 454,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Accepté",
                                                className: "jsx-27bc374a2354a793",
                                                children: "Accepté"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 455,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 446,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
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
                                        },
                                        className: "jsx-27bc374a2354a793" + " " + "button px-4 py-2 rounded-md transition duration-200",
                                        children: showForm ? 'Annuler' : 'Ajouter une candidature'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 457,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 445,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this),
                    showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-27bc374a2354a793" + " " + "rounded-lg p-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-27bc374a2354a793" + " " + "text-xl font-semibold mb-4",
                                children: editingCandidature ? 'Modifier la candidature' : 'Nouvelle Candidature'
                            }, void 0, false, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "jsx-27bc374a2354a793" + " " + "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-27bc374a2354a793" + " " + "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Entreprise"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 485,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newCandidature.entreprise,
                                                onChange: (e)=>setNewCandidature({
                                                        ...newCandidature,
                                                        entreprise: e.target.value
                                                    }),
                                                required: true,
                                                className: "jsx-27bc374a2354a793" + " " + "w-full p-2 rounded border focus:outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 488,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 484,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-27bc374a2354a793" + " " + "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Poste"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newCandidature.poste,
                                                onChange: (e)=>setNewCandidature({
                                                        ...newCandidature,
                                                        poste: e.target.value
                                                    }),
                                                required: true,
                                                className: "jsx-27bc374a2354a793" + " " + "w-full p-2 rounded border focus:outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 500,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-27bc374a2354a793" + " " + "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Date de candidature"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 509,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: newCandidature.date_candidature,
                                                onChange: (e)=>setNewCandidature({
                                                        ...newCandidature,
                                                        date_candidature: e.target.value
                                                    }),
                                                required: true,
                                                className: "jsx-27bc374a2354a793" + " " + "w-full p-2 rounded border focus:outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 512,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 508,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-27bc374a2354a793" + " " + "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Statut"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 521,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newCandidature.statut,
                                                onChange: (e)=>setNewCandidature({
                                                        ...newCandidature,
                                                        statut: e.target.value
                                                    }),
                                                required: true,
                                                className: "jsx-27bc374a2354a793" + " " + "w-full p-2 rounded border focus:outline-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "En attente",
                                                        className: "jsx-27bc374a2354a793",
                                                        children: "En attente"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 530,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Entretien",
                                                        className: "jsx-27bc374a2354a793",
                                                        children: "Entretien"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 531,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Refusé",
                                                        className: "jsx-27bc374a2354a793",
                                                        children: "Refusé"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 532,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Accepté",
                                                        className: "jsx-27bc374a2354a793",
                                                        children: "Accepté"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 533,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-27bc374a2354a793" + " " + "block text-sm font-medium text-gray-300 mb-2",
                                                children: "Notes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 537,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: newCandidature.notes,
                                                onChange: (e)=>setNewCandidature({
                                                        ...newCandidature,
                                                        notes: e.target.value
                                                    }),
                                                rows: "3",
                                                className: "jsx-27bc374a2354a793" + " " + "w-full p-2 rounded border focus:outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 540,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "jsx-27bc374a2354a793" + " " + "button px-4 py-2 rounded-md transition duration-200",
                                        children: [
                                            editingCandidature ? 'Modifier' : 'Ajouter',
                                            " la candidature"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 547,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 483,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 479,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-27bc374a2354a793" + " " + "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: filteredCandidatures.map((candidature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-27bc374a2354a793" + " " + `rounded-2xl p-4 shadow-md hover:shadow-xl transition relative overflow-hidden border border-primary
                ${candidature.statut === 'Accepté' ? 'bg-green-200 ring-4 ring-success' : ''}
                ${candidature.statut === 'Refusé' ? 'bg-red-200' : ''}
                ${candidature.statut !== 'Accepté' && candidature.statut !== 'Refusé' ? 'bg-white' : ''}
              `,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793" + " " + "flex justify-between items-start mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-27bc374a2354a793" + " " + "font-semibold text-lg text-primary",
                                                children: candidature.entreprise
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 568,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleEdit(candidature),
                                                        className: "jsx-27bc374a2354a793" + " " + "text-blue-400 hover:text-blue-300",
                                                        children: "✏️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 570,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDelete(candidature.id),
                                                        className: "jsx-27bc374a2354a793" + " " + "text-red-400 hover:text-red-300",
                                                        children: "🗑️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 576,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 569,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 567,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-sm mb-1",
                                        children: [
                                            "Poste : ",
                                            candidature.poste
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-sm mb-1",
                                        children: [
                                            "Date : ",
                                            new Date(candidature.date_candidature).toLocaleDateString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 585,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-sm mb-1",
                                        children: [
                                            "Statut : ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-27bc374a2354a793" + " " + `${candidature.statut === 'Accepté' ? 'text-green-400 font-bold animate-bounce' : candidature.statut === 'Refusé' ? 'text-red-400' : candidature.statut === 'Entretien' ? 'text-yellow-400' : 'text-gray-400'}`,
                                                children: candidature.statut
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 589,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 588,
                                        columnNumber: 15
                                    }, this),
                                    candidature.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-sm mt-2 border-t border-primary pt-2",
                                        children: candidature.notes
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 597,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, candidature.id, true, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 557,
                        columnNumber: 9
                    }, this),
                    filteredCandidatures.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-27bc374a2354a793" + " " + "text-center py-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-27bc374a2354a793" + " " + "text-gray-400",
                            children: candidatures.length === 0 ? "Aucune candidature enregistrée." : "Aucune candidature ne correspond au filtre sélectionné."
                        }, void 0, false, {
                            fileName: "[project]/src/app/mes-candidatures/page.js",
                            lineNumber: 607,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 606,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-27bc374a2354a793" + " " + "mt-12 grid grid-cols-1 md:grid-cols-2 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-27bc374a2354a793" + " " + "rounded-xl p-6 border border-primary bg-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-xl font-semibold mb-4",
                                        children: [
                                            "📄 CV pour ",
                                            currentDossier?.nom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 619,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793" + " " + "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "border-2 border-dashed border-primary rounded-lg p-6 text-center bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: ".pdf,.doc,.docx",
                                                        id: "cv-upload",
                                                        onChange: handleCvUpload,
                                                        className: "jsx-27bc374a2354a793" + " " + "hidden"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 622,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "cv-upload",
                                                        className: "jsx-27bc374a2354a793" + " " + "cursor-pointer block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-27bc374a2354a793" + " " + "text-gray-400 mb-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    className: "jsx-27bc374a2354a793" + " " + "mx-auto h-12 w-12",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
                                                                        className: "jsx-27bc374a2354a793"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                        lineNumber: 635,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                    lineNumber: 634,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                lineNumber: 633,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-27bc374a2354a793" + " " + "text-gray-300",
                                                                children: "Cliquez pour sélectionner votre CV"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                lineNumber: 638,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-27bc374a2354a793" + " " + "text-gray-400 text-sm mt-1",
                                                                children: "Formats acceptés: PDF, DOC, DOCX"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                lineNumber: 639,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 629,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 621,
                                                columnNumber: 15
                                            }, this),
                                            cvFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "text-sm text-primary",
                                                children: [
                                                    "Fichier sélectionné : ",
                                                    cvFile.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 643,
                                                columnNumber: 17
                                            }, this),
                                            cvError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "text-sm text-error",
                                                children: cvError
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, this),
                                            cvSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "text-sm text-success",
                                                children: cvSuccess
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 653,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: uploadCv,
                                                disabled: !cvFile || cvUploading,
                                                className: "jsx-27bc374a2354a793" + " " + "button px-4 py-2 rounded-lg transition-colors disabled:opacity-50",
                                                children: cvUploading ? 'Téléversement en cours...' : 'Téléverser CV'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 657,
                                                columnNumber: 15
                                            }, this),
                                            uploadedCvs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-27bc374a2354a793" + " " + "text-lg font-semibold mb-3",
                                                        children: "CVs téléversés"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 668,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-27bc374a2354a793" + " " + "space-y-3",
                                                        children: uploadedCvs.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-27bc374a2354a793" + " " + "bg-gray-200 rounded-lg p-3 flex items-center justify-between border border-primary",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-27bc374a2354a793" + " " + "flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "jsx-27bc374a2354a793" + " " + "text-sm font-medium text-primary",
                                                                                children: cv.file_name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                                lineNumber: 673,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "jsx-27bc374a2354a793" + " " + "text-xs text-primary/70",
                                                                                children: [
                                                                                    "Téléversé le ",
                                                                                    new Date(cv.created_at).toLocaleDateString()
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                                lineNumber: 674,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                        lineNumber: 672,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-27bc374a2354a793" + " " + "flex gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleDownloadCv(cv),
                                                                                title: "Télécharger",
                                                                                className: "jsx-27bc374a2354a793" + " " + "text-accent hover:text-accent/80",
                                                                                children: "⬇️"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                                lineNumber: 679,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleDeleteCv(cv.id, cv.file_path),
                                                                                title: "Supprimer",
                                                                                className: "jsx-27bc374a2354a793" + " " + "text-error hover:text-error/80",
                                                                                children: "🗑️"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                                lineNumber: 686,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                        lineNumber: 678,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, cv.id, true, {
                                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                lineNumber: 671,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 669,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 667,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 620,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-27bc374a2354a793" + " " + "rounded-xl p-6 border border-primary bg-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-27bc374a2354a793" + " " + "text-xl font-semibold mb-4",
                                        children: [
                                            "💬 Messages pour ",
                                            currentDossier?.nom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 704,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-27bc374a2354a793" + " " + "flex flex-col h-[600px] bg-white rounded-lg border border-primary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "flex-1 overflow-y-auto p-4 space-y-4",
                                                children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-27bc374a2354a793" + " " + "text-center text-primary/60 py-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-27bc374a2354a793",
                                                            children: "Aucun message"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mes-candidatures/page.js",
                                                            lineNumber: 709,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-27bc374a2354a793" + " " + "text-sm mt-2",
                                                            children: "Envoyez un message pour commencer la conversation"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mes-candidatures/page.js",
                                                            lineNumber: 710,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mes-candidatures/page.js",
                                                    lineNumber: 708,
                                                    columnNumber: 19
                                                }, this) : messages.map((message)=>{
                                                    // Si le nom de l'utilisateur est 'Admin', afficher à gauche en gris
                                                    // Sinon, afficher à droite en bleu
                                                    const isMessageFromAdmin = message.user_name === 'Admin';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-27bc374a2354a793" + " " + `w-full flex ${isMessageFromAdmin ? 'justify-start' : 'justify-end'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-27bc374a2354a793" + " " + `max-w-[80%] p-4 rounded-lg border ${isMessageFromAdmin ? 'bg-gray-200 text-primary rounded-tl-none border-primary' : 'bg-accent text-white rounded-tr-none border-accent'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-27bc374a2354a793" + " " + "text-xs font-semibold mb-1",
                                                                    children: message.user_name || 'Admin'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                    lineNumber: 730,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-27bc374a2354a793" + " " + "text-sm",
                                                                    children: message.message
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                    lineNumber: 733,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-27bc374a2354a793" + " " + "text-xs opacity-75 mt-2",
                                                                    children: new Date(message.created_at).toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mes-candidatures/page.js",
                                                                    lineNumber: 734,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/mes-candidatures/page.js",
                                                            lineNumber: 723,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, message.id, false, {
                                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                                        lineNumber: 719,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 706,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-27bc374a2354a793" + " " + "border-t border-primary p-4 bg-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                    onSubmit: handleSendMessage,
                                                    className: "jsx-27bc374a2354a793" + " " + "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: newMessage,
                                                            onChange: (e)=>setNewMessage(e.target.value),
                                                            placeholder: "Écrivez votre message...",
                                                            className: "jsx-27bc374a2354a793" + " " + "flex-1 bg-gray-100 text-primary rounded-lg px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mes-candidatures/page.js",
                                                            lineNumber: 745,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            disabled: !newMessage.trim(),
                                                            className: "jsx-27bc374a2354a793" + " " + "button px-4 py-2 rounded-lg transition-colors disabled:opacity-50",
                                                            children: "Envoyer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mes-candidatures/page.js",
                                                            lineNumber: 752,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mes-candidatures/page.js",
                                                    lineNumber: 744,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                                lineNumber: 743,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mes-candidatures/page.js",
                                        lineNumber: 705,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mes-candidatures/page.js",
                                lineNumber: 703,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mes-candidatures/page.js",
                        lineNumber: 616,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mes-candidatures/page.js",
                lineNumber: 437,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "609041f2f4063bc2",
                children: "@keyframes shine{0%{transform:translate(-100%)}to{transform:translate(100%)}}.animate-shine{animation:2s infinite shine}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "17cbbdb06ae6c6dd",
                children: ".message-container.jsx-27bc374a2354a793{width:100%;margin-bottom:1rem;display:flex}.message-user.jsx-27bc374a2354a793{justify-content:flex-end}.message-admin.jsx-27bc374a2354a793{justify-content:flex-start}.message-bubble.jsx-27bc374a2354a793{border-radius:.5rem;max-width:80%;padding:1rem;box-shadow:0 1px 2px #0000001a}.message-user-bubble.jsx-27bc374a2354a793{color:#fff;background-color:#2563eb;border-top-right-radius:0}.message-admin-bubble.jsx-27bc374a2354a793{color:#fff;background-color:#374151;border-top-left-radius:0}.message-bubble.jsx-27bc374a2354a793 p.jsx-27bc374a2354a793{margin:0;line-height:1.5}.message-bubble.jsx-27bc374a2354a793 .timestamp.jsx-27bc374a2354a793{opacity:.7;margin-top:.5rem;font-size:.75rem}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mes-candidatures/page.js",
        lineNumber: 421,
        columnNumber: 5
    }, this);
}
_s(MesCandidaturesPage, "OppcZ4ToqpaAjhNFPl7NFt4Eo9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MesCandidaturesPage;
var _c;
__turbopack_context__.k.register(_c, "MesCandidaturesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_cc5729cd._.js.map