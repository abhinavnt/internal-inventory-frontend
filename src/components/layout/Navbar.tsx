"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { logoutThunk } from "@/redux/features/AuthSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Products", href: "/products", exact: true },
  { label: "Add Product", href: "/products/add", exact: true },
  { label: "Expenses", href: "/expenses" },
  { label: "Activity Logs", href: "/activity-logs" },
];

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await dispatch(logoutThunk());
    router.replace("/login");
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#23272B]/90 backdrop-blur-md border-b border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="font-semibold text-white">
          Inventory Admin
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-200" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-4 py-1.5 rounded-full transition-all duration-300
                  ${active ? "text-white bg-white/15 backdrop-blur-md border border-white/20 shadow-sm" : "text-gray-300"}
                  ${!active ? "hover:text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10" : ""}
                `}
              >
                {item.label}
              </Link>
            );
          })}

          <Button variant="destructive" size="sm" className="ml-2" onClick={logout}>
            Logout
          </Button>
        </nav>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-gray-700 bg-[#23272B]/95 backdrop-blur-md px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  block px-4 py-2 rounded-full text-sm transition-all duration-300
                  ${active ? "text-white bg-white/15 backdrop-blur-md border border-white/20 shadow-sm" : "text-gray-300"}
                  ${!active ? "hover:text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10" : ""}
                `}
              >
                {item.label}
              </Link>
            );
          })}

          <Button variant="destructive" size="sm" className="w-full mt-3" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}
