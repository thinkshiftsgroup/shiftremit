import apiInstance from "@/api/apiInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePassword = () => {
  const updatePassword = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async ({ oldPassword, newPassword }: any) => {
      const res = await apiInstance.patch("/api/profile/change-password", {
        oldPassword,
        newPassword,
      });
      return res.data;
    },

    onError: () => {
      toast.error("Failed to update password");
    },
  });

  return { updatePassword };
};
