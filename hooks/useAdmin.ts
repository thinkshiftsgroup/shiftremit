import apiInstance from "@/api/apiInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const changeFileStatus = useMutation({
    mutationKey: ["change-status"],
    mutationFn: async ({
      userId,
      docType,
      status,
    }: {
      userId: string;
      docType: string;
      status: string;
    }) => {
      const res = await apiInstance.patch(
        `/api/admin/users/${userId}/document-status`,
        { docType, status }
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
    },

    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const updateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async ({ data, id }: any) => {
      const res = await apiInstance.patch(`/api/admin/users/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("Profile updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    },
  });

  const approveKYC = useMutation({
    mutationKey: ["approve-kyc"],
    mutationFn: async ({ id }: any) => {
      const res = await apiInstance.put(
        `/api/admin/kyc/individual/${id}/approve`
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("KYC approved successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to approve kyc.");
    },
  });

  const disApproveKYC = useMutation({
    mutationKey: ["disapprove-kyc"],
    mutationFn: async ({ id }: any) => {
      const res = await apiInstance.put(
        `/api/admin/kyc/individual/${id}/reject`
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("KYC rejected!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to reject kyc.");
    },
  });

  const updateBussProfile = useMutation({
    mutationKey: ["update-buss-profile"],
    mutationFn: async ({ data, id }: any) => {
      const res = await apiInstance.patch(
        `/api/admin/users/${id}/business-account-details`,
        data
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("Business Profile updated successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update business profile."
      );
    },
  });

  const changeBussFileStatus = useMutation({
    mutationKey: ["change-buss-status"],
    mutationFn: async ({
      userId,
      docType,
      status,
    }: {
      userId: string;
      docType: string;
      status: string;
    }) => {
      const res = await apiInstance.patch(
        `/api/admin/users/${userId}/business-document-status`,
        { docType, status }
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
    },

    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const approveKYCBizz = useMutation({
    mutationKey: ["approve-kyc-bizz"],
    mutationFn: async ({ id }: any) => {
      const res = await apiInstance.put(
        `/api/admin/kyc/business/${id}/approve`
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("Business KYC approved successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to approve business kyc."
      );
    },
  });

  const disApproveKYCBizz = useMutation({
    mutationKey: ["disapprove-kyc"],
    mutationFn: async ({ id }: any) => {
      const res = await apiInstance.put(`/api/admin/kyc/business/${id}/reject`);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("Business KYC rejected!");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to reject business kyc."
      );
    },
  });

  const verifyUser = useMutation({
    mutationKey: ["verify-user"],
    mutationFn: async ({ data, id }: any) => {
      const res = await apiInstance.patch(`/api/admin/users/${id}/verify`, {
        isVerified: data,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("Verification updated!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to verify user.");
    },
  });
  
  const deleteUser = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async ({ data, id }: any) => {
      const res = await apiInstance.patch(
        `/api/admin/users/${id}/soft-delete`,
        {
          isDeleted: data,
        }
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      toast.success("Delete status updated!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete user.");
    },
  });

  return {
    changeFileStatus,
    updateProfile,
    approveKYC,
    disApproveKYC,
    updateBussProfile,
    changeBussFileStatus,
    disApproveKYCBizz,
    approveKYCBizz,

    verifyUser,
    deleteUser,
  };
};
