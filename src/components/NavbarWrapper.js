'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (['/', '/login', '/register', '/admin-login'].includes(pathname)) return null;
  return <Navbar />;
} 