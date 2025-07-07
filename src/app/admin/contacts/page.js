'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const initialContacts = [
  { id: 1, name: 'Alice Martin', company: 'Capgemini', email: 'alice.martin@capgemini.com', phone: '06 12 34 56 78' },
  { id: 2, name: 'Jean Dupont', company: 'Google', email: 'jean.dupont@google.com', phone: '07 98 76 54 32' },
  { id: 3, name: 'Sophie Bernard', company: 'Microsoft', email: 'sophie.bernard@microsoft.com', phone: '06 22 33 44 55' },
  { id: 4, name: 'Karim Benali', company: 'Amazon', email: 'karim.benali@amazon.com', phone: '06 44 55 66 77' },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getMonthDays(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [rdvPrisPopup, setRdvPrisPopup] = useState(false);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const morningHours = [9, 10, 11, 12, 13];
  const afternoonHours = [14, 15, 16, 17, 18];

  // Liste des horaires déjà pris pour ce contact et cette date
  const takenHours = selectedDate
    ? rdvs
        .filter(
          rdv =>
            rdv.contactId === contact.id &&
            rdv.date === selectedDate.toISOString().split('T')[0]
        )
        .map(rdv => rdv.hour)
    : [];

  const handleValidate = async () => {
    if (!selectedDate || !selectedHour) return;

    // Vérification côté client (optionnel mais rapide)
    const isAlreadyTaken = rdvs.some(
      r =>
        r.contactId === contact.id &&
        r.date === selectedDate.toISOString().split('T')[0] &&
        r.hour === selectedHour
    );
    if (isAlreadyTaken) {
      setRdvPrisPopup(true);
      return;
    }

    // Vérification côté base (pour éviter les collisions si plusieurs utilisateurs cliquent en même temps)
    const { data: existing, error: checkError } = await supabase
      .from('rdvs2')
      .select('*')
      .eq('contactId', contact.id)
      .eq('date', selectedDate.toISOString().split('T')[0])
      .eq('hour', selectedHour);

    if (existing && existing.length > 0) {
      alert('Ce créneau est déjà réservé !');
      return;
    }

    // Récupère l'utilisateur courant
    const user = typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    const userEmail = user?.email || '';

    // Prépare le RDV à insérer
    const { data, error } = await supabase.from('rdvs2').insert([{
      contactId: contact.id,
      contactName: contact.name,
      date: selectedDate.toISOString().split('T')[0],
      hour: selectedHour,
      userName: userName,
      userEmail: userEmail,
      motif_id: selectedMotifId,
      motif_custom: motifs.find(m => m.id == selectedMotifId)?.label === 'Autre' ? customMotif : null
    }]);
    if (error) {
      alert('Erreur lors de la prise de RDV : ' + error.message);
      return;
    }

    if (Array.isArray(data) && data.length > 0) {
      setRdvs(prev => [...prev, ...data]);
    }

    // Recharge la liste
    const { data: newRdvs } = await supabase.from('rdvs2').select('*');
    setRdvs(newRdvs || []);

    // Affiche le message de confirmation
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 2000);
  };

  const handleDeleteRdv = async (id) => {
    await supabase.from('rdvs2').delete().eq('id', id);
    // Recharge la liste des RDV
    const { data, error } = await supabase.from('rdvs2').select('*');
    if (!error && Array.isArray(data)) setRdvs(data);
  };

  const handleDateContextMenu = (date, e) => {
    e.preventDefault();
    const key = `${contact.id}_${date.toISOString().split('T')[0]}`;
    setIndispos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute -top-5 right-4 bg-blue-600 hover:bg-blue-700 text-white hover:text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all border-4 border-white"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Prendre un RDV avec {contact.name}</h2>
        {confirmed && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-700 text-white px-8 py-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-2">✔</div>
              <div className="text-lg font-bold">RDV confirmé !</div>
              <div className="text-sm mt-2">Votre rendez-vous a bien été enregistré.</div>
            </div>
          </div>
        )}
        {rdvPrisPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-red-700 text-white px-8 py-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl mb-2">⛔</div>
              <div className="text-lg font-bold">Ce créneau est déjà pris !</div>
              <button
                className="mt-4 px-4 py-2 bg-white text-red-700 rounded font-bold"
                onClick={() => setRdvPrisPopup(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => { setCurrentMonth(new Date(year, month - 1, 1)); setSelectedDate(null); setSelectedHour(null); }} className="text-red-400 px-2 py-1 rounded hover:bg-gray-800">◀</button>
          <span className="font-semibold">{currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => { setCurrentMonth(new Date(year, month + 1, 1)); setSelectedDate(null); setSelectedHour(null); }} className="text-red-400 px-2 py-1 rounded hover:bg-gray-800">▶</button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-gray-400 text-xs">
          <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div className="text-red-400">Sam</div><div className="text-red-400">Dim</div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).map((_, i) => (
            <div key={i}></div>
          ))}
          {days.map(date => {
            const available = isAvailable(date);
            const key = `${contact.id}_${date.toISOString().split('T')[0]}`;
            const isIndispo = indispos[key];
            const isDispo = dispos[key];
            let btnClass = '';
            if (isIndispo) {
              btnClass = 'bg-red-700 text-white cursor-not-allowed';
            } else if (!available && (date.getDay() === 6 || date.getDay() === 0)) {
              btnClass = 'bg-red-900 text-red-300 cursor-not-allowed';
            } else if (available && isDispo) {
              btnClass = 'bg-green-500 text-white hover:bg-green-600';
            } else if (available) {
              btnClass = 'bg-red-600 text-white hover:bg-red-700';
            } else {
              btnClass = 'bg-gray-700 text-gray-400 cursor-not-allowed';
            }
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={date.toISOString()}
                disabled={!available || isIndispo}
                className={`rounded-lg py-2 text-sm font-semibold transition w-full ${btnClass} ${isSelected ? 'ring-2 ring-yellow-400 bg-yellow-700 text-white' : ''}`}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedHour(null);
                }}
                onContextMenu={e => handleDateContextMenu(date, e)}
                title={isIndispo ? 'Indisponible' : 'Clic droit pour marquer comme indisponible'}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        {selectedDate && selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6 && (
          <div className="mt-4">
            <div className="text-center font-semibold mb-2">Choisissez un horaire pour le {selectedDate.toLocaleDateString('fr-FR')}</div>
            <div className="mb-2 text-sm text-gray-400">Matin</div>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {morningHours
                .filter(h => !takenHours.includes(h))
                .map(h => (
                  <button
                    key={h}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition shadow
                      ${selectedHour === h
                        ? 'bg-yellow-400 text-black ring-2 ring-yellow-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    onClick={() => setSelectedHour(h)}
                  >
                    {h}h00
                  </button>
                ))}
            </div>
            <div className="mb-2 text-sm text-gray-400">Après-midi</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {afternoonHours
                .filter(h => !takenHours.includes(h))
                .map(h => (
                  <button
                    key={h}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition shadow
                      ${selectedHour === h
                        ? 'bg-yellow-400 text-black ring-2 ring-yellow-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    onClick={() => setSelectedHour(h)}
                  >
                    {h}h00
                  </button>
                ))}
            </div>
            {selectedHour && (
              <button
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition"
                onClick={handleValidate}
              >
                Confirmer
              </button>
            )}
          </div>
        )}
        {selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) && (
          <div className="mt-4 text-center text-red-400 font-semibold text-lg">On ne travaille pas, c'est le weekend !</div>
        )}
      </div>
    </div>
  );
}

