"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, authChecked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authChecked, isAuthenticated, router]); 

  if (!authChecked || !isAuthenticated) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
