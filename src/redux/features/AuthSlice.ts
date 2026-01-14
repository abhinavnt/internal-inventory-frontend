import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login, refreshAuth, logout } from "@/services/authServices";

/**
 * USER TYPE
 * Adjust fields if backend adds more later
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin";
}

/**
 * AUTH STATE
 */
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  authChecked: boolean;
  error: string | null;
}

/**
 * INITIAL STATE
 */
const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  authChecked: false,
  error: null,
};

/**
 * LOGIN
 */
export const loginThunk = createAsyncThunk("auth/login", async (data: { email: string; password: string }, { rejectWithValue }) => {
  try {
    return await login(data);
  } catch  {
    return rejectWithValue("Invalid email or password");
  }
});

/**
 * INITIALIZE AUTH (REFRESH TOKEN ON APP LOAD)
 */
export const initializeAuth = createAsyncThunk("auth/initialize", async (_, { rejectWithValue }) => {
  try {
    return await refreshAuth();
  } catch  {
    return rejectWithValue(null);
  }
});

/**
 * LOGOUT
 */
export const logoutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logout();
  } catch  {
    return rejectWithValue("Logout failed");
  }
});

/**
 * AUTH SLICE
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Used by axios interceptor when refresh happens
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    /**
     * Hard clear (optional)
     */
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.authChecked = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------------- LOGIN ---------------- */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      /* -------- INITIALIZE AUTH (REFRESH) -------- */
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.authChecked = false;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.authChecked = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.authChecked = true; // 🔥 VERY IMPORTANT
      })

      /* ---------------- LOGOUT ---------------- */
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.authChecked = true;
      });
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
