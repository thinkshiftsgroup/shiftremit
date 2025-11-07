import { create } from "zustand";
import {
  fetchFxRates,
  fetchAdminRate,
  FxRateData,
  AdminRateData,
} from "@/api/rateService";

interface RatesState {
  ratesData: FxRateData | null;
  adminRateData: AdminRateData | null;
  isLoading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
  fetchAdminRate: () => Promise<void>;
}

export const useRatesStore = create<RatesState>((set) => ({
  ratesData: null,
  adminRateData: null,
  isLoading: false,
  error: null,

  fetchRates: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchFxRates();
      set({ ratesData: data, isLoading: false });
    } catch (err) {
      console.error("Error fetching rates:", err);
      set({
        error:
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching rates.",
        isLoading: false,
      });
    }
  },

  fetchAdminRate: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchAdminRate();
      set({ adminRateData: data, isLoading: false });
    } catch (err) {
      console.error("Error fetching admin rate:", err);
      set({
        error:
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching admin rate.",
        isLoading: false,
      });
    }
  },
}));
