import { checkAuthStatus, loginUser, registerUser, resendOtpUser, verifyOtpUser } from "@/services/authServices";
import { User } from "@/types/user";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// STATE INTERFACE
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  accessToken: string | null;
  authChecked: boolean;
}

// API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

// ASYNC THUNKS
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (data: { identifier: string; password: string; name?: string; dob?: string; city?: string; genres?: string[] }, { rejectWithValue }) => {
    try {
      await registerUser(data);
      return { identifier: data.identifier };
    } catch (error: unknown) {
      console.log(error);
      return rejectWithValue("Registration failed");
    }
  }
);

//  Login thunk
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (data: { identifier: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginUser(data);
      dispatch(setCredentials({ user: response.user, accessToken: response.accessToken }));
      return response;
    } catch (error: unknown) {
      console.log(error);
      
      return rejectWithValue("Login failed");
    }
  }
);

//  Verify OTP thunk
export const verifyOtpUserThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (data: { identifier: string; otp: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await verifyOtpUser(data);
      dispatch(setCredentials({ user: response.user, accessToken: response.accessToken }));
      return response;
    } catch (error: unknown) {
      console.log(error);
      console.log(error);
      return rejectWithValue("OTP verification failed");
    }
  }
);

// Initialize auth thunk (checks refresh token on load)
export const initializeAuthThunk = createAsyncThunk("auth/initialize", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await checkAuthStatus();
    dispatch(setCredentials({ user: response.user, accessToken: response.accessToken }));
    return response;
  } catch (error: unknown) {
    console.log(error);
    return rejectWithValue(null);
  }
});

//  Resend OTP thunk
export const resendOtpUserThunk = createAsyncThunk("auth/resendOtp", async (data: { identifier: string }, { rejectWithValue }) => {
  try {
    const response = await resendOtpUser(data);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return rejectWithValue("Resend OTP failed");
  }
});

// Refresh Token
export const refreshAuthToken = createAsyncThunk("auth/refresh-token", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/refresh-token`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("Failed to refresh token");
  }
});

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${apiUrl}/api/auth/logout`, null, { withCredentials: true });
  } catch (error) {
    console.error("Failed to log out:", error);
    return rejectWithValue("Failed to log out");
  }
});

// INITIAL STATE
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  error: null,
  status: "idle",
  authChecked: false,
};

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(verifyOtpUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(resendOtpUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      //  Handle initialization
      .addCase(initializeAuthThunk.fulfilled, (state) => {
        state.authChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(initializeAuthThunk.rejected, (state) => {
        state.authChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { setCredentials, clearUser, updateUser, updateToken } = authSlice.actions;
export default authSlice.reducer;
