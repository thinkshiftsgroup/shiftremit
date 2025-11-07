import { useMutation } from "@tanstack/react-query";
import apiInstance from "./apiInstance";
import axios from "axios";

export interface SimplifiedRate {
  provider: string;
  rate: number;
  retrievedRelative: string;
  rateRetrievalMessage: string;
}

export interface FxRateData {
  moniepoint: SimplifiedRate;
  nala: SimplifiedRate;
  lemfi: SimplifiedRate;
  sendApp: SimplifiedRate;
}

export interface FxRatesResponse {
  status: "success" | "error";
  data: FxRateData;
}

export const fetchFxRates = async (): Promise<FxRateData> => {
  try {
    const response = await apiInstance.get<FxRatesResponse>("/api/rates");

    if (response.data.status !== "success") {
      throw new Error("Failed to fetch FX rates: Status was not successful.");
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "FX rate fetching failed due to an API error."
      );
    }
    throw new Error(
      "An unexpected network error occurred while fetching FX rates."
    );
  }
};

export interface AdminRateData {
  id: string;
  benchmarkGBP: number;
  rateNGN: number;
  createdAt: string;
  updatedAt: string;
  recordedAt?: string;
}

export interface AdminFxRateResponse {
  success: boolean;
  data: AdminRateData;
}

export const fetchAdminRate = async (): Promise<AdminRateData> => {
  try {
    const response = await apiInstance.get<AdminFxRateResponse>(
      "/api/admin/rates"
    );

    if (!response.data.success) {
      throw new Error(
        "Failed to fetch Admin FX rate: Status was not successful."
      );
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "Admin FX rate fetching failed due to an API error."
      );
    }
    throw new Error(
      "An unexpected network error occurred while fetching admin FX rates."
    );
  }
};
