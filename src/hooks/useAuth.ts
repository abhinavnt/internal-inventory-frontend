import { useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";

export const useAuth = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  return auth;
};
