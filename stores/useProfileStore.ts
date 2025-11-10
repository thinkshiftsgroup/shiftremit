import { create } from "zustand";

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

const AUTH_STORAGE_KEY = "shiftremit_auth_state";
let preloadedProfile: { token: string | null; user: UserProfileData | null } = {
  token: null,
  user: null,
};

if (typeof window !== "undefined") {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      preloadedProfile.token = parsed.token || null;
      preloadedProfile.user = parsed.user || null;

      if (preloadedProfile.user) {
        if (
          preloadedProfile.user.dob &&
          typeof preloadedProfile.user.dob === "string"
        ) {
          preloadedProfile.user.dob = new Date(preloadedProfile.user.dob);
        }
        if (
          preloadedProfile.user.idDate &&
          typeof preloadedProfile.user.idDate === "string"
        ) {
          preloadedProfile.user.idDate = new Date(preloadedProfile.user.idDate);
        }
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
}

const saveAuthToStorage = (
  token: string | null,
  user: UserProfileData | null
) => {
  const stateToSave = { token, user: JSON.parse(JSON.stringify(user)) };

  if (stateToSave.user) {
    if (stateToSave.user.dob instanceof Date) {
      stateToSave.user.dob = stateToSave.user.dob.toISOString() as any;
    }
    if (stateToSave.user.idDate instanceof Date) {
      stateToSave.user.idDate = stateToSave.user.idDate.toISOString() as any;
    }
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stateToSave));
};

export const useProfileStore = create<ProfileStore>((set) => ({
  user: preloadedProfile.user,
  token: preloadedProfile.token,

  setAuthState: (data) => {
    saveAuthToStorage(data.token, data.user);
    set({ user: data.user, token: data.token });
  },

  setToken: (token) => {
    set((state) => {
      saveAuthToStorage(token, state.user);
      return { token };
    });
  },

  setUser: (data) =>
    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...data } as UserProfileData;
      saveAuthToStorage(state.token, updatedUser);
      return {
        user: updatedUser,
      };
    }),

  clearAuth: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ user: null, token: null });
  },
}));
