
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee, Wallet, TrendingUp, TrendingDown, Pencil } from "lucide-react";
import { EditCapitalModal } from "./EditCapitalModal";

interface DashboardCardData {
  initialCapital: number;
  availableBalance: number;
  totalRevenue: number;
  netProfit: number;
}

export function DashboardCards({ data }: { data: DashboardCardData }) {
  const [open, setOpen] = useState<boolean>(false);

  const cards = [
    {
      label: "Initial Capital",
      value: data.initialCapital,
      editable: true,
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      label: "Available Balance",
      value: data.availableBalance,
      icon: <IndianRupee className="w-5 h-5" />,
    },
    {
      label: "Total Revenue",
      value: data.totalRevenue,
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
    },
    {
      label: "Net Profit / Loss",
      value: data.netProfit,
      icon:
        data.netProfit >= 0 ? (
          <TrendingUp className="w-5 h-5 text-green-400" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-400" />
        ),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="bg-[#23272B] border-none">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{c.label}</p>
                <div className="flex items-center gap-2">
                  {c.icon}
                  {c.editable && (
                    <Pencil
                      className="w-4 h-4 cursor-pointer text-gray-400 hover:text-white"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
              </div>
              <p className="text-lg font-semibold">
                ₹{Number(c.value).toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditCapitalModal
        open={open}
        onClose={() => setOpen(false)}
        currentAmount={data.initialCapital}
        onUpdated={() => window.location.reload()}
      />
    </>
  );
}
