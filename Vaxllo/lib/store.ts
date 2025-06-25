import { AuthState, SettingsState, User } from "@/types";
import { create } from "zustand";

interface Store extends AuthState, SettingsState {
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  clearAuth: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setNotifications: (notifications: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  // Auth state
  user: null,
  session: null,

  // Settings state
  theme: "system",
  notifications: true,

  // Auth actions
  setUser: (user: User | null) => set({ user }),
  setSession: (session: any | null) => set({ session }),
  clearAuth: () => set({ user: null, session: null }),

  // Settings actions
  setTheme: (theme: "light" | "dark" | "system") => set({ theme }),
  setNotifications: (notifications: boolean) => set({ notifications }),
}));
