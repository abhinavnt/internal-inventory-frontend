export interface ProductProfit {
  productId: string;
  name: string;
  stock: number;
  totalRevenue: number;
  totalExpense: number;
  profit: number;
}

export interface CapitalHistory {
  previousAmount: number;
  newAmount: number;
  reason?: string;
  createdAt: string;
}

export interface DashboardData {
  initialCapital: number;
  availableBalance: number;
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  lowStockProducts: ProductProfit[];
  topSellingProducts: ProductProfit[];
  highestProfitProducts: ProductProfit[];
  capitalHistory: CapitalHistory[];
}
