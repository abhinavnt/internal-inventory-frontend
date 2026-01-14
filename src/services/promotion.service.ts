// ✅ CHANGED (mapping socialMediaLink → socialLinks)

import axiosInstance from "./axiosInstance";
import { Promotion, CreatePromotionPayload } from "@/types/promotion";

export const createPromotion = async (
  payload: CreatePromotionPayload
): Promise<Promotion> => {
  const { productId, socialMediaLink, ...rest } = payload;

  const res = await axiosInstance.post(`/promotions/${productId}`, {
    ...rest,
    socialLinks: socialMediaLink,
  });

  return res.data;
};

export const fetchPromotionsByProduct = async (
  productId: string,
  page: number,
  limit: number
) => {
  const res = await axiosInstance.get(
    `/promotions/${productId}?page=${page}&limit=${limit}`
  );
  return res.data;
};
