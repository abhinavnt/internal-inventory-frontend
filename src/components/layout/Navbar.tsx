"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutThunk } from "@/redux/features/AuthSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    await dispatch(logoutThunk());
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 bg-[#23272B] border-b border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Link href="/" className="font-semibold">
          Inventory Admin
        </Link>

        <nav className="flex gap-3 text-sm">
          <Link href="/products">Products</Link>
          <Link href="/products/add">Add Product</Link>
          <Link href="/expenses">Expenses</Link>
          <Button variant="destructive" size="sm" onClick={logout}>
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}
