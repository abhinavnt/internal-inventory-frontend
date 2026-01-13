import axiosInstance from "./axiosInstance";

/**
 * PRODUCT TYPES
 * Keep minimal for now, extend later
 */
export interface CreateProductPayload {
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  notes?: string;
}

export interface Product {
  _id: string;
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  profit?: number;
  createdAt: string;
}

/**
 * GET ALL PRODUCTS (with pagination later)
 */
export const fetchProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

/**
 * GET SINGLE PRODUCT BY ID
 */
export const fetchProductById = async (productId: string) => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res.data;
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async (data: CreateProductPayload) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (
  productId: string,
  data: Partial<CreateProductPayload>
) => {
  const res = await axiosInstance.put(`/products/${productId}`, data);
  return res.data;
};

/**
 * DELETE PRODUCT (SOFT DELETE)
 */
export const deleteProduct = async (productId: string) => {
  const res = await axiosInstance.delete(`/products/${productId}`);
  return res.data;
};
