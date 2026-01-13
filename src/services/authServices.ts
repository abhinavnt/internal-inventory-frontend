import axiosInstance from "./axiosInstance";

export const login = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const refreshAuth = async () => {
  const res = await axiosInstance.post("/auth/refresh-token");
  return res.data;
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};
