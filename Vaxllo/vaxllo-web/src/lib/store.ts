import type { AuthState, SettingsState, User } from "@/types";
import { create } from "zustand";
import { mockUser } from "./mockData";

interface Store extends AuthState, SettingsState {
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  clearAuth: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setNotifications: (notifications: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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
  setNotifications: (notifications: boolean) =>
    set({ notifications }),

  // Mock auth actions
  login: async (email: string, _password: string) => {
    // Mock login - accept any credentials
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ user: { ...mockUser, email }, session: { access_token: "mock_token" } });
    return true;
  },

  register: async (email: string, _password: string) => {
    // Mock register - accept any credentials
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ user: { ...mockUser, email }, session: { access_token: "mock_token" } });
    return true;
  },

  logout: () => {
    set({ user: null, session: null });
  },
}));

