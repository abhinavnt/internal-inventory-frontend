"use client";

import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

interface RefreshResponse {
  accessToken: string;
  user: unknown;
}

let getAccessToken: (() => string | null) | null = null;
let onTokenRefresh: ((token: string) => void) | null = null;

export const setAuthHandlers = (handlers: { getAccessToken: () => string | null; onTokenRefresh: (token: string) => void }) => {
  getAccessToken = handlers.getAccessToken;
  onTokenRefresh = handlers.onTokenRefresh;
};

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken?.();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<RefreshResponse>(`${apiUrl}/api/auth/refresh-token`, {}, { withCredentials: true });

        onTokenRefresh?.(res.data.accessToken);
        originalRequest.headers.set("Authorization", `Bearer ${res.data.accessToken}`);

        return axiosInstance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
