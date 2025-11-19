import apiInstance from "@/api/apiInstance";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const getUsers = ({
    page,
    pageSize,
    status,
    startDate,
    endDate,
    name,
    orderLabel, 
  }: {
    page: number;
    pageSize: number;
    status?: string | boolean;
    startDate?: string;
    endDate?: string;
    name?: string;
    orderLabel?: string;
  }) =>
    useQuery({
      queryKey: [
        "fetch-users",
        page,
        pageSize,
        status,
        startDate,
        endDate,
        name,
        orderLabel,
      ],
      queryFn: async () => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());

        if (
          status !== "" &&
          status !== undefined &&
          status !== null &&
          status !== "All"
        ) {
          params.append("isVerified", String(status));
        }

        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (name) params.append("name", name);

        // Conditional sort parameters
        switch (orderLabel) {
          case "Newest":
            params.append("sortByDate", "desc");
            break;
          case "Oldest":
            params.append("sortByDate", "asc");
            break;
          case "Amount High to Low":
            params.append("sortByAmount", "desc");
            break;
          case "Amount Low to High":
            params.append("sortByAmount", "asc");
            break;
        }

        const res = await apiInstance.get(
          `/api/admin/users?${params.toString()}`
        );
        return res.data;
      },
      keepPreviousData: true,
    });

  const useUserByID = (id: string) => {
    return useQuery({
      queryKey: ["get-user-by-id", id],
      queryFn: async () => {
        const res = await apiInstance.get(`/api/admin/users/${id}`);
        return res.data;
      },
      enabled: !!id,
    });
  };

  return { getUsers, useUserByID };
};
