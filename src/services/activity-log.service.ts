// 🆕 NEW – FULL FILE

import axiosInstance from "./axiosInstance";
// 🆕 / REQUIRED – FULL FILE

export enum ActivityAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface ActivityUser {
  id: string;
  name: string;
  email: string;
}

export interface ActivityLogItem {
  id: string;
  action: ActivityAction;
  module: string;
  description: string;
  createdAt: string;
  performedBy: ActivityUser;
}

export interface ActivityLogListResponse {
  data: ActivityLogItem[];
  total: number;
}

export const fetchActivityLogs = async (page = 1, limit = 10): Promise<ActivityLogListResponse> => {
  const res = await axiosInstance.get<ActivityLogListResponse>(`/activity-logs?page=${page}&limit=${limit}`);
  return res.data;
};
