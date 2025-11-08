import apiInstance from "@/api/apiInstance";
import { useQuery } from "@tanstack/react-query";

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
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) =>
    useQuery({
      queryKey: ["fetch-bank-tfs-admin", page, pageSize],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/admin/transfers/history?page=${page}&pageSize=${pageSize}`
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  return {
    getBankTrfsUser,
    getBankTrfsAdmin,
  };
};
