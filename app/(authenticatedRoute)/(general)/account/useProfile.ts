import apiInstance from "@/api/apiInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserProfileData } from "@/stores/useProfileStore";

interface ProfileUpdatePayload {
  fullName?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  dob?: string;
  meansOfIdentification?: string;
  validIDNumber?: string;
  idDate?: string;
  fullAddress?: string;
  taxNumber?: string;
  purposeOfShiftremit?: string;
}

const PROFILE_QUERY_KEY = ["userProfile"];

export const useProfile = () => {
  const queryClient = useQueryClient();

  const fetchProfile = useQuery<UserProfileData>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await apiInstance.get("/api/profile");

      const data = res.data;
      if (data.dob) data.dob = new Date(data.dob);
      if (data.idDate) data.idDate = new Date(data.idDate);

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const updateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: ProfileUpdatePayload) => {
      const res = await apiInstance.patch("/api/profile", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success("Profile updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    },
  });

  const updateProfilePhoto = useMutation({
    mutationKey: ["update-profile-photo"],
    mutationFn: async (profilePhotoUrl: string) => {
      const res = await apiInstance.patch("/api/profile/photo", {
        profilePhotoUrl,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success("Profile photo updated successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update profile photo."
      );
    },
  });

  return {
    fetchProfile,
    updateProfile,
    updateProfilePhoto,
  };
};