function ContactModal({ open, onClose, onSave, initial, loading }) {
  const [form, setForm] = useState(
    initial || { name: "", company: "", email: "", phone: "", photo_url: "", role: "" }
  );
  const [file, setFile] = useState(null);
  useEffect(() => {
    setForm(initial || { name: "", company: "", email: "", phone: "", photo_url: "", role: "" });
    setFile(null);
  }, [initial, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <form
        className="bg-[#1e293b] text-white rounded-2xl p-8 shadow-xl w-full max-w-md relative border border-[#334155]"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSave(form, file);
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-5 right-4 bg-blue-600 hover:bg-blue-700 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-4 border-white"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {initial ? "Modifier le contact" : "Ajouter un contact"}
        </h2>
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded p-2 bg-[#334155] border border-[#475569] w-full mb-2 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-[#1e293b] transition"
          required
        />
        <input
          type="text"
          placeholder="Entreprise"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="rounded p-2 bg-[#334155] border border-[#475569] w-full mb-2 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-[#1e293b] transition"
          required
        />
        <input
          type="text"
          placeholder="Rôle (ex: RH, Manager, Candidat...)"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="rounded p-2 bg-[#334155] border border-[#475569] w-full mb-2 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-[#1e293b] transition"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded p-2 bg-[#334155] border border-[#475569] w-full mb-2 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-[#1e293b] transition"
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded p-2 bg-[#334155] border border-[#475569] w-full mb-2 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-[#1e293b] transition"
          required
        />
        <div className="mb-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={e => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="text-xs text-gray-400 mt-1">Photo (jpg/png, max 2Mo)</div>
          {form.photo_url && !file && (
            <img src={form.photo_url} alt="Photo" className="mt-2 w-20 h-20 object-cover rounded-full mx-auto" />
          )}
          {file && (
            <div className="mt-2 text-xs text-blue-400">{file.name}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition mb-2"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : initial ? "Enregistrer" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

function ConfirmModal({ open, onClose, onConfirm, text, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className=" text-gray-900 rounded-2xl p-8 shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute -top-5 right-4 bg-blue-600 hover:bg-blue-700 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-4 border-white"
        >
          ×
        </button>
        <div className="text-lg mb-6">{text}</div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', role: '', photo_url: '' });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [availabilityMap, setAvailabilityMap] = useState({}); // { contactId: { day: { hour: true/false } } }
  const [availability, setAvailability] = useState({}); // { day: { hour: true/false } }
  const [showAvailabilityTextModal, setShowAvailabilityTextModal] = useState(false);
  const [availabilityTextContact, setAvailabilityTextContact] = useState(null);
  const [showRdvModal, setShowRdvModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [rdvContact, setRdvContact] = useState(null);
  const [rdvUser, setRdvUser] = useState(null);
  const [rdvDate, setRdvDate] = useState('');
  const [rdvHour, setRdvHour] = useState('');
  const [rdvSearchContact, setRdvSearchContact] = useState('');
  const [rdvSearchUser, setRdvSearchUser] = useState('');
  const [rdvError, setRdvError] = useState('');
  const [rdvConfirmed, setRdvConfirmed] = useState(false);
  const hoursList = [9,10,11,12,13,14,15,16,17,18];
  const [rdvs, setRdvs] = useState([]);
  const [filterContact, setFilterContact] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [motifs, setMotifs] = useState([]);
  const [selectedMotifId, setSelectedMotifId] = useState('');
  const [customMotif, setCustomMotif] = useState('');

  // Charger les disponibilités depuis la base au démarrage
  useEffect(() => {
    async function fetchDisponibilites() {
      const { data, error } = await supabase.from('disponibilites').select('*');
      if (!error && data) {
        // Transforme les données en availabilityMap { contactId: { day: { hour: true } } }
        const map = {};
        data.forEach(d => {
          if (!map[d.contact_id]) map[d.contact_id] = {};
          if (!map[d.contact_id][d.day]) map[d.contact_id][d.day] = {};
          map[d.contact_id][d.day][d.hour] = d.disponible;
        });
        setAvailabilityMap(map);
      }
    }
    fetchDisponibilites();
  }, []);

  // Charger les contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    // Fetch users (étudiants)
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*');
      if (!error && data) setUsers(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchRdvs() {
      const { data, error } = await supabase.from('rdvs2').select('*');
      if (!error && data) setRdvs(data);
    }
    fetchRdvs();
  }, []);

  useEffect(() => {
    async function fetchMotifs() {
      const { data, error } = await supabase.from('motifs').select('*');
      if (!error && data) setMotifs(data);
    }
    fetchMotifs();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    const { data, error } = await supabase.from('contacts').select('*').order('id', { ascending: false });
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
      const { error: uploadError } = await supabase.storage.from('contacts').upload(fileName, file, { upsert: true });
      if (uploadError) {
        setError("Erreur upload photo : " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('contacts').getPublicUrl(fileName);
      photo_url = publicUrlData.publicUrl;
    }

    if (editingId) {
      // Update
      const { error } = await supabase.from('contacts').update({ ...form, photo_url }).eq('id', editingId);
      if (error) setError("Erreur modification : " + error.message);
      else {
        setMessage("Contact modifié !");
        // Affiche la pop-up et recharge la page après 1 seconde
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      // Insert
      const { error } = await supabase.from('contacts').insert([{ ...form, photo_url }]);
      if (error) setError("Erreur ajout : " + error.message);
      else {
        setMessage("Contact ajouté !");
        setShowForm(false); // Ferme le formulaire après ajout
      }
    }
    setForm({ name: '', company: '', email: '', phone: '', role: '', photo_url: '' });
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
    const { error } = await supabase.from('contacts').delete().eq('id', id);
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
    setAvailability(prev => ({
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
      for (const day of Object.keys(availability)) {
        for (const hour of Object.keys(availability[day])) {
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
      await supabase.from('disponibilites').delete().eq('contact_id', selectedContact.id);
      // Insère les nouvelles dispos
      if (updates.length > 0) {
        await supabase.from('disponibilites').insert(updates);
      }
      // Recharge la map depuis la base
      const { data, error } = await supabase.from('disponibilites').select('*');
      if (!error && data) {
        const map = {};
        data.forEach(d => {
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

  return (
    <div className="min-h-screen  p-10 text-primary">
      <h1 className="text-2xl font-bold mb-6">Gestion des Contacts</h1>
      {/* Boutons centrés sur la même ligne */}
      <div className="flex justify-center items-center gap-8 mb-8">
        <button
          className="button px-4 py-2 rounded-md transition duration-200"
          onClick={() => setShowRdvModal(true)}
        >
          Prendre un RDV
        </button>
        <button
          className="button px-4 py-2 rounded-md transition duration-200"
          onClick={() => {
            setShowForm(f => !f);
            if (showForm) {
              setForm({ name: '', company: '', email: '', phone: '', role: '', photo_url: '' });
              setEditingId(null);
              setFile(null);
            }
          }}
        >
          {showForm ? 'Annuler' : 'Ajouter un contact'}
        </button>
      </div>
      <div className="h-4" />

      {/* Modal pour le formulaire d'ajout/modif */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transition-all duration-300 border-2 border-blue-100">
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-blue-400 hover:text-blue-700 transition"
              type="button"
              onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: '', company: '', email: '', phone: '', role: '', photo_url: '' }); setFile(null); }}
              aria-label="Fermer"
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-blue-900 text-center mb-4">{editingId ? 'Modifier le contact' : 'Ajouter un contact'}</h2>
              <input type="text" placeholder="Nom" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="rounded p-2 border w-full mb-2 placeholder-gray-400 transition text-primary bg-white" required />
              <input type="text" placeholder="Entreprise" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="rounded p-2 border w-full mb-2 placeholder-gray-400 transition text-primary bg-white" />
              <input type="text" placeholder="Rôle" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="rounded p-2 border w-full mb-2 placeholder-gray-400 transition text-primary bg-white" />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="rounded p-2 border w-full mb-2 placeholder-gray-400 transition text-primary bg-white" />
              <input type="text" placeholder="Téléphone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="rounded p-2 border w-full mb-2 placeholder-gray-400 transition text-primary bg-white" />
              <input type="file" accept="image/png, image/jpeg" onChange={e => setFile(e.target.files[0])} className="text-sm text-gray-300" />
              {form.photo_url && !file && <img src={form.photo_url} alt="Photo" className="w-16 h-16 object-cover rounded-full mx-auto" />}
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl mt-2 transition-all duration-200 shadow">{editingId ? 'Enregistrer les modifications' : 'Ajouter le contact'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: '', company: '', email: '', phone: '', role: '', photo_url: '' }); setFile(null); }} className="font-bold py-2 rounded-xl text-blue-700 hover:bg-blue-50 transition">Annuler</button>
            </form>
          </div>
        </div>
      )}

      {loading && <div className="text-center text-gray-400">Chargement...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {contacts.map(contact => (
          <div key={contact.id} className="rounded-2xl p-6 bg-white border border-primary shadow-md flex flex-col items-center transition hover:shadow-xl">
            {contact.photo_url
              ? <img src={contact.photo_url} alt={contact.name} className="w-16 h-16 rounded-full object-cover mb-4 shadow-md" />
              : <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md bg-gray-200 text-primary">{contact.name?.[0]}</div>
            }
            <div className="text-lg font-semibold mb-1 text-primary">{contact.name}</div>
            {contact.role && <div className="mb-1 px-2 py-1 rounded-full text-xs font-semibold inline-block bg-gray-100 text-primary border border-primary">{contact.role}</div>}
            <div className="text-blue-400 text-sm mb-2">{contact.company}</div>
            <div className="text-gray-500 text-sm mb-1">{contact.email}</div>
            <div className="text-gray-500 text-sm mb-4">{contact.phone}</div>
            <div className="flex gap-2 mt-2 w-full">
              <button onClick={() => handleEdit(contact)} className="flex-1 flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-xl shadow hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold">
                Modifier
              </button>
              <button onClick={() => handleDelete(contact.id)} className="flex-1 flex items-center gap-2 bg-white border-2 border-red-400 text-red-500 px-4 py-2 rounded-xl shadow hover:bg-red-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold">
                Supprimer
              </button>
            </div>
            <button
              className="mt-3 w-full flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-xl shadow hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold"
              onClick={() => openAvailabilityModal(contact)}
            >
              Ajouter les horaires de disponibilité
            </button>
            <button
              className="mt-2 w-full flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-xl shadow hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200 font-semibold"
              onClick={() => openAvailabilityTextModal(contact)}
            >
              Voir les disponibilités (lettres)
            </button>
          </div>
        ))}
      </div>

      {/* Modal disponibilité */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 transition-all duration-300 border-2 border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 text-center mb-4 rounded-lg px-4 py-2 shadow">Disponibilités de {selectedContact?.name}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-primary rounded-lg bg-white">
                <thead>
                  <tr>
                    <th className="p-2 border-b border-primary"></th>
                    {HOURS.map(h => (
                      <th key={h} className="p-2 border-b border-primary text-center">{h}h</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map(day => (
                    <tr key={day}>
                      <td className="p-2 font-semibold border-b border-primary">{day}</td>
                      {HOURS.map(hour => (
                        <td key={hour} className="p-2 border-b border-primary text-center">
                          <input
                            type="checkbox"
                            checked={!!availability[day]?.[hour]}
                            onChange={() => toggleAvailability(day, hour)}
                            className="accent-[#22c55e] w-5 h-5 rounded focus:ring-2 focus:ring-[#22c55e]"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeAvailabilityModal} className="font-bold py-2 px-4 rounded-xl text-blue-700 hover:bg-blue-50 transition">Fermer</button>
              <button onClick={handleSaveAvailability} className="font-bold py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal disponibilité texte */}
      {showAvailabilityTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="relative bg-white text-blue-900 p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transition-all duration-300 border-2 border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 text-center mb-4">Disponibilités de {availabilityTextContact?.name}</h2>
            <CalendarAvailability
              contact={availabilityTextContact}
              availabilityMap={availabilityMap}
              rdvs={rdvs}
            />
            <div className="flex justify-end mt-6">
              <button onClick={closeAvailabilityTextModal} className="font-bold py-2 px-4 rounded-xl text-blue-700 hover:bg-blue-50 transition">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Prendre un RDV */}
      {showRdvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-4 transition-all duration-300 border-2 border-blue-100">
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-blue-400 hover:text-blue-700 transition"
              type="button"
              onClick={() => setShowRdvModal(false)}
              aria-label="Fermer"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-blue-900 text-center mb-4">Prendre un rendez-vous</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Avec qui ?</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-blue-700 bg-blue-950 text-white mb-2 placeholder-blue-300"
                placeholder="Rechercher un contact..."
                value={rdvSearchContact}
                onChange={e => setRdvSearchContact(e.target.value)}
              />
              <div className="max-h-32 overflow-y-auto bg-blue-950 border border-blue-700 rounded shadow text-white">
                {contacts.filter(c => c.name.toLowerCase().includes(rdvSearchContact.toLowerCase())).map(c => (
                  <div
                    key={c.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-800 ${rdvContact?.id === c.id ? 'bg-blue-700 font-bold' : ''}`}
                    onClick={() => { setRdvContact(c); setRdvSearchContact(c.name); }}
                  >
                    {c.name} ({c.company})
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Nom de l'étudiant</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-blue-700 bg-blue-950 text-white mb-2 placeholder-blue-300"
                placeholder="Rechercher un utilisateur..."
                value={rdvSearchUser}
                onChange={e => setRdvSearchUser(e.target.value)}
              />
              <div className="max-h-32 overflow-y-auto bg-blue-950 border border-blue-700 rounded shadow text-white">
                {users.filter(u => u.name?.toLowerCase().includes(rdvSearchUser.toLowerCase())).map(u => (
                  <div
                    key={u.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-green-800 ${rdvUser?.id === u.id ? 'bg-green-700 font-bold' : ''}`}
                    onClick={() => { setRdvUser(u); setRdvSearchUser(u.name); }}
                  >
                    {u.name} ({u.email})
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Jour</label>
                <input
                  type="date"
                  className="w-full p-2 rounded border border-blue-700 bg-blue-950 text-white"
                  value={rdvDate}
                  onChange={e => setRdvDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Heure</label>
                <select
                  className="w-full p-2 rounded border border-blue-700 bg-blue-950 text-white"
                  value={rdvHour}
                  onChange={e => setRdvHour(e.target.value)}
                  disabled={!rdvContact || !rdvDate}
                >
                  <option value="">Choisir...</option>
                  {(() => {
                    if (!rdvContact || !rdvDate) return null;
                    // Récupérer les dispos du contact pour ce jour
                    const dateObj = new Date(rdvDate);
                    const dayName = DAYS[dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1];
                    const dispo = availabilityMap[rdvContact.id]?.[dayName] || {};
                    // Récupérer les heures déjà prises
                    const takenHours = rdvs
                      .filter(r => r.contactId === rdvContact.id && r.date === rdvDate)
                      .map(r => String(r.hour));
                    return Object.keys(dispo)
                      .filter(h => dispo[h])
                      .map(h => (
                        <option
                          key={h}
                          value={h}
                          disabled={takenHours.includes(h)}
                          style={takenHours.includes(h) ? { color: '#f87171', background: '#7f1d1d' } : {}}
                        >
                          {h}h{takenHours.includes(h) ? ' (pris)' : ''}
                        </option>
                      ));
                  })()}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Motif du RDV</label>
              <select
                className="w-full p-2 rounded border border-blue-700 bg-blue-950 text-white mb-2"
                value={selectedMotifId}
                onChange={e => setSelectedMotifId(e.target.value)}
                required
              >
                <option value="">Sélectionner un motif</option>
                {motifs.map(motif => (
                  <option key={motif.id} value={motif.id}>{motif.label}</option>
                ))}
              </select>
              {motifs.find(m => m.id == selectedMotifId)?.label === 'Autre' && (
                <input
                  type="text"
                  className="w-full p-2 rounded border border-blue-700 bg-blue-950 text-white mb-2"
                  placeholder="Précisez le motif"
                  value={customMotif}
                  onChange={e => setCustomMotif(e.target.value)}
                  required
                />
              )}
            </div>
            {rdvError && <div className="text-red-300 mb-2">{rdvError}</div>}
            {rdvConfirmed && <div className="text-green-300 font-bold mb-2">RDV enregistré (démo) !</div>}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowRdvModal(false)} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">Annuler</button>
              <button
                onClick={async () => {
                  setRdvError('');
                  if (!rdvContact || !rdvUser || !rdvDate || !rdvHour) {
                    setRdvError('Veuillez remplir tous les champs.');
                    return;
                  }
                  // Vérifier si le créneau est déjà pris
                  const { data: existing, error: checkError } = await supabase
                    .from('rdvs2')
                    .select('*')
                    .eq('contactId', rdvContact.id)
                    .eq('date', rdvDate)
                    .eq('hour', rdvHour);
                  if (existing && existing.length > 0) {
                    setRdvError('Ce créneau est déjà réservé !');
                    return;
                  }
                  // Insérer le RDV
                  const { error } = await supabase.from('rdvs2').insert([{
                    contactId: rdvContact.id,
                    contactName: rdvContact.name,
                    userName: rdvUser.name,
                    userEmail: rdvUser.email,
                    date: rdvDate,
                    hour: rdvHour,
                    motif_id: selectedMotifId,
                    motif_custom: motifs.find(m => m.id == selectedMotifId)?.label === 'Autre' ? customMotif : null
                  }]);
                  if (error) {
                    setRdvError('Erreur lors de la prise de RDV : ' + error.message);
                    return;
                  }
                  setRdvConfirmed(true);
                  // Rafraîchir la liste des RDV
                  const { data: newRdvs } = await supabase.from('rdvs2').select('*');
                  setRdvs(newRdvs || []);
                  setTimeout(() => { setShowRdvModal(false); setRdvConfirmed(false); setRdvContact(null); setRdvUser(null); setRdvDate(''); setRdvHour(''); setRdvSearchContact(''); setRdvSearchUser(''); setRdvError(''); }, 1200);
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des RDV pris avec filtres */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">RDV pris</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Filtrer par contact..."
            className="p-2 rounded border mb-2 placeholder-blue-300"
            value={filterContact}
            onChange={e => setFilterContact(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrer par étudiant..."
            className="p-2 rounded border mb-2 placeholder-blue-300"
            value={filterUser}
            onChange={e => setFilterUser(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto rounded-xl shadow-xl">
          <table className="w-full text-sm text-left border border-primary bg-white rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-primary">
              <tr>
                <th className="px-4 py-2 border-b border-primary">Contact</th>
                <th className="px-4 py-2 border-b border-primary">Étudiant</th>
                <th className="px-4 py-2 border-b border-primary">Date</th>
                <th className="px-4 py-2 border-b border-primary">Heure</th>
                <th className="px-4 py-2 border-b border-primary">Motif</th>
              </tr>
            </thead>
            <tbody>
              {rdvs
                .filter(r => r.contactName?.toLowerCase().includes(filterContact.toLowerCase()))
                .filter(r => r.userName?.toLowerCase().includes(filterUser.toLowerCase()))
                .map((r, idx) => {
                  const motif = motifs.find(m => m.id === r.motif_id);
                  const motifLabel = motif?.label === 'Autre' && r.motif_custom ? r.motif_custom : motif?.label;
                  return (
                    <tr key={r.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-primary text-gray-700`}>
                      <td className="px-4 py-2">{r.contactName}</td>
                      <td className="px-4 py-2">{r.userName}</td>
                      <td className="px-4 py-2">{r.date}</td>
                      <td className="px-4 py-2">{r.hour}h</td>
                      <td className="px-4 py-2">{motifLabel}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Affichage de la pop-up de confirmation */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-700 text-white px-8 py-6 rounded-xl shadow-lg text-center animate-fadeIn">
            <div className="text-3xl mb-2">✔</div>
            <div className="text-lg font-bold">{message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarAvailability({ contact, availabilityMap, rdvs }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [takenHour, setTakenHour] = useState(null);
  const [rdvTakenMsg, setRdvTakenMsg] = useState('');
  if (!contact) return null;
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const nbDays = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= nbDays; i++) {
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
  let selectedHours = selectedDate && dispo[selectedDayName] ? Object.entries(dispo[selectedDayName]).filter(([h, v]) => v).map(([h]) => h) : [];
  // Récupérer les heures déjà prises depuis la vraie liste des RDV
  let takenHours = [];
  if (selectedDate && rdvs && contact) {
    takenHours = rdvs
      .filter(r => r.contactId === contact.id && r.date === selectedDate.toISOString().split('T')[0])
      .map(r => String(r.hour));
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="px-2 py-1 rounded bg-blue-800 hover:bg-blue-700">◀</button>
        <span className="font-semibold">{currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="px-2 py-1 rounded bg-blue-800 hover:bg-blue-700">▶</button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-blue-200 text-xs">
        <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).map((_, i) => (
          <div key={i}></div>
        ))}
        {days.map(date => {
          const isDispo = hasDispo(date);
          return (
            <button
              key={date.toISOString()}
              disabled={!isDispo}
              className={`rounded-lg py-2 text-sm font-semibold transition w-full
                ${isDispo ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-950 text-blue-400 opacity-50 cursor-not-allowed'}
                ${selectedDate && date.toDateString() === selectedDate.toDateString() ? 'ring-2 ring-yellow-400 bg-yellow-700 text-white' : ''}`}
              onClick={() => { setSelectedDate(date); setTakenHour(null); setRdvTakenMsg(''); }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <div className="text-center font-semibold mb-2">Heures disponibles pour le {selectedDate.toLocaleDateString('fr-FR')}</div>
          {selectedHours.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedHours.filter(h => !takenHours.includes(h)).map(h => (
                <span key={h} className="bg-green-600 text-white px-3 py-2 rounded-lg font-bold text-sm">{h}h</span>
              ))}
            </div>
          ) : (
            <div className="text-center text-blue-300">Aucune disponibilité ce jour</div>
          )}
        </div>
      )}
    </div>
  );
} 