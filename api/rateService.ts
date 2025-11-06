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
