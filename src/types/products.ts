export interface Product {
  _id: string;
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  notes?: string;
  createdAt: string;
}
