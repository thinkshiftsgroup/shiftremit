import apiInstance from "@/api/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAdminDash = () => {
  const getDashSumm = useQuery({
    queryKey: ["get-dash-sum"],
    queryFn: async () => {
      const res = await apiInstance.get(`/api/admin/dashboard/summary`);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });
  return {
    getDashSumm,
  };
};
