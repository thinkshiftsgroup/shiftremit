import { create } from "zustand";

interface UserProfileData {
  id: string;
  email: string;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  fullName: string;
  profilePhotoUrl?: string;
  userType: "user" | "admin" | "partner";
  gender: string | null;
  dob: Date | null;
  meansOfIdentification: string | null;
  validIDNumber: string | null;
  idDate: Date | null;
  fullAddress: string | null;
  taxNumber: string | null;
  purposeOfShiftremit: string | null;
  alertWhenGbpToNgnDropsBelow: number | null;
  alertWhenNgnToGbpDropsBelow: number | null;
  sendMeNotifs: boolean;
}

export interface User extends UserProfileData {}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  unverifiedEmail: string | null;

  setUnverifiedEmail: (email: string) => void;
  clearUnverifiedEmail: () => void;
  setUser: (user: User) => void;
  login: (token: string, userData: User) => void;
  logout: () => void;
  initializeAuth: () => void;
  setIsInitialized: (initialized: boolean) => void;
}

const AUTH_STORAGE_KEY = "shiftremit_auth_state";
let preloadedAuth: { token: string | null; user: User | null } = {
  token: null,
  user: null,
};

if (typeof window !== "undefined") {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      preloadedAuth = JSON.parse(stored);
      if (preloadedAuth.user && !("biodata" in preloadedAuth.user)) {
        preloadedAuth.user = null;
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: preloadedAuth.user,
  token: preloadedAuth.token,
  isLoggedIn: !!preloadedAuth.token,
  isInitialized: false,
  unverifiedEmail: null,

  setUnverifiedEmail: (email) => set({ unverifiedEmail: email }),
  clearUnverifiedEmail: () => set({ unverifiedEmail: null }),
  setUser: (user) => {
    const updatedState = { user, token: preloadedAuth.token };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedState));
    set(updatedState);
  },

  login: (token, userData) => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ token, user: userData })
    );
    set({ token, user: userData, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ token: null, user: null, isLoggedIn: false, unverifiedEmail: null });
  },

  initializeAuth: () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedState) {
        try {
          const { token, user } = JSON.parse(storedState) as {
            token: string | null;
            user: User | null;
          };

          if (user && "biodata" in user) {
            set({ token, user, isLoggedIn: !!token });
          } else {
            console.warn(
              "Stored user data structure is outdated or invalid. Clearing stored state."
            );
            localStorage.removeItem(AUTH_STORAGE_KEY);
            set({ token: null, user: null, isLoggedIn: false });
          }
        } catch (e) {
          console.error("Failed to parse stored auth state:", e);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    }
    set({ isInitialized: true });
  },
  setIsInitialized: (initialized) => set({ isInitialized: initialized }),
}));
