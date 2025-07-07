"use client";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function NavbarVisibility() {
  const pathname = usePathname();
  const hideNavbar = ["/", "/login", "/register", "/admin-login"].includes(pathname);

  if (hideNavbar) return null;
  return <Navbar />;
} 