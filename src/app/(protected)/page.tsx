"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { fetchDashboard } from "@/services/dashboard.service";
import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { DashboardLists } from "@/components/dashboard/DashboardLists";
import { CapitalHistoryCard } from "@/components/dashboard/CapitalHistoryCard";

import { DashboardData } from "@/types/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, authChecked } = useAuth();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDashboard = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetchDashboard();
      setData(res);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    loadDashboard();
  }, [authChecked, isAuthenticated, router, loadDashboard]);

  if (!authChecked || loading || !data) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <main className="p-4 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <DashboardCards data={data} />

      <DashboardLists data={data} />

      <CapitalHistoryCard history={data.capitalHistory} />
    </main>
  );
}
