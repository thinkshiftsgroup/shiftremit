"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TransferData {
  amount?: number;
  convertedNGNAmount?: number;
  fromCurrency?: string;
  toCurrency?: string;
  recipientBankName?: string;
  recipientAccountNumber?: string;
  recipientFullName?: string;
  recipientEmail?: string;
  purpose?: string;
  isRecipientBusinessAccount?: boolean;
  GBPAccountNumber?: string;
  GBPAccountName?: string;
  transferReference?: string;
}

interface TransferStore {
  transfer: TransferData | null;
  setTransfer: (data: TransferData) => void;
  clearTransfer: () => void;
}

export const useTransferStore = create<TransferStore>()(
  persist(
    (set) => ({
      transfer: {},

      setTransfer: (data) =>
        set((state) => ({
          transfer: { ...state.transfer, ...data },
        })),

      clearTransfer: () => set({ transfer: {} }),
    }),
    {
      name: "transfer-data-storage",
    }
  )
);
