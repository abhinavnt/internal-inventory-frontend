import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardLists({ data }: { data: any }) {
  const renderList = (title: string, items: any[]) => (
    <Card className="bg-[#23272B] border-none">
      <CardHeader>
        <h2 className="text-sm font-semibold">{title}</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && (
          <p className="text-xs text-gray-400">No data</p>
        )}
        {items.map((p) => (
          <div
            key={p.productId}
            className="flex justify-between text-sm"
          >
            <span>{p.name}</span>
            <span className="text-gray-300">
              ₹{p.profit?.toLocaleString("en-IN") ?? p.stock}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {renderList("Low Stock", data.lowStockProducts)}
      {renderList("Top Selling", data.topSellingProducts)}
      {renderList("Highest Profit", data.highestProfitProducts)}
    </div>
  );
}
