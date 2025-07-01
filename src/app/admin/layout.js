import '../globals.css';

export const metadata = {
  title: 'Admin - Plateforme',
  description: 'Section administration de la plateforme',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-br from-blue-900 via-purple-900 to-fuchsia-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
} 