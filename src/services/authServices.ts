import axiosInstance from "./axiosInstance";

// Register user initiates OTP
export const registerUser = async (data: { identifier: string; password: string; name?: string; dob?: string; city?: string; genres?: string[] }) => {
  const response = await axiosInstance.post(`/auth/register?role=user`, data);
  return response.data;
};

// Login user
export const loginUser = async (data: { identifier: string; password: string }) => {
  const response = await axiosInstance.post(`/auth/login`, data);
  return response.data; // { accessToken, refreshToken, user }
};

// Verify OTP
export const verifyOtpUser = async (data: { identifier: string; otp: string }) => {
  const response = await axiosInstance.post(`/auth/otpverify`, data);
  return response.data; // { accessToken, refreshToken, user } (refreshToken in cookie)
};

// Resend OTP
export const resendOtpUser = async (data: { identifier: string }) => {
  const response = await axiosInstance.post(`/auth/resend-otp`, data);
  return response.data; // { message }
};

export const checkAuthStatus = async () => {
  const response = await axiosInstance.post(`/auth/refresh-token`, {}, { withCredentials: true });
  console.log("response from checkAuthStatus",response);
  
  return response.data; 
};
