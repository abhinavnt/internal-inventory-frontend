export interface Promotion {
  _id: string;
  influencerName: string;
  socialLinks?: string;
  amountPaid: number;
  campaignDate: string;
  notes?: string;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
  };
}

export interface PromotionStats {
  totalPromotionSpend: number;
}

export interface PaginatedPromotionResponse {
  data: Promotion[];
  total: number;
  stats: PromotionStats;
}

export interface CreatePromotionPayload {
  productId: string;
  influencerName: string;
  socialMediaLink: string;
  amountPaid: number;
  campaignDate: string;
  notes?: string;
}
