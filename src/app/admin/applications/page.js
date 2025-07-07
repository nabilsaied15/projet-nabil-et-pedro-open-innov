export default function Applications() {
  const candidatures = [
    { entreprise: "Google", poste: "Développeur", statut: "En attente" },
    { entreprise: "Capgemini", poste: "Alternance", statut: "Acceptée" },
  ];

  return (
    <div className="min-h-screen bg-white p-10 text-primary">
      <h2 className="text-xl font-semibold mb-4">Mes candidatures</h2>
      <ul className="space-y-4">
        {candidatures.map((c, i) => (
          <li key={i} className="border p-4 rounded shadow">
            <p><strong>Entreprise :</strong> {c.entreprise}</p>
            <p><strong>Poste :</strong> {c.poste}</p>
            <p><strong>Statut :</strong> {c.statut}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
