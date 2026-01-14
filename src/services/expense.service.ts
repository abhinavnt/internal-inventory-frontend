// 🆕 NEW – FULL FILE (frontend service, no any)

import axiosInstance from "./axiosInstance";

/* ---------- TYPES ---------- */

export interface ExpenseUser {
  id: string;
  name: string;
}

export interface ExpenseProduct {
  id: string;
  name: string;
}

export interface ExpenseItem {
  id: string;
  type:
    | "PURCHASE"
    | "SHIPPING"
    | "CUSTOMER_SHIPPING"
    | "PROMOTION"
    | "MARKETING"
    | "OTHER";
  amount: number;
  description?: string;
  createdAt: string;
  createdBy: ExpenseUser;
  product?: ExpenseProduct;
}

export interface ExpenseListResponse {
  data: ExpenseItem[];
  total: number;
}

/* ---------- API CALL ---------- */

/**
 * Fetch paginated expense list
 */
export const fetchExpenses = async (
  page: number = 1,
  limit: number = 10
): Promise<ExpenseListResponse> => {
  const res = await axiosInstance.get<ExpenseListResponse>(
    `/expenses?page=${page}&limit=${limit}`
  );

  return res.data;
};
