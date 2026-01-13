export type PaymentMethod = "CASH" | "UPI" | "BANK" | "OTHER";

export interface Sale {
  _id: string;
  customerName: string;
  address: string;
  phone: string;
  quantity: number;
  sellingAmount: number;
  shippingCollected: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
  };
}

export interface SaleStats {
  totalQuantitySold: number;
  totalSalesAmount: number;
  totalShippingCollected: number;
}

export interface PaginatedSaleResponse {
  data: Sale[];
  total: number;
  stats: SaleStats;
}
