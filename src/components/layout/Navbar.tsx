"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { logoutThunk } from "@/redux/features/AuthSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await dispatch(logoutThunk());
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#23272B] border-b border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="font-semibold text-white">
          Inventory Admin
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-200" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-200">
          <Link href="/products" className="hover:text-white">
            Products
          </Link>
          <Link href="/products/add" className="hover:text-white">
            Add Product
          </Link>
          <Link href="/expenses" className="hover:text-white">
            Expenses
          </Link>
          <Link href="/activity-logs" className="hover:text-white">
            activity-logs
          </Link>
          <Button variant="destructive" size="sm" onClick={logout}>
            Logout
          </Button>
        </nav>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-gray-700 bg-[#23272B] px-4 py-3 space-y-3">
          <Link href="/products" className="block text-gray-200" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link href="/products/add" className="block text-gray-200" onClick={() => setOpen(false)}>
            Add Product
          </Link>
          <Link href="/expenses" className="block text-gray-200" onClick={() => setOpen(false)}>
            Expenses
          </Link>
          <Link href="/activity-logs" className="block text-gray-200" onClick={() => setOpen(false)}>
            activity-logs
          </Link>

          <Button variant="destructive" size="sm" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}
