"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { initializeAuth } from "./features/AuthSlice";
import { setAuthHandlers } from "@/services/axiosInstance";

function InitAuth({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // connect axios ↔ redux
    setAuthHandlers({
      getAccessToken: () => store.getState().auth.accessToken,
      onTokenRefresh: (token: string) => {
        store.dispatch({
          type: "auth/setToken",
          payload: token,
        });
      },
    });

    // 🔥 THIS WAS MISSING
    store.dispatch(initializeAuth());
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitAuth>{children}</InitAuth>
    </Provider>
  );
}
