import '../globals.css';

export const metadata = {
  title: 'Admin - Plateforme',
  description: 'Section administration de la plateforme',
};

export default function AdminLayout({ children }) {
  return (
    <div className=" text-primary min-h-screen">
      {children}
    </div>
  );
} 