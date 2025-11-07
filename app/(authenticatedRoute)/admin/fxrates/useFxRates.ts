import apiInstance from "@/api/apiInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFxRate = () => {
  interface updateAdminRateI {
    benchmarkGBP: number;
    rateNGN: number;
  }

  const updateAdminRate = useMutation({
    mutationKey: ["update-admin-rates"],
    mutationFn: async (payload: updateAdminRateI) => {
      const res = await apiInstance.put("api/admin/rates", {
        benchmarkGBP: payload.benchmarkGBP,
        rateNGN: payload.rateNGN,
      });
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const getRateHistory = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) =>
    useQuery({
      queryKey: ["fetch-rate-history", page, pageSize], 
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/admin/rates/history?page=${page}&pageSize=${pageSize}`
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  return {
    updateAdminRate,
    getRateHistory,
  };
};
