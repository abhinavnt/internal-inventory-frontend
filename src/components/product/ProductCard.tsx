import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/services/product.service";

export function ProductCard({ product }: { product: Product }) {
  console.log("product", product);

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="bg-[#23272B] border-none">
        <CardContent className="p-4 space-y-2">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-xs text-gray-400">Stock: {product.stock}</p>
          <p className="text-sm">Profit: ₹{product.profit?.toLocaleString("en-IN")}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
