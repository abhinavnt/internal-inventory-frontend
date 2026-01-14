"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { createSale } from "@/services/sales.service";
import { PaymentMethod } from "@/types/sale";

interface AddSaleModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  onSuccess: () => void;
}

export function AddSaleModal({ open, onClose, productId, onSuccess }: AddSaleModalProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    customerName: "",
    address: "",
    phone: "",
    quantity: 1,
    sellingAmount: 0,
    shippingCollected: 0,
    couponCode: "",
    paymentMethod: "CASH" as PaymentMethod,
  });

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.customerName.trim()) e.customerName = "Customer name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (form.quantity <= 0) e.quantity = "Quantity must be greater than 0";
    if (form.sellingAmount <= 0) e.sellingAmount = "Selling amount must be greater than 0";
    if (form.shippingCollected < 0) e.shippingCollected = "Shipping cannot be negative";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      // ✅ CORRECT SERVICE CALL (2 ARGUMENTS)
      await createSale(productId, {
        customerName: form.customerName,
        address: form.address,
        phone: form.phone,
        quantity: form.quantity,
        sellingAmount: form.sellingAmount,
        shippingCollected: form.shippingCollected, // 🔥 REQUIRED BY BACKEND
        couponCode: form.couponCode || undefined,
        paymentMethod: form.paymentMethod || "CASH",
      });

      toast.success("Sale added successfully");
      onSuccess();
      onClose();
    } catch  {
      toast.error("Failed to add sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sale</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* CUSTOMER NAME */}
          <div>
            <Label>Customer Name</Label>
            <Input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            {errors.customerName && <p className="text-xs text-red-500">{errors.customerName}</p>}
          </div>

          {/* ADDRESS */}
          <div>
            <Label>Address</Label>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
          </div>

          {/* PHONE */}
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* QUANTITY */}
          <div>
            <Label>Quantity</Label>
            <Input type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
            {errors.quantity && <p className="text-xs text-red-500">{errors.quantity}</p>}
          </div>

          {/* SELLING AMOUNT */}
          <div>
            <Label>Selling Amount</Label>
            <Input
              type="number"
              min={0}
              value={form.sellingAmount}
              onChange={(e) =>
                setForm({
                  ...form,
                  sellingAmount: Number(e.target.value),
                })
              }
            />
            {errors.sellingAmount && <p className="text-xs text-red-500">{errors.sellingAmount}</p>}
          </div>

          {/* SHIPPING COLLECTED */}
          <div>
            <Label>Shipping Collected (from customer)</Label>
            <Input
              type="number"
              min={0}
              value={form.shippingCollected}
              onChange={(e) =>
                setForm({
                  ...form,
                  shippingCollected: Number(e.target.value),
                })
              }
            />
            {errors.shippingCollected && <p className="text-xs text-red-500">{errors.shippingCollected}</p>}
          </div>

          {/* COUPON CODE */}
          <div>
            <Label>Coupon Code (optional)</Label>
            <Input value={form.couponCode} onChange={(e) => setForm({ ...form, couponCode: e.target.value })} />
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <Label>Payment Method</Label>
            <select
              className="w-full rounded border bg-[#1C2023] px-2 py-2 text-sm"
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentMethod: e.target.value as PaymentMethod,
                })
              }
            >
              <option value="CASH">Cash</option>
              <option value="UPI">UPI</option>
              <option value="BANK">Bank</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <Button disabled={loading} onClick={submit} className="w-full">
            {loading ? "Adding..." : "Add Sale"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
