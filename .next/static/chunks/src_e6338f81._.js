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
"[project]/src/app/contacts/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ContactsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
const initialContacts = [
    {
        id: 1,
        name: 'Alice Martin',
        company: 'Capgemini',
        email: 'alice.martin@capgemini.com',
        phone: '06 12 34 56 78'
    },
    {
        id: 2,
        name: 'Jean Dupont',
        company: 'Google',
        email: 'jean.dupont@google.com',
        phone: '07 98 76 54 32'
    },
    {
        id: 3,
        name: 'Sophie Bernard',
        company: 'Microsoft',
        email: 'sophie.bernard@microsoft.com',
        phone: '06 22 33 44 55'
    },
    {
        id: 4,
        name: 'Karim Benali',
        company: 'Amazon',
        email: 'karim.benali@amazon.com',
        phone: '06 44 55 66 77'
    }
];
function getInitials(name) {
    return name.split(' ').map((n)=>n[0]).join('').toUpperCase();
}
function getMonthDays(year, month) {
    const days = [];
    const date = new Date(year, month, 1);
    while(date.getMonth() === month){
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
function isAvailable(date) {
    const day = date.getDay();
    // Samedi (6) ou dimanche (0) => indisponible
    if (day === 0 || day === 6) return false;
    return true;
}
function CalendarModal({ open, onClose, contact, onConfirmRdv, rdvs, setRdvs, userName, indispos, setIndispos, dispos, setDispos }) {
    _s();
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedHour, setSelectedHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmed, setConfirmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rdvPrisPopup, setRdvPrisPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getMonthDays(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const morningHours = [
        9,
        10,
        11,
        12,
        13
    ];
    const afternoonHours = [
        14,
        15,
        16,
        17,
        18
    ];
    // Liste des horaires déjà pris pour ce contact et cette date
    const takenHours = selectedDate ? rdvs.filter((rdv)=>rdv.contactId === contact.id && rdv.date === selectedDate.toISOString().split('T')[0]).map((rdv)=>rdv.hour) : [];
    const handleValidate = async ()=>{
        if (!selectedDate || !selectedHour) return;
        // Vérification côté client (optionnel mais rapide)
        const isAlreadyTaken = rdvs.some((r)=>r.contactId === contact.id && r.date === selectedDate.toISOString().split('T')[0] && r.hour === selectedHour);
        if (isAlreadyTaken) {
            setRdvPrisPopup(true);
            return;
        }
        // Vérification côté base (pour éviter les collisions si plusieurs utilisateurs cliquent en même temps)
        const { data: existing, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').select('*').eq('contactId', contact.id).eq('date', selectedDate.toISOString().split('T')[0]).eq('hour', selectedHour);
        if (existing && existing.length > 0) {
            alert('Ce créneau est déjà réservé !');
            return;
        }
        // Récupère l'utilisateur courant
        const user = "object" !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const userEmail = user?.email || '';
        // Prépare le RDV à insérer
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').insert([
            {
                contactId: contact.id,
                contactName: contact.name,
                date: selectedDate.toISOString().split('T')[0],
                hour: selectedHour,
                userName: userName,
                userEmail: userEmail,
                motif_id: selectedMotifId,
                motif_custom: motifs.find((m)=>m.id == selectedMotifId)?.label === 'Autre' ? customMotif : null
            }
        ]);
        if (error) {
            alert('Erreur lors de la prise de RDV : ' + error.message);
            return;
        }
        if (Array.isArray(data) && data.length > 0) {
            setRdvs((prev)=>[
                    ...prev,
                    ...data
                ]);
        }
        // Recharge la liste
        const { data: newRdvs } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').select('*');
        setRdvs(newRdvs || []);
        // Affiche le message de confirmation
        setConfirmed(true);
        setTimeout(()=>{
            setConfirmed(false);
            onClose();
        }, 2000);
    };
    const handleDeleteRdv = async (id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').delete().eq('id', id);
        // Recharge la liste des RDV
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').select('*');
        if (!error && Array.isArray(data)) setRdvs(data);
    };
    const handleDateContextMenu = (date, e)=>{
        e.preventDefault();
        const key = `${contact.id}_${date.toISOString().split('T')[0]}`;
        setIndispos((prev)=>({
                ...prev,
                [key]: !prev[key]
            }));
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl p-8 shadow-xl w-full max-w-md relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute -top-5 right-4 button text-4xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all border-4",
                    "aria-label": "Fermer",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4 text-center",
                    children: [
                        "Prendre un RDV avec ",
                        contact.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 flex items-center justify-center z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 py-6 rounded-xl shadow-lg text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl mb-2",
                                children: "✔"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold",
                                children: "RDV confirmé !"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm mt-2",
                                children: "Votre rendez-vous a bien été enregistré."
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 152,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 151,
                    columnNumber: 11
                }, this),
                rdvPrisPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 flex items-center justify-center z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 py-6 rounded-xl shadow-lg text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl mb-2",
                                children: "⛔"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 162,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold",
                                children: "Ce créneau est déjà pris !"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mt-4 px-4 py-2 rounded font-bold",
                                onClick: ()=>setRdvPrisPopup(false),
                                children: "Fermer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 164,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 161,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 160,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setCurrentMonth(new Date(year, month - 1, 1));
                                setSelectedDate(null);
                                setSelectedHour(null);
                            },
                            className: "text-red-400 px-2 py-1 rounded hover:bg-gray-800",
                            children: "◀"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            children: currentMonth.toLocaleString('fr-FR', {
                                month: 'long',
                                year: 'numeric'
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setCurrentMonth(new Date(year, month + 1, 1));
                                setSelectedDate(null);
                                setSelectedHour(null);
                            },
                            className: "text-red-400 px-2 py-1 rounded hover:bg-gray-800",
                            children: "▶"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-7 gap-2 mb-2 text-center text-gray-400 text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Lun"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Mar"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Mer"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Jeu"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 53
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Ven"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 67
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400",
                            children: "Sam"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 81
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400",
                            children: "Dim"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 179,
                            columnNumber: 120
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-7 gap-2 mb-4",
                    children: [
                        Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, i, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)),
                        days.map((date)=>{
                            const available = isAvailable(date);
                            const key = `${contact.id}_${date.toISOString().split('T')[0]}`;
                            const isIndispo = indispos[key];
                            const isDispo = dispos[key];
                            let btnClass = '';
                            if (isIndispo) {
                                btnClass = 'cursor-not-allowed';
                            } else if (!available && (date.getDay() === 6 || date.getDay() === 0)) {
                                btnClass = 'cursor-not-allowed';
                            } else if (available && isDispo) {
                                btnClass = '';
                            } else if (available) {
                                btnClass = '';
                            } else {
                                btnClass = 'cursor-not-allowed';
                            }
                            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: !available || isIndispo,
                                className: `rounded-lg py-2 text-sm font-semibold transition w-full ${btnClass} ${isSelected ? 'ring-2 ring-yellow-400' : ''}`,
                                onClick: ()=>{
                                    setSelectedDate(date);
                                    setSelectedHour(null);
                                },
                                onContextMenu: (e)=>handleDateContextMenu(date, e),
                                title: isIndispo ? 'Indisponible' : 'Clic droit pour marquer comme indisponible',
                                children: date.getDate()
                            }, date.toISOString(), false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 204,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 181,
                    columnNumber: 9
                }, this),
                selectedDate && selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center font-semibold mb-2",
                            children: [
                                "Choisissez un horaire pour le ",
                                selectedDate.toLocaleDateString('fr-FR')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 text-sm text-gray-400",
                            children: "Matin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 mb-4 justify-center",
                            children: morningHours.filter((h)=>!takenHours.includes(h)).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `px-3 py-2 rounded-lg font-semibold text-sm transition shadow
                      ${selectedHour === h ? 'bg-yellow-400 text-black ring-2 ring-yellow-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`,
                                    onClick: ()=>setSelectedHour(h),
                                    children: [
                                        h,
                                        "h00"
                                    ]
                                }, h, true, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 228,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 text-sm text-gray-400",
                            children: "Après-midi"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 justify-center",
                            children: afternoonHours.filter((h)=>!takenHours.includes(h)).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `px-3 py-2 rounded-lg font-semibold text-sm transition shadow
                      ${selectedHour === h ? 'bg-yellow-400 text-black ring-2 ring-yellow-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`,
                                    onClick: ()=>setSelectedHour(h),
                                    children: [
                                        h,
                                        "h00"
                                    ]
                                }, h, true, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 246,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this),
                        selectedHour && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "mt-6 w-full font-bold py-3 rounded-lg shadow-lg transition",
                            onClick: handleValidate,
                            children: "Confirmer"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 260,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 221,
                    columnNumber: 11
                }, this),
                selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 text-center text-red-400 font-semibold text-lg",
                    children: "On ne travaille pas, c'est le weekend !"
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 270,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/contacts/page.js",
            lineNumber: 141,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/contacts/page.js",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s(CalendarModal, "Q1MNCJJ3pvISHE0SHLuSI5gItto=");
