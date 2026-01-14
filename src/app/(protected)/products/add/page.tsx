"use client";

import { useState } from "react";
import { createProduct } from "@/services/product.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Errors {
  name?: string;
  code?: string;
  stock?: string;
  purchaseCost?: string;
  shippingCost?: string;
}

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    code: "",
    stock: "",
    purchaseCost: "",
    shippingCost: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};

    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.code.trim()) e.code = "Product code is required";
    if (!form.stock || Number(form.stock) <= 0) e.stock = "Stock must be greater than 0";
    if (!form.purchaseCost || Number(form.purchaseCost) <= 0) e.purchaseCost = "Purchase cost is required";
    if (!form.shippingCost || Number(form.shippingCost) < 0) e.shippingCost = "Shipping cost cannot be negative";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await createProduct({
        name: form.name,
        code: form.code,
        stock: Number(form.stock),
        purchaseCost: Number(form.purchaseCost),
        shippingCost: Number(form.shippingCost),
      });

      toast.success("Product added successfully");
      router.push("/products");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-lg rounded-xl border border-gray-700 bg-[#23272B]/80 backdrop-blur-md p-6 space-y-5">
        <h1 className="text-lg font-semibold text-white">Add Product</h1>

        {/* Product Name */}
        <div>
          <label className="text-xs text-gray-400">Product Name</label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Product Code */}
        <div>
          <label className="text-xs text-gray-400">Product Code</label>
          <Input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
        </div>

        {/* Stock */}
        <div>
          <label className="text-xs text-gray-400">Stock</label>
          <Input
            type="number"
            inputMode="numeric"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
        </div>

        {/* Purchase Cost */}
        <div>
          <label className="text-xs text-gray-400">Purchase Cost</label>
          <Input
            type="number"
            inputMode="decimal"
            value={form.purchaseCost}
            onChange={(e) => setForm({ ...form, purchaseCost: e.target.value })}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          {errors.purchaseCost && <p className="text-xs text-red-500">{errors.purchaseCost}</p>}
        </div>

        {/* Shipping Cost */}
        <div>
          <label className="text-xs text-gray-400">Shipping Cost</label>
          <Input
            type="number"
            inputMode="decimal"
            value={form.shippingCost}
            onChange={(e) => setForm({ ...form, shippingCost: e.target.value })}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          {errors.shippingCost && <p className="text-xs text-red-500">{errors.shippingCost}</p>}
        </div>

        <Button onClick={submit} disabled={loading} className="w-full mt-2">
          {loading ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </div>
  );
}
