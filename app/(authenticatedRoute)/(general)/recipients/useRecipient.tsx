import apiInstance from "@/api/apiInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRecipient = () => {
  const getBanks = useQuery({
    queryKey: ["fetch-banks"],
    queryFn: async () => {
      const res = await apiInstance.get(`/api/verification/banks`);
      return res.data;
    },
  });

  const getBankDetails = ({
    accountNumber,
    bankCode,
  }: {
    accountNumber: string;
    bankCode: string;
  }) =>
    useMutation({
      mutationKey: ["get-bank-details"],
      mutationFn: async () => {
        const res = await apiInstance.post("/api/verification/resolve", {
          accountNumber,
          bankCode,
        });
        return res.data;
      },
      onError: (err: any) => {
        if (
          err?.response?.data?.message ===
          "Could not resolve account name. Check parameters or try again."
        ) {
          toast.error(
            "This account does not exist, check bank name and account number"
          );
        } else {
          toast.error(err.response?.data?.message || "Something went wrong!");
        }
      },
    });

  return {
    getBanks,
    getBankDetails,
  };
};