_c = CalendarModal;
function ContactModal({ open, onClose, onSave, initial, loading }) {
    _s1();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial || {
        name: "",
        company: "",
        email: "",
        phone: "",
        photo_url: "",
        role: ""
    });
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactModal.useEffect": ()=>{
            setForm(initial || {
                name: "",
                company: "",
                email: "",
                phone: "",
                photo_url: "",
                role: ""
            });
            setFile(null);
        }
    }["ContactModal.useEffect"], [
        initial,
        open
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-white/80",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transition-all duration-300 border-2 border-blue-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "absolute top-3 right-3 text-2xl font-bold text-blue-400 hover:text-blue-700 transition",
                    type: "button",
                    onClick: onClose,
                    "aria-label": "Fermer",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 290,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-blue-900 text-center mb-4",
                    children: initial ? "Modifier le contact" : "Ajouter un contact"
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 298,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Nom",
                    value: form.name,
                    onChange: (e)=>setForm({
                            ...form,
                            name: e.target.value
                        }),
                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 299,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Entreprise",
                    value: form.company,
                    onChange: (e)=>setForm({
                            ...form,
                            company: e.target.value
                        }),
                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 307,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Rôle (ex: RH, Manager, Candidat...)",
                    value: form.role,
                    onChange: (e)=>setForm({
                            ...form,
                            role: e.target.value
                        }),
                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 315,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    placeholder: "Email",
                    value: form.email,
                    onChange: (e)=>setForm({
                            ...form,
                            email: e.target.value
                        }),
                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 323,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Téléphone",
                    value: form.phone,
                    onChange: (e)=>setForm({
                            ...form,
                            phone: e.target.value
                        }),
                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition",
                    required: true
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 331,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            accept: "image/png, image/jpeg",
                            onChange: (e)=>setFile(e.target.files[0]),
                            className: "block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-400 mt-1",
                            children: "Photo (jpg/png, max 2Mo)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this),
                        form.photo_url && !file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: form.photo_url,
                            alt: "Photo",
                            className: "mt-2 w-20 h-20 object-cover rounded-full mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this),
                        file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 text-xs text-blue-400",
                            children: file.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 351,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 339,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition mb-2",
                    disabled: loading,
                    children: loading ? "Enregistrement..." : initial ? "Enregistrer" : "Ajouter"
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 354,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/contacts/page.js",
            lineNumber: 289,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/contacts/page.js",
        lineNumber: 288,
        columnNumber: 5
    }, this);
}
_s1(ContactModal, "c3GoavSL4MhBcjIilVCk/1t+IVc=");
_c1 = ContactModal;
function ConfirmModal({ open, onClose, onConfirm, text, loading }) {
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl p-8 shadow-xl w-full max-w-md relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute -top-5 right-4 button text-4xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-4",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 371,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-lg mb-6",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 377,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 rounded",
                            disabled: loading,
                            children: "Annuler"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            className: "px-4 py-2 rounded",
                            disabled: loading,
                            children: loading ? "Suppression..." : "Supprimer"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 386,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 378,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/contacts/page.js",
            lineNumber: 370,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/contacts/page.js",
        lineNumber: 369,
        columnNumber: 5
    }, this);
}
_c2 = ConfirmModal;
const DAYS = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
];
const HOURS = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18
];
function ContactsPage() {
    _s2();
    const [contacts, setContacts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        company: '',
        email: '',
        phone: '',
        role: '',
        photo_url: ''
    });
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAvailabilityModal, setShowAvailabilityModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedContact, setSelectedContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [availabilityMap, setAvailabilityMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // { contactId: { day: { hour: true/false } } }
    const [availability, setAvailability] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // { day: { hour: true/false } }
    const [showAvailabilityTextModal, setShowAvailabilityTextModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [availabilityTextContact, setAvailabilityTextContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showRdvModal, setShowRdvModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rdvContact, setRdvContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rdvUser, setRdvUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rdvDate, setRdvDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rdvHour, setRdvHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rdvSearchContact, setRdvSearchContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rdvSearchUser, setRdvSearchUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rdvError, setRdvError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rdvConfirmed, setRdvConfirmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hoursList = [
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18
    ];
    const [rdvs, setRdvs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filterContact, setFilterContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterUser, setFilterUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [motifs1, setMotifs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedMotifId1, setSelectedMotifId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [customMotif1, setCustomMotif] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Charger les disponibilités depuis la base au démarrage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactsPage.useEffect": ()=>{
            async function fetchDisponibilites() {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('disponibilites').select('*');
                if (!error && data) {
                    // Transforme les données en availabilityMap { contactId: { day: { hour: true } } }
                    const map = {};
                    data.forEach({
                        "ContactsPage.useEffect.fetchDisponibilites": (d)=>{
                            if (!map[d.contact_id]) map[d.contact_id] = {};
                            if (!map[d.contact_id][d.day]) map[d.contact_id][d.day] = {};
                            map[d.contact_id][d.day][d.hour] = d.disponible;
                        }
                    }["ContactsPage.useEffect.fetchDisponibilites"]);
                    setAvailabilityMap(map);
                }
            }
            fetchDisponibilites();
        }
    }["ContactsPage.useEffect"], []);
    // Charger les contacts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactsPage.useEffect": ()=>{
            fetchContacts();
        }
    }["ContactsPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactsPage.useEffect": ()=>{
            // Fetch users (étudiants)
            async function fetchUsers() {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*');
                if (!error && data) setUsers(data);
            }
            fetchUsers();
        }
    }["ContactsPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactsPage.useEffect": ()=>{
            async function fetchRdvs() {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').select('*');
                if (!error && data) setRdvs(data);
            }
            fetchRdvs();
        }
    }["ContactsPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactsPage.useEffect": ()=>{
            async function fetchMotifs() {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('motifs').select('*');
                if (!error && data) setMotifs(data);
            }
            fetchMotifs();
        }
    }["ContactsPage.useEffect"], []);
    async function fetchContacts() {
        setLoading(true);
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('contacts').select('*').order('id', {
            ascending: false
        });
        if (error) setError("Erreur chargement : " + error.message);
        else setContacts(data || []);
        setLoading(false);
    }
    // Ajout ou modification
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        let photo_url = form.photo_url;
        if (file) {
            const ext = file.name.split('.').pop();
            const fileName = `contact_${Date.now()}.${ext}`;
            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('contacts').upload(fileName, file, {
                upsert: true
            });
            if (uploadError) {
                setError("Erreur upload photo : " + uploadError.message);
                setLoading(false);
                return;
            }
            const { data: publicUrlData } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('contacts').getPublicUrl(fileName);
            photo_url = publicUrlData.publicUrl;
        }
        if (editingId) {
            // Update
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('contacts').update({
                ...form,
                photo_url
            }).eq('id', editingId);
            if (error) setError("Erreur modification : " + error.message);
            else {
                setMessage("Contact modifié !");
                // Affiche la pop-up et recharge la page après 1 seconde
                setTimeout(()=>{
                    window.location.reload();
                }, 1000);
            }
        } else {
            // Insert
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('contacts').insert([
                {
                    ...form,
                    photo_url
                }
            ]);
            if (error) setError("Erreur ajout : " + error.message);
            else {
                setMessage("Contact ajouté !");
                setShowForm(false); // Ferme le formulaire après ajout
            }
        }
        setForm({
            name: '',
            company: '',
            email: '',
            phone: '',
            role: '',
            photo_url: ''
        });
        setFile(null);
        setEditingId(null);
        fetchContacts();
        setLoading(false);
    }
    function handleEdit(contact) {
        setForm(contact);
        setEditingId(contact.id);
        setMessage('');
        setError('');
        setFile(null);
        setShowForm(true);
    }
    async function handleDelete(id) {
        if (!window.confirm('Supprimer ce contact ?')) return;
        setLoading(true);
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('contacts').delete().eq('id', id);
        if (error) setError("Erreur suppression : " + error.message);
        else setMessage("Contact supprimé !");
        fetchContacts();
        setLoading(false);
    }
    function openAvailabilityModal(contact) {
        setSelectedContact(contact);
        setShowAvailabilityModal(true);
        // Charger la disponibilité sauvegardée pour ce contact
        setAvailability(availabilityMap[contact.id] || {});
    }
    function closeAvailabilityModal() {
        setShowAvailabilityModal(false);
        setSelectedContact(null);
        setAvailability({});
    }
    function toggleAvailability(day, hour) {
        setAvailability((prev)=>({
                ...prev,
                [day]: {
                    ...prev[day],
                    [hour]: !prev[day]?.[hour]
                }
            }));
    }
    async function handleSaveAvailability() {
        if (selectedContact) {
            // Pour chaque case cochée, insère ou met à jour la disponibilité en base
            const updates = [];
            for (const day of Object.keys(availability)){
                for (const hour of Object.keys(availability[day])){
                    const disponible = !!availability[day][hour];
                    updates.push({
                        contact_id: selectedContact.id,
                        day,
                        hour: parseInt(hour, 10),
                        disponible
                    });
                }
            }
            // Supprime les anciennes dispos pour ce contact
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('disponibilites').delete().eq('contact_id', selectedContact.id);
            // Insère les nouvelles dispos
            if (updates.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('disponibilites').insert(updates);
            }
            // Recharge la map depuis la base
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('disponibilites').select('*');
            if (!error && data) {
                const map = {};
                data.forEach((d)=>{
                    if (!map[d.contact_id]) map[d.contact_id] = {};
                    if (!map[d.contact_id][d.day]) map[d.contact_id][d.day] = {};
                    map[d.contact_id][d.day][d.hour] = d.disponible;
                });
                setAvailabilityMap(map);
            }
        }
        closeAvailabilityModal();
    }
    function openAvailabilityTextModal(contact) {
        setAvailabilityTextContact(contact);
        setShowAvailabilityTextModal(true);
    }
    function closeAvailabilityTextModal() {
        setShowAvailabilityTextModal(false);
        setAvailabilityTextContact(null);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-6",
                children: "Gestion des Contacts"
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 625,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center gap-8 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button px-4 py-2 rounded-md transition duration-200",
                        onClick: ()=>setShowRdvModal(true),
                        children: "Prendre un RDV"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button px-4 py-2 rounded-md transition duration-200",
                        onClick: ()=>{
                            setShowForm((f)=>!f);
                            if (showForm) {
                                setForm({
                                    name: '',
                                    company: '',
                                    email: '',
                                    phone: '',
                                    role: '',
                                    photo_url: ''
                                });
                                setEditingId(null);
                                setFile(null);
                            }
                        },
                        children: showForm ? 'Annuler' : 'Ajouter un contact'
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 634,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4"
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 648,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-white/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transition-all duration-300 border-2 border-blue-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "absolute top-3 right-3 text-2xl font-bold text-blue-400 hover:text-blue-700 transition",
                            type: "button",
                            onClick: ()=>{
                                setShowForm(false);
                                setEditingId(null);
                                setForm({
                                    name: '',
                                    company: '',
                                    email: '',
                                    phone: '',
                                    role: '',
                                    photo_url: ''
                                });
                                setFile(null);
                            },
                            "aria-label": "Fermer",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 654,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-blue-900 text-center mb-4",
                                    children: editingId ? 'Modifier le contact' : 'Ajouter un contact'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 663,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Nom",
                                    value: form.name,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                name: e.target.value
                                            })),
                                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 664,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Entreprise",
                                    value: form.company,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                company: e.target.value
                                            })),
                                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 665,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Rôle",
                                    value: form.role,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                role: e.target.value
                                            })),
                                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 666,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "Email",
                                    value: form.email,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                email: e.target.value
                                            })),
                                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 667,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Téléphone",
                                    value: form.phone,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                phone: e.target.value
                                            })),
                                    className: "rounded p-2 border w-full mb-2 placeholder-gray-400 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 668,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    accept: "image/png, image/jpeg",
                                    onChange: (e)=>setFile(e.target.files[0]),
                                    className: "text-sm text-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 669,
                                    columnNumber: 15
                                }, this),
                                form.photo_url && !file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: form.photo_url,
                                    alt: "Photo",
                                    className: "w-16 h-16 object-cover rounded-full mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 670,
                                    columnNumber: 43
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl mt-2 transition-all duration-200 shadow",
                                    children: editingId ? 'Enregistrer les modifications' : 'Ajouter le contact'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 671,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setShowForm(false);
                                        setEditingId(null);
                                        setForm({
                                            name: '',
                                            company: '',
                                            email: '',
                                            phone: '',
                                            role: '',
                                            photo_url: ''
                                        });
                                        setFile(null);
                                    },
                                    className: "font-bold py-2 rounded-xl text-blue-700 hover:bg-blue-50 transition",
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 672,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 662,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 653,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 652,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-gray-400",
                children: "Chargement..."
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 678,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",
                children: contacts.map((contact)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl p-6 bg-white border border-primary shadow-md flex flex-col items-center transition hover:shadow-xl",
                        children: [
                            contact.photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: contact.photo_url,
                                alt: contact.name,
                                className: "w-16 h-16 rounded-full object-cover mb-4 shadow-md"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 684,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md bg-gray-200 text-primary",
                                children: contact.name?.[0]
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 685,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-semibold mb-1 text-primary",
                                children: contact.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 687,
                                columnNumber: 13
                            }, this),
                            contact.role && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1 px-2 py-1 rounded-full text-xs font-semibold inline-block bg-gray-100 text-primary border border-primary",
                                children: contact.role
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 688,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-blue-400 text-sm mb-2",
                                children: contact.company
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 689,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500 text-sm mb-1",
                                children: contact.email
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500 text-sm mb-4",
                                children: contact.phone
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 691,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 mt-2 w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleEdit(contact),
                                        className: "flex-1 flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-xl shadow hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold",
                                        children: "Modifier"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/contacts/page.js",
                                        lineNumber: 693,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDelete(contact.id),
                                        className: "flex-1 flex items-center gap-2 bg-white border-2 border-red-400 text-red-500 px-4 py-2 rounded-xl shadow hover:bg-red-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold",
                                        children: "Supprimer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/contacts/page.js",
                                        lineNumber: 696,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 692,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mt-3 w-full flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-xl shadow hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold",
                                onClick: ()=>openAvailabilityModal(contact),
                                children: "Ajouter les horaires de disponibilité"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mt-2 w-full flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-xl shadow hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold",
                                onClick: ()=>openAvailabilityTextModal(contact),
                                children: "Voir les disponibilités (lettres)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 706,
                                columnNumber: 13
                            }, this)
                        ]
                    }, contact.id, true, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 682,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 680,
                columnNumber: 7
            }, this),
            showAvailabilityModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-white/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 transition-all duration-300 border-2 border-blue-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-blue-900 text-center mb-4 rounded-lg px-4 py-2 shadow",
                            children: [
                                "Disponibilités de ",
                                selectedContact?.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 720,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full border border-[#2563eb] rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 border-b border-[#2563eb]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 725,
                                                    columnNumber: 21
                                                }, this),
                                                HOURS.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-2 border-b border-[#2563eb] text-center",
                                                        children: [
                                                            h,
                                                            "h"
                                                        ]
                                                    }, h, true, {
                                                        fileName: "[project]/src/app/contacts/page.js",
                                                        lineNumber: 727,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 724,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/contacts/page.js",
                                        lineNumber: 723,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: DAYS.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 font-semibold border-b border-[#2563eb]",
                                                        children: day
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/contacts/page.js",
                                                        lineNumber: 734,
                                                        columnNumber: 23
                                                    }, this),
                                                    HOURS.map((hour)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-2 border-b border-[#2563eb] text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: !!availability[day]?.[hour],
                                                                onChange: ()=>toggleAvailability(day, hour),
                                                                className: "accent-[#22c55e] w-5 h-5 rounded focus:ring-2 focus:ring-[#22c55e]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/contacts/page.js",
                                                                lineNumber: 737,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, hour, false, {
                                                            fileName: "[project]/src/app/contacts/page.js",
                                                            lineNumber: 736,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, day, true, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 733,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/contacts/page.js",
                                        lineNumber: 731,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 722,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 721,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeAvailabilityModal,
                                    className: "font-bold py-2 px-4 rounded-xl text-blue-700 hover:bg-blue-50 transition",
                                    children: "Fermer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 751,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveAvailability,
                                    className: "font-bold py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition",
                                    children: "Enregistrer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 752,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 750,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 719,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 718,
                columnNumber: 9
            }, this),
            showAvailabilityTextModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-white/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white text-blue-900 p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transition-all duration-300 border-2 border-blue-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-blue-900 text-center mb-4",
                            children: [
                                "Disponibilités de ",
                                availabilityTextContact?.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 762,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarAvailability, {
                            contact: availabilityTextContact,
                            availabilityMap: availabilityMap,
                            rdvs: rdvs
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 763,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeAvailabilityTextModal,
                                className: "font-bold py-2 px-4 rounded-xl text-blue-700 hover:bg-blue-50 transition",
                                children: "Fermer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 769,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 768,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 761,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 760,
                columnNumber: 9
            }, this),
            showRdvModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-white/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-4 transition-all duration-300 border-2 border-blue-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "absolute top-3 right-3 text-2xl font-bold text-blue-400 hover:text-blue-700 transition",
                            type: "button",
                            onClick: ()=>setShowRdvModal(false),
                            "aria-label": "Fermer",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 779,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-blue-900 text-center mb-4",
                            children: "Prendre un rendez-vous"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 787,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-semibold mb-1",
                                    children: "Avec qui ?"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 789,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: "w-full p-2 rounded border mb-2 placeholder-blue-300",
                                    placeholder: "Rechercher un contact...",
                                    value: rdvSearchContact,
                                    onChange: (e)=>setRdvSearchContact(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 790,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-32 overflow-y-auto border rounded shadow",
                                    children: contacts.filter((c)=>c.name.toLowerCase().includes(rdvSearchContact.toLowerCase())).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `px-3 py-2 cursor-pointer ${rdvContact?.id === c.id ? 'font-bold' : ''}`,
                                            onClick: ()=>{
                                                setRdvContact(c);
                                                setRdvSearchContact(c.name);
                                            },
                                            children: [
                                                c.name,
                                                " (",
                                                c.company,
                                                ")"
                                            ]
                                        }, c.id, true, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 799,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 797,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 788,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-semibold mb-1",
                                    children: "Nom de l'étudiant"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 810,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: "w-full p-2 rounded border mb-2 placeholder-blue-300",
                                    placeholder: "Rechercher un utilisateur...",
                                    value: rdvSearchUser,
                                    onChange: (e)=>setRdvSearchUser(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 811,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-32 overflow-y-auto border rounded shadow",
                                    children: users.filter((u)=>u.name?.toLowerCase().includes(rdvSearchUser.toLowerCase())).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `px-3 py-2 cursor-pointer ${rdvUser?.id === u.id ? 'font-bold' : ''}`,
                                            onClick: ()=>{
                                                setRdvUser(u);
                                                setRdvSearchUser(u.name);
                                            },
                                            children: [
                                                u.name,
                                                " (",
                                                u.email,
                                                ")"
                                            ]
                                        }, u.id, true, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 820,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 818,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 809,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-semibold mb-1",
                                            children: "Jour"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 832,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            className: "w-full p-2 rounded border mb-2 placeholder-blue-300",
                                            value: rdvDate,
                                            onChange: (e)=>setRdvDate(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 833,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 831,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-semibold mb-1",
                                            children: "Heure"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 841,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full p-2 rounded border mb-2",
                                            value: rdvHour,
                                            onChange: (e)=>setRdvHour(e.target.value),
                                            disabled: !rdvContact || !rdvDate,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Choisir..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 848,
                                                    columnNumber: 19
                                                }, this),
                                                (()=>{
                                                    if (!rdvContact || !rdvDate) return null;
                                                    // Récupérer les dispos du contact pour ce jour
                                                    const dateObj = new Date(rdvDate);
                                                    const dayName = DAYS[dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1];
                                                    const dispo = availabilityMap[rdvContact.id]?.[dayName] || {};
                                                    // Récupérer les heures déjà prises
                                                    const takenHours = rdvs.filter((r)=>r.contactId === rdvContact.id && r.date === rdvDate).map((r)=>String(r.hour));
                                                    return Object.keys(dispo).filter((h)=>dispo[h]).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: h,
                                                            disabled: takenHours.includes(h),
                                                            style: takenHours.includes(h) ? {
                                                                color: '#f87171',
                                                                background: '#7f1d1d'
                                                            } : {},
                                                            children: [
                                                                h,
                                                                "h",
                                                                takenHours.includes(h) ? ' (pris)' : ''
                                                            ]
                                                        }, h, true, {
                                                            fileName: "[project]/src/app/contacts/page.js",
                                                            lineNumber: 862,
                                                            columnNumber: 25
                                                        }, this));
                                                })()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 842,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 840,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 830,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-semibold mb-1",
                                    children: "Motif du RDV"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 876,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "w-full p-2 rounded border mb-2",
                                    value: selectedMotifId1,
                                    onChange: (e)=>setSelectedMotifId(e.target.value),
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Sélectionner un motif"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 883,
                                            columnNumber: 17
                                        }, this),
                                        motifs1.map((motif)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: motif.id,
                                                children: motif.label
                                            }, motif.id, false, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 885,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 877,
                                    columnNumber: 15
                                }, this),
                                motifs1.find((m)=>m.id == selectedMotifId1)?.label === 'Autre' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: "w-full p-2 rounded border mb-2",
                                    placeholder: "Précisez le motif",
                                    value: customMotif1,
                                    onChange: (e)=>setCustomMotif(e.target.value),
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 889,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 875,
                            columnNumber: 13
                        }, this),
                        rdvError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-300 mb-2",
                            children: rdvError
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 899,
                            columnNumber: 26
                        }, this),
                        rdvConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-green-300 font-bold mb-2",
                            children: "RDV enregistré (démo) !"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 900,
                            columnNumber: 30
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowRdvModal(false),
                                    className: "font-bold py-2 px-4 rounded-lg",
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 902,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        setRdvError('');
                                        if (!rdvContact || !rdvUser || !rdvDate || !rdvHour) {
                                            setRdvError('Veuillez remplir tous les champs.');
                                            return;
                                        }
                                        // Vérifier si le créneau est déjà pris
                                        const { data: existing, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').select('*').eq('contactId', rdvContact.id).eq('date', rdvDate).eq('hour', rdvHour);
                                        if (existing && existing.length > 0) {
                                            setRdvError('Ce créneau est déjà réservé !');
                                            return;
                                        }
                                        // Insérer le RDV
                                        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').insert([
                                            {
                                                contactId: rdvContact.id,
                                                contactName: rdvContact.name,
                                                userName: rdvUser.name,
                                                userEmail: rdvUser.email,
                                                date: rdvDate,
                                                hour: rdvHour,
                                                motif_id: selectedMotifId1,
                                                motif_custom: motifs1.find((m)=>m.id == selectedMotifId1)?.label === 'Autre' ? customMotif1 : null
                                            }
                                        ]);
                                        if (error) {
                                            setRdvError('Erreur lors de la prise de RDV : ' + error.message);
                                            return;
                                        }
                                        setRdvConfirmed(true);
                                        // Rafraîchir la liste des RDV
                                        const { data: newRdvs } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('rdvs2').select('*');
                                        setRdvs(newRdvs || []);
                                        setTimeout(()=>{
                                            setShowRdvModal(false);
                                            setRdvConfirmed(false);
                                            setRdvContact(null);
                                            setRdvUser(null);
                                            setRdvDate('');
                                            setRdvHour('');
                                            setRdvSearchContact('');
                                            setRdvSearchUser('');
                                            setRdvError('');
                                        }, 1200);
                                    },
                                    className: "font-bold py-2 px-4 rounded-lg",
                                    children: "Confirmer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 903,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 901,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 778,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 777,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4",
                        children: "RDV pris"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 953,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Filtrer par contact...",
                                className: "p-2 rounded border mb-2 placeholder-blue-300",
                                value: filterContact,
                                onChange: (e)=>setFilterContact(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 955,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Filtrer par étudiant...",
                                className: "p-2 rounded border mb-2 placeholder-blue-300",
                                value: filterUser,
                                onChange: (e)=>setFilterUser(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 962,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 954,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto rounded-xl shadow-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left border border-primary bg-white rounded-xl overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gray-100 text-primary",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 border-b border-primary",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 974,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 border-b border-primary",
                                                children: "Étudiant"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 975,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 border-b border-primary",
                                                children: "Date"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 976,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 border-b border-primary",
                                                children: "Heure"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 977,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 border-b border-primary",
                                                children: "Motif"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/contacts/page.js",
                                                lineNumber: 978,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/contacts/page.js",
                                        lineNumber: 973,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 972,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: rdvs.filter((r)=>r.contactName?.toLowerCase().includes(filterContact.toLowerCase())).filter((r)=>r.userName?.toLowerCase().includes(filterUser.toLowerCase())).map((r, idx)=>{
                                        const motif = motifs1.find((m)=>m.id === r.motif_id);
                                        const motifLabel = motif?.label === 'Autre' && r.motif_custom ? r.motif_custom : motif?.label;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: `${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-primary text-gray-700`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: r.contactName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 990,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: r.userName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 991,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: r.date
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 992,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: [
                                                        r.hour,
                                                        "h"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 993,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: motifLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/contacts/page.js",
                                                    lineNumber: 994,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/src/app/contacts/page.js",
                                            lineNumber: 989,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/contacts/page.js",
                                    lineNumber: 981,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 971,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 970,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 952,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-8 py-6 rounded-xl shadow-lg text-center animate-fadeIn",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl mb-2",
                            children: "✔"
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 1007,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-lg font-bold",
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 1008,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/contacts/page.js",
                    lineNumber: 1006,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 1005,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/contacts/page.js",
        lineNumber: 624,
        columnNumber: 5
    }, this);
}
_s2(ContactsPage, "tNBDHY+iofzwHokmMfV5J87LGAo=");
_c3 = ContactsPage;
function CalendarAvailability({ contact, availabilityMap, rdvs }) {
    _s3();
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [takenHour, setTakenHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rdvTakenMsg, setRdvTakenMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    if (!contact) return null;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const nbDays = new Date(year, month + 1, 0).getDate();
    for(let i = 1; i <= nbDays; i++){
        days.push(new Date(year, month, i));
    }
    // Récupère les dispos du contact
    const dispo = availabilityMap[contact.id] || {};
    // Helper pour savoir si un jour a des dispos
    function hasDispo(date) {
        const dayName = DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];
        const hours = dispo[dayName] || {};
        return Object.values(hours).some(Boolean);
    }
    // Heures du jour sélectionné
    let selectedDayName = selectedDate ? DAYS[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1] : null;
    let selectedHours = selectedDate && dispo[selectedDayName] ? Object.entries(dispo[selectedDayName]).filter(([h, v])=>v).map(([h])=>h) : [];
    // Récupérer les heures déjà prises depuis la vraie liste des RDV
    let takenHours = [];
    if (selectedDate && rdvs && contact) {
        takenHours = rdvs.filter((r)=>r.contactId === contact.id && r.date === selectedDate.toISOString().split('T')[0]).map((r)=>String(r.hour));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentMonth(new Date(year, month - 1, 1)),
                        className: "px-2 py-1 rounded bg-blue-800 hover:bg-blue-700",
                        children: "◀"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1051,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: currentMonth.toLocaleString('fr-FR', {
                            month: 'long',
                            year: 'numeric'
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1052,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentMonth(new Date(year, month + 1, 1)),
                        className: "px-2 py-1 rounded bg-blue-800 hover:bg-blue-700",
                        children: "▶"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1053,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 1050,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-2 mb-2 text-center text-blue-200 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Lun"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Mar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 23
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Mer"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 37
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Jeu"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 51
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Ven"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 65
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Sam"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 79
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Dim"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1056,
                        columnNumber: 93
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 1055,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-2 mb-4",
                children: [
                    Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, i, false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 1060,
                            columnNumber: 11
                        }, this)),
                    days.map((date)=>{
                        const isDispo = hasDispo(date);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            disabled: !isDispo,
                            className: `rounded-lg py-2 text-sm font-semibold transition w-full
                ${isDispo ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-950 text-blue-400 opacity-50 cursor-not-allowed'}
                ${selectedDate && date.toDateString() === selectedDate.toDateString() ? 'ring-2 ring-yellow-400 bg-yellow-700 text-white' : ''}`,
                            onClick: ()=>{
                                setSelectedDate(date);
                                setTakenHour(null);
                                setRdvTakenMsg('');
                            },
                            children: date.getDate()
                        }, date.toISOString(), false, {
                            fileName: "[project]/src/app/contacts/page.js",
                            lineNumber: 1065,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 1058,
                columnNumber: 7
            }, this),
            selectedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center font-semibold mb-2",
                        children: [
                            "Heures disponibles pour le ",
                            selectedDate.toLocaleDateString('fr-FR')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1080,
                        columnNumber: 11
                    }, this),
                    selectedHours.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 justify-center",
                        children: selectedHours.filter((h)=>!takenHours.includes(h)).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-green-600 text-white px-3 py-2 rounded-lg font-bold text-sm",
                                children: [
                                    h,
                                    "h"
                                ]
                            }, h, true, {
                                fileName: "[project]/src/app/contacts/page.js",
                                lineNumber: 1084,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1082,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-blue-300",
                        children: "Aucune disponibilité ce jour"
                    }, void 0, false, {
                        fileName: "[project]/src/app/contacts/page.js",
                        lineNumber: 1088,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/contacts/page.js",
                lineNumber: 1079,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/contacts/page.js",
        lineNumber: 1049,
        columnNumber: 5
    }, this);
}
_s3(CalendarAvailability, "PmJ5Pgz9Xp67c71VtaIZmvQmf6w=");
_c4 = CalendarAvailability;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CalendarModal");
__turbopack_context__.k.register(_c1, "ContactModal");
__turbopack_context__.k.register(_c2, "ConfirmModal");
__turbopack_context__.k.register(_c3, "ContactsPage");
__turbopack_context__.k.register(_c4, "CalendarAvailability");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_e6338f81._.js.map