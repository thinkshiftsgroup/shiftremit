import apiInstance from "@/api/apiInstance";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const getUsers = ({ page, pageSize }: { page: number; pageSize: number }) =>
    useQuery({
      queryKey: ["fetch-users", page, pageSize],
      queryFn: async () => {
        const res = await apiInstance.get(
          `/api/admin/users?page=${page}&pageSize=${pageSize}`
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  return {
    getUsers,
  };
};
