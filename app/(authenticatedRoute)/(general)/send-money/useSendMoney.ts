import apiInstance from "@/api/apiInstance";
import { TransferData } from "@/stores/useTransaferStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSendMoney = () => {
  const sendTfDetails = useMutation({
    mutationKey: ["send-tf-details"],
    mutationFn: async ({
      amount,
      fromCurrency,
      toCurrency,
      recipientBankName,
      recipientEmail,
      recipientAccountNumber,
      recipientFullName,
      purpose,
      isRecipientBusinessAccount,
      conversionRate,
      sortCode,
    }: TransferData) => {
      const res = await apiInstance.post("/api/bank-transfer/request", {
        amount,
        fromCurrency,
        toCurrency,
        recipientBankName,
        recipientEmail,
        recipientAccountNumber,
        recipientFullName,
        purpose,
        isRecipientBusinessAccount,
        conversionRate,
        sortCode,
      });
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  return {
    sendTfDetails,
  };
};
