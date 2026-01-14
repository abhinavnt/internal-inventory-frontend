// ✅ CHANGED – FULL FILE

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductProfit } from "@/types/dashboard";

interface DashboardListsProps {
  data: {
    lowStockProducts: ProductProfit[];
    topSellingProducts: ProductProfit[];
    highestProfitProducts: ProductProfit[];
  };
}

export function DashboardLists({ data }: DashboardListsProps) {
  const renderList = (
    title: string,
    items: ProductProfit[],
    valueKey: "stock" | "profit"
  ) => (
    <Card className="bg-[#23272B] border-none">
      <CardHeader>
        <h2 className="text-sm font-semibold">{title}</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && (
          <p className="text-xs text-gray-400">No data</p>
        )}

        {items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span className="text-gray-300">
              {valueKey === "stock"
                ? item.stock
                : `₹${item.profit.toLocaleString("en-IN")}`}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {renderList("Low Stock", data.lowStockProducts, "stock")}
      {renderList("Top Selling", data.topSellingProducts, "profit")}
      {renderList("Highest Profit", data.highestProfitProducts, "profit")}
    </div>
  );
}
