import apiInstance from "@/api/apiInstance";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useKyc = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const getVerifications = ({
    page,
    pageSize,
    usernameFilter,
    countryFilter,
    notificationTypeFilter,
  }: {
    page: number;
    pageSize: number;
    usernameFilter?: string;
    countryFilter?: string;
    isDismissed?: boolean | string;
    notificationTypeFilter?: string;
  }) =>
    useQuery({
      queryKey: [
        "get-notif-verif",
        page,
        pageSize,
        usernameFilter,
        countryFilter,
        notificationTypeFilter,
      ],
      queryFn: async () => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());

        if (usernameFilter) params.append("usernameFilter", usernameFilter);
        if (countryFilter) params.append("countryFilter", countryFilter);

        // For booleans, avoid sending null/undefined
        // if (
        //   isDismissed !== undefined &&
        //   isDismissed !== null &&
        //   isDismissed !== ""
        // ) {
        //   params.append("isDismissed", String(isDismissed));
        // }

        if (notificationTypeFilter)
          params.append("notificationTypeFilter", notificationTypeFilter);

        const res = await apiInstance.get(
          `/api/admin/notifications?${params.toString()}`
        );

        return res.data;
      },
      keepPreviousData: true,
    });

  const unreadCount = useQuery({
    queryKey: ["unread-notif"],
    queryFn: async () => {
      const res = await apiInstance.get(
        "/api/admin/notifications/unread-count"
      );
      return res.data;
    },

    enabled: user?.userType === "admin",
  });

  const resolveNotification = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const res = await apiInstance.put(
          `/api/admin/notifications/${id}/dismiss`
        );
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-notif-verif"],
        });
      },
    });

  const markAsRead = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const res = await apiInstance.put(
          `/api/admin/notifications/${id}/read`
        );
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-notif-verif"],
        });
      },
    });

  return {
    getVerifications,
    unreadCount,
    resolveNotification,
    markAsRead,
  };
};
