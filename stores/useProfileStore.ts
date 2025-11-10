"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const PROFILE_STORAGE_KEY = "shiftremit_auth_state";

export interface UserProfileData {
  id: string;
  email: string;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  middlename: string | null;
  fullName: string;
  profilePhotoUrl: string | null;
  phoneNumber: string | null;
  politicalExposure: string | null;
  country: string | null;
  userType: "user" | "admin" | "partner";
  gender: string | null;
  dob: Date | null;
  meansOfIdentification: string | null;
  validIDNumber: string | null;
  idDate: Date | null;
  fullAddress: string | null;
  taxNumber: string | null;
  purposeOfShiftremit: string | null;
}

interface ProfileStore {
  user: UserProfileData | null;
  token: string | null;
  setUser: (user: Partial<UserProfileData>) => void;
  setToken: (token: string | null) => void;
  setAuthState: (data: {
    user: UserProfileData | null;
    token: string | null;
  }) => void;
  clearAuth: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuthState: (data) =>
        set(() => ({
          user: data.user,
          token: data.token,
        })),

      setToken: (token) => set({ token }),

      setUser: (data) =>
        set((state) => {
          if (!state.user) return state;

          return {
            user: { ...state.user, ...data } as UserProfileData,
          };
        }),

      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: PROFILE_STORAGE_KEY,
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          const json = JSON.parse(str);

          const state = json.state;

          if (state.user?.dob) {
            state.user.dob = new Date(state.user.dob);
          }
          if (state.user?.idDate) {
            state.user.idDate = new Date(state.user.idDate);
          }

          return json;
        },
        setItem: (name, value) => {
          const valueToStore = JSON.parse(JSON.stringify(value));
          const user = valueToStore.state.user;

          if (user) {
            if (user.dob && user.dob instanceof Date) {
              user.dob = user.dob.toISOString();
            }
            if (user.idDate && user.idDate instanceof Date) {
              user.idDate = user.idDate.toISOString();
            }
          }

          localStorage.setItem(name, JSON.stringify(valueToStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
