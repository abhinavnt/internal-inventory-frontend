// 🆕 NEW – FULL FILE

import axiosInstance from "./axiosInstance";

export interface CapitalResponse {
  id: string;
  initialAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCapitalPayload {
  newAmount: number;
  reason?: string;
}

export const fetchCapital = async (): Promise<CapitalResponse | null> => {
  const res = await axiosInstance.get<CapitalResponse | null>("/capital");
  return res.data;
};

export const updateCapital = async (payload: UpdateCapitalPayload): Promise<CapitalResponse> => {
  const res = await axiosInstance.put<CapitalResponse>("/capital", payload);
  return res.data;
};
