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

  const addRecipient = useMutation({
    mutationKey: ["add-recipient"],
    mutationFn: async (payload: any) => {
      const res = await apiInstance.post("/api/recipients", payload);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const deleteRecipient = useMutation({
    mutationKey: ["delete-recipient"],
    mutationFn: async (id: string) => {
      const res = await apiInstance.delete(`/api/recipients/${id}`);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });
  const updateRecipient = useMutation({
    mutationKey: ["update-recipient"],
    mutationFn: async ({ id, payload }: any) => {
      const res = await apiInstance.put(`/api/recipients/${id}`, payload);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  return {
    getBanks,
    getBankDetails,

    addRecipient,
    deleteRecipient,
    updateRecipient
  };
};
