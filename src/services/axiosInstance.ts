"use client";

import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

interface ErrorResponseData {
  code?: string;
}

interface RefreshResponse {
  accessToken: string;
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
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken?.();

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && error.response.data?.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post<RefreshResponse>(`${apiUrl}/api/auth/refresh-token`, {}, { withCredentials: true });

        const newToken = refreshResponse.data.accessToken;

        onTokenRefresh?.(newToken);

        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
