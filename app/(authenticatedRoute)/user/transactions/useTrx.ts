import apiInstance from "@/api/apiInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTrx = () => {
  const getBankTrfsUser = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) =>
    useQuery({
      queryKey: ["fetch-bank-tfs-user", page, pageSize],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/bank-transfer/history?page=${page}&pageSize=${pageSize}`
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  // get all trx: admin
  const getBankTrfsAdmin = ({
    page,
    limit,
    status,
    transactionReference,
    // currency,
    startDate,
    endDate,
  }: {
    page: number;
    limit: number;
    status: string;
    transactionReference: string;
    // currency: string;
    startDate: string;
    endDate: string;
  }) =>
    useQuery({
      queryKey: [
        "fetch-bank-tfs-admin",
        page,
        limit,
        status,
        transactionReference,
        // currency,
        startDate, endDate
      ],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/admin/transfers/history?page=${page}&limit=${limit}&status=${status}&transactionReference=${transactionReference}&startDate=${startDate}&endDate=${endDate}
          `
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  const updateTrxStatus = useMutation({
    mutationKey: ["update-trx-status"],
    mutationFn: async ({ status, id }: { status: string; id: string }) => {
      const res = await apiInstance.post(`/api/admin/transfers/${id}/status`, {
        status,
      });
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  return {
    getBankTrfsUser,
    getBankTrfsAdmin,
    updateTrxStatus,
  };
};
