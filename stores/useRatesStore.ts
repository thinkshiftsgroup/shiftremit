import { create } from "zustand";
import { fetchFxRates, FxRateData } from "@/api/rateService";

interface RatesState {
  ratesData: FxRateData | null;
  isLoading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
}

export const useRatesStore = create<RatesState>((set) => ({
  ratesData: null,
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
}));
