import apiInstance from "@/api/apiInstance";
import { useQuery } from "@tanstack/react-query";

export const useTrx = () => {
  const getBankTrfs = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) =>
    useQuery({
      queryKey: ["fetch-bank-tfs", page, pageSize],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/bank-transfer/history?page=${page}&pageSize=${pageSize}`
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  return {
    getBankTrfs,
  };
};
