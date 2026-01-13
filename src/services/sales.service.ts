// ✅ CHANGED (pagination-safe)

import axiosInstance from "./axiosInstance";
import { Sale } from "@/types/sale";

export const fetchSalesByProduct = async (
  productId: string,
  page: number,
  limit: number
) => {
  const res = await axiosInstance.get(
    `/sales/${productId}?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createSale = async (
  productId: string,
  payload: {
    customerName: string;
    address: string;
    phone: string;
    quantity: number;
    sellingAmount: number;
    shippingCollected: number;
    couponCode?: string;
    paymentMethod: "CASH" | "UPI" | "BANK" | "OTHER";
  }
) => {
  const res = await axiosInstance.post(`/sales/${productId}`, payload);
  return res.data;
};
