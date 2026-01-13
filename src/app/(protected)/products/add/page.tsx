"use client";

import { useState } from "react";
import { createProduct } from "@/services/product.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    code: "",
    stock: 0,
    purchaseCost: 0,
    shippingCost: 0,
  });

  const submit = async () => {
    try {
      await createProduct(form);
      toast.success("Product added");
      router.push("/products");
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-md space-y-4">
      <h1 className="font-semibold">Add Product</h1>

      <Input placeholder="Product Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Product Code" onChange={(e) => setForm({ ...form, code: e.target.value })} />
      <Input type="number" placeholder="Stock" onChange={(e) => setForm({ ...form, stock: +e.target.value })} />
      <Input type="number" placeholder="Purchase Cost" onChange={(e) => setForm({ ...form, purchaseCost: +e.target.value })} />
      <Input type="number" placeholder="Shipping Cost" onChange={(e) => setForm({ ...form, shippingCost: +e.target.value })} />

      <Button onClick={submit}>Save</Button>
    </div>
  );
}
