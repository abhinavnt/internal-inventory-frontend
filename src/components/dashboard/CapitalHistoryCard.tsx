// 🆕 NEW – FULL FILE

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CapitalHistory } from "@/types/dashboard";

export function CapitalHistoryCard({
  history,
}: {
  history: CapitalHistory[];
}) {
  return (
    <Card className="bg-[#23272B] border-none">
      <CardHeader>
        <h2 className="text-sm font-semibold">Capital History</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.length === 0 && (
          <p className="text-xs text-gray-400">No changes yet</p>
        )}

        {history.map((h, i) => (
          <div key={i} className="text-xs flex justify-between">
            <span>
              ₹{h.previousAmount} → ₹{h.newAmount}
            </span>
            <span className="text-gray-400">
              {new Date(h.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
