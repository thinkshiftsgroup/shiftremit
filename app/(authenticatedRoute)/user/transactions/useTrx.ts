import apiInstance from "@/api/apiInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTrx = () => {
  const getBankTrfsUser = ({
    page,
    status,
    transactionReference,
    startDate,
    endDate,
    pageSize,
    senderName,
    sortOrder,
    sortBy,
  }: {
    page: number;
    status: string;
    transactionReference: string;
    startDate: string;
    endDate: string;
    senderName: string;
    pageSize: number;
    sortOrder: string;
    sortBy: string;
  }) =>
    useQuery({
      queryKey: [
        "fetch-bank-tfs-user",
        page,
        pageSize,
        status,
        transactionReference,
        startDate,
        endDate,
        senderName,
        sortOrder,
        sortBy,
      ],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/bank-transfer/history?page=${page}&pageSize=${pageSize}&status=${status}&transactionReference=${transactionReference}&startDate=${startDate}&endDate=${endDate}&senderName=${senderName}&sortOrder=${sortOrder}&sortBy=${sortBy}`
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
    startDate,
    endDate,
    recipientName,
    senderName,
    sortOrder,
    sortBy,
  }: {
    page: number;
    limit: number;
    status: string;
    transactionReference: string;
    startDate: string;
    endDate: string;
    senderName: string;
    recipientName: string;
    sortOrder: string;
    sortBy: string;
  }) =>
    useQuery({
      queryKey: [
        "fetch-bank-tfs-admin",
        page,
        limit,
        status,
        transactionReference,
        startDate,
        endDate,
        recipientName,
        senderName,
        sortOrder,
        sortBy,
      ],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/admin/transfers/history?page=${page}&limit=${limit}&status=${status}&transactionReference=${transactionReference}&startDate=${startDate}&endDate=${endDate}&senderName=${senderName}&recipientName=${recipientName}&sortOrder=${sortOrder}&sortBy=${sortBy}
          `
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  const getBankTrfsUserbyAdmin = ({
    page,
    limit,
    status,
    userId,
    // transactionReference,
    // startDate,
    // endDate,
    // recipientName,
    // senderName,
    sortOrder,
    // sortBy,
  }: {
    page: number;
    limit: number;
    status: string;
    // transactionReference: string;
    // startDate: string;
    // endDate: string;
    // senderName: string;
    // recipientName: string;
    sortOrder: string;
    // sortBy: string;
    userId: string;
  }) =>
    useQuery({
      queryKey: [
        "fetch-bank-tfs-admin",
        page,
        limit,
        status,
        // transactionReference,
        // startDate,
        // endDate,
        // recipientName,
        // senderName,
        sortOrder,
        // sortBy,
        userId,
      ],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/admin/transfers/user/${userId}?page=${page}&limit=${limit}&status=${status}&sortByAmount=${sortOrder}`
          // `/api/admin/transfers/user/${userId}?page=${page}&limit=${limit}&status=${status}&sortOrder=${sortOrder}&sortBy=${sortBy}`
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

  const deleteSingleTrx = useMutation({
    mutationKey: ["update-trx-status"],
    mutationFn: async ({ id }: { id: string }) => {
      const res = await apiInstance.delete(`/api/admin/transfers/${id}`);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const getRecentTrx = ({
    limit,
    name,
    page,
  }: {
    limit?: number;
    name?: string;
    page?: number;
  }) =>
    useQuery({
      queryKey: ["fetch-recent-recipient", limit, name, page],
      queryFn: async () => {
        const params = new URLSearchParams();

        if (limit !== undefined) {
          params.append("pageSize", limit.toString());
        }

        if (name) {
          params.append("name", name);
        }
        if (page) {
          params.append("page", page.toString());
        }

        const queryString = params.toString();
        const url = queryString
          ? `/api/recipients?${queryString}`
          : `/api/recipients`;

        const res = await apiInstance.get(url);
        return res.data;
      },
      keepPreviousData: true,
    });

  return {
    getBankTrfsUser,
    getBankTrfsAdmin,
    updateTrxStatus,

    getBankTrfsUserbyAdmin,

    deleteSingleTrx,
    getRecentTrx,
  };
};
