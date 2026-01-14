"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

import { fetchProductById } from "@/services/product.service";
import { fetchSalesByProduct } from "@/services/sales.service";
import { fetchPromotionsByProduct } from "@/services/promotion.service";

import { Product } from "@/types/products";
import { Sale, SaleStats } from "@/types/sale";
import { Promotion, PromotionStats } from "@/types/promotion";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import { AddSaleModal } from "@/components/product/AddSaleModal";
import { AddPromotionModal } from "@/components/product/AddPromotionModal";



const PAGE_LIMIT = 10;

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);

  const [sales, setSales] = useState<Sale[]>([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [salesPage, setSalesPage] = useState(1);
  const [salesStats, setSalesStats] = useState<SaleStats>({
    totalQuantitySold: 0,
    totalSalesAmount: 0,
    totalShippingCollected: 0,
  });

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [promoTotal, setPromoTotal] = useState(0);
  const [promoPage, setPromoPage] = useState(1);
  const [promoStats, setPromoStats] = useState<PromotionStats>({
    totalPromotionSpend: 0,
  });

  const [loading, setLoading] = useState(true);

  const [saleModal, setSaleModal] = useState(false);
  const [promoModal, setPromoModal] = useState(false);

  const loadAll = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const [productRes, salesRes, promoRes] = await Promise.all([
        fetchProductById(productId),
        fetchSalesByProduct(productId, salesPage, PAGE_LIMIT),
        fetchPromotionsByProduct(productId, promoPage, PAGE_LIMIT),
      ]);

      setProduct(productRes);

      setSales(salesRes.data);
      setSalesTotal(salesRes.total);
      setSalesStats(salesRes.stats);

      setPromotions(promoRes.data);
      setPromoTotal(promoRes.total);
      setPromoStats(promoRes.stats);
    } catch {
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  }, [productId, salesPage, promoPage]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  if (loading || !product) {
    return <div className="p-4">Loading...</div>;
  }

  const salesTotalPages = Math.ceil(salesTotal / PAGE_LIMIT);
  const promoTotalPages = Math.ceil(promoTotal / PAGE_LIMIT);

  return (
    <div className="space-y-6">
      {/* PRODUCT SUMMARY */}
      <Card className="bg-[#23272B] border-none">
        <CardContent className="p-4 space-y-3">
          <h1 className="text-lg font-semibold">{product.name}</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-gray-300">
            <p>Code: {product.code}</p>
            <p>Available Stock: {product.stock}</p>
            <p>Total Sold: {salesStats.totalQuantitySold}</p>
            <p>Total Sales: ₹{salesStats.totalSalesAmount}</p>
            <p>Shipping Collected: ₹{salesStats.totalShippingCollected}</p>
            <p>Promotion Spend: ₹{promoStats.totalPromotionSpend}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs + rest of UI stays EXACTLY the same */}

      <AddSaleModal
        open={saleModal}
        onClose={() => setSaleModal(false)}
        productId={productId}
        onSuccess={loadAll}
      />

      <AddPromotionModal
        open={promoModal}
        onClose={() => setPromoModal(false)}
        productId={productId}
        onSuccess={loadAll}
      />
    </div>
  );
}
