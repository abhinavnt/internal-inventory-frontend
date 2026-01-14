"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

import { fetchProductById } from "@/services/product.service";
import { fetchSalesByProduct } from "@/services/sales.service";
import { fetchPromotionsByProduct } from "@/services/promotion.service";

import { Product } from "@/types/products";
import { Sale, SaleStats } from "@/types/sale";
import { Promotion, PromotionStats } from "@/types/promotion";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { AddSaleModal } from "@/components/product/AddSaleModal";
import { AddPromotionModal } from "@/components/product/AddPromotionModal";

/* ---------- SAFE ADMIN NAME ---------- */
const getAdminName = (createdBy?: { _id: string; name: string } | null): string => createdBy?.name ?? "Admin";

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

  /* ---------- DATA LOADER ---------- */
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
      {/* ================= PRODUCT SUMMARY ================= */}
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

      <Tabs defaultValue="sales">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        {/* ================= SALES ================= */}
        <TabsContent value="sales" className="space-y-4">
          <Button onClick={() => setSaleModal(true)}>Add Sale</Button>

          {sales.map((s) => (
            <Card key={s._id} className="bg-[#23272B] border-none">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <p className="font-medium">{s.customerName}</p>
                  <p className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="text-xs text-gray-400">📞 {s.phone}</p>
                <p className="text-xs text-gray-400">📍 {s.address}</p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <p>Qty: {s.quantity}</p>
                  <p>Payment: {s.paymentMethod}</p>
                  <p>Selling: ₹{s.sellingAmount}</p>
                  <p>Shipping: ₹{s.shippingCollected}</p>
                </div>

                {s.couponCode && <p className="text-xs text-green-400">Coupon: {s.couponCode}</p>}

                <p className="text-xs text-gray-500 border-t border-gray-700 pt-2">Added by {getAdminName(s.createdBy)}</p>
              </CardContent>
            </Card>
          ))}

          {/* SALES PAGINATION */}
          <div className="flex justify-between items-center text-xs">
            <Button variant="outline" disabled={salesPage === 1} onClick={() => setSalesPage((p) => p - 1)}>
              Previous
            </Button>

            <span className="text-gray-400">
              Page {salesPage} of {salesTotalPages}
            </span>

            <Button variant="outline" disabled={salesPage >= salesTotalPages} onClick={() => setSalesPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </TabsContent>

        {/* ================= PROMOTIONS ================= */}
        <TabsContent value="promotions" className="space-y-4">
          <Button onClick={() => setPromoModal(true)}>Add Promotion</Button>

          {promotions.map((p) => (
            <Card key={p._id} className="bg-[#23272B] border-none">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <p className="font-medium">{p.influencerName}</p>
                  <p className="text-xs text-gray-400">{new Date(p.campaignDate).toLocaleDateString()}</p>
                </div>

                <p className="text-xs text-gray-300">Amount Paid: ₹{p.amountPaid}</p>

                {p.socialLinks && (
                  <a href={p.socialLinks} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 underline">
                    Social Media Link
                  </a>
                )}

                {p.notes && <p className="text-xs text-gray-400">📝 {p.notes}</p>}

                <p className="text-xs text-gray-500 border-t border-gray-700 pt-2">Added by {getAdminName(p.createdBy)}</p>
              </CardContent>
            </Card>
          ))}

          {/* PROMOTION PAGINATION */}
          <div className="flex justify-between items-center text-xs">
            <Button variant="outline" disabled={promoPage === 1} onClick={() => setPromoPage((p) => p - 1)}>
              Previous
            </Button>

            <span className="text-gray-400">
              Page {promoPage} of {promoTotalPages}
            </span>

            <Button variant="outline" disabled={promoPage >= promoTotalPages} onClick={() => setPromoPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </TabsContent>

        {/* ================= SUMMARY ================= */}
        <TabsContent value="summary">
          <Card className="bg-[#23272B] border-none">
            <CardHeader>
              <h2 className="text-sm font-semibold">Profit Summary</h2>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Total Sales: ₹{salesStats.totalSalesAmount}</p>
              <p>Shipping Collected: ₹{salesStats.totalShippingCollected}</p>
              <p>Marketing Spend: ₹{promoStats.totalPromotionSpend}</p>
              <p className="font-medium">Net: ₹{salesStats.totalSalesAmount - promoStats.totalPromotionSpend}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ================= MODALS ================= */}
      <AddSaleModal open={saleModal} onClose={() => setSaleModal(false)} productId={productId} onSuccess={loadAll} />

      <AddPromotionModal open={promoModal} onClose={() => setPromoModal(false)} productId={productId} onSuccess={loadAll} />
    </div>
  );
}
