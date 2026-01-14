import axiosInstance from "./axiosInstance";

export const fetchDashboard = async () => {
  const res = await axiosInstance.get("/dashboard");
  return res.data;
};
