import apiInstance from "@/api/apiInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserProfileData } from "@/stores/useProfileStore";

interface ProfileUpdatePayload {
  fullName?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  gender?: string;
  dob?: string;
  meansOfIdentification?: string;
  phoneNumber?: string;
  politicalExposure?: string;
  country?: string;
  validIDNumber?: string;
  idDate?: string;
  fullAddress?: string;
  taxNumber?: string;
  purposeOfShiftremit?: string;
}

interface BusinessProfileUpdatePayload {
  dob?: string;
  idDate?: string;
  meansOfIdentification?: string;
  mobileNumber?: string;
  countryOfResidence?: string;
  validIDNumber?: string;
  fullAddress?: string;
  purposeOfShiftremit?: string;

  businessName?: string;
  companyType?: string;
  incorporationNumber?: string;
  dateOfIncorporation?: string;
  countryOfIncorporation?: string;
  taxNumber?: string;
  companyAddress?: string;
  zipCodePostcode?: string;
  city?: string;
  stateProvince?: string;
  whatDoesTheBusinessDo?: string;
  companyWebsite?: string;
}

export interface PepItem {
  id?: string;
  name: string;
  position: string;
  pepStatusDescription: string;
}

export type PepPayload = PepItem[];

export interface Director {
  id?: string;
  firstname: string;
  lastname: string;
  position: string;
  isShareholder: boolean;
  nationality: string;
  identificationDocument: string;
  idNumber: string;
  residentialAddress: string;
  issuedCountry: string;
  dateOfBirth?: string;
  percentageShareholding?: number;
  identificationDocumentProofUrl?: string;
  residentialAddressUrlProof?: string;
  identificationDocumentProofFile?: File;
  residentialAddressUrlProofFile?: File;
}

export interface BaseShareholder {
  id?: string;
  entityType: "NATURAL_PERSON" | "LEGAL_ENTITY";
  percentageSharesOwned: number;
  validIdUrl?: string;
  proofOfAddressUrl?: string;
}

export interface NaturalPersonShareholder extends BaseShareholder {
  entityType: "NATURAL_PERSON";
  firstname: string;
  lastname: string;
  dateOfBirth?: string;
  nationality?: string;
  identificationDocument?: string;
  idNumber?: string;
  issuedCountry?: string;
  residentialAddress?: string;
  taxNumber?: string;
}

export interface LegalEntityShareholder extends BaseShareholder {
  entityType: "LEGAL_ENTITY";
  legalEntityName: string;
  countryOfRegistrationIncorporation: string;
  registrationIncorporationNumber: string;
}

export type Shareholder = NaturalPersonShareholder | LegalEntityShareholder;

const PROFILE_QUERY_KEY = ["userProfile"];
const BUSINESS_PROFILE_QUERY_KEY = ["businessProfile"];

export const useProfile = () => {
  const queryClient = useQueryClient();

  const fetchProfile = useQuery<UserProfileData>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await apiInstance.get("/api/profile");
      const data = res.data.data as UserProfileData;
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
      return res.data.data;
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
      return res.data.data;
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

  const fetchIndividualDocs = useQuery({
    queryKey: ["individual-docs"],
    queryFn: async () => {
      const res = await apiInstance.get("/api/individual-doc");
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to fetch user's documents."
      );
    },
  });

  const updateIndividualDocs = useMutation({
    mutationKey: ["update-indi-docs"],
    mutationFn: async (formData: FormData) => {
      const res = await apiInstance.post(
        "/api/individual-doc/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update user's documents."
      );
    },
  });

  const deleteDoc = useMutation({
    mutationKey: ["delete-doc"],
    mutationFn: async ({ docType }: { docType: string }) => {
      const res = await apiInstance.delete(
        `/api/individual-doc/delete-single/${docType}`
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete document");
    },
  });

  const submitKyc = useMutation({
    mutationKey: ["submit-kyc"],
    mutationFn: async (payload?: { type?: string }) => {
      const type = payload?.type;

      const url = type ? `/api/kyc/submit?type=${type}` : `/api/kyc/submit`;

      const res = await apiInstance.post(url, {});
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message ||
          "Failed to submit KYC as all field and documents are required"
      );
    },
  });

  const getKYCStatus = (type?: string) =>
    useQuery({
      queryKey: ["get-kyc-status", type || null],
      queryFn: async () => {
        const url = type ? `/api/kyc/status?type=${type}` : `/api/kyc/status`;

        const res = await apiInstance.get(url);
        return res.data;
      },
      enabled: true,
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to get KYC status");
      },
    });

  const fetchBusinessProfile = useQuery<BusinessProfileUpdatePayload>({
    queryKey: BUSINESS_PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await apiInstance.get("/api/business-account");
      return res.data as BusinessProfileUpdatePayload;
    },
  });

  const updateBusinessProfile = useMutation({
    mutationKey: ["update-business-profile"],
    mutationFn: async (data: BusinessProfileUpdatePayload) => {
      const res = await apiInstance.put("/api/business-account/details", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUSINESS_PROFILE_QUERY_KEY });
      toast.success("Business Profile updated successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update business profile."
      );
    },
  });

  const updatePEP = useMutation({
    mutationKey: ["update-business-profile"],
    mutationFn: async (data: PepPayload) => {
      const res = await apiInstance.put("/api/business-account/peps", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUSINESS_PROFILE_QUERY_KEY });
      toast.success("PEP updated successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update business profile PEP."
      );
    },
  });

  const deletePEP = useMutation({
    mutationKey: ["delete-pep"],
    mutationFn: async ({ id }: { id: string }) => {
      const res = await apiInstance.delete(`/api/business-account/peps/${id}`);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete pep");
    },
  });

  const updateBusinessDoc = useMutation({
    mutationKey: ["update-business-docs"],
    mutationFn: async (formData: FormData) => {
      const res = await apiInstance.post(
        "/api/business-account/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update business documents."
      );
    },
  });

  const deleteDocForBusiness = useMutation({
    mutationKey: ["delete-doc-business"],
    mutationFn: async ({ docType }: { docType: string }) => {
      const res = await apiInstance.delete(
        `/api/business-account/documents/${docType}`
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete document");
    },
  });
  const updateBusinessDirectors = useMutation({
    mutationKey: ["update-business-director"],
    mutationFn: async (directors: Director[]) => {
      const res = await apiInstance.put(
        "/api/business-account/directors",
        directors
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update business directors."
      );
    },
  });

  const deleteDirector = useMutation({
    mutationKey: ["delete-director"],
    mutationFn: async ({ id }: { id: string }) => {
      const res = await apiInstance.delete(
        `/api/business-account/directors/${id}`
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete directors");
    },
  });

  const updateBusinessShareholder = useMutation({
    mutationKey: ["update-business-stakeholder"],
    mutationFn: async (shareholders: Shareholder[]) => {
      const res = await apiInstance.put(
        "/api/business-account/shareholders",
        shareholders
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update business directors."
      );
    },
  });

  const deleteShareHolder = useMutation({
    mutationKey: ["delete-shareholder"],
    mutationFn: async ({ id }: { id: string }) => {
      const res = await apiInstance.delete(
        `/api/business-account/shareholders/${id}`
      );
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to delete shareholders"
      );
    },
  });

  return {
    fetchProfile,
    updateProfile,
    updateProfilePhoto,

    updateIndividualDocs,
    fetchIndividualDocs,
    deleteDoc,

    submitKyc,
    getKYCStatus,

    fetchBusinessProfile,
    updateBusinessProfile,
    updatePEP,
    deletePEP,

    deleteDocForBusiness,
    updateBusinessDoc,

    updateBusinessDirectors,
    deleteDirector,

    updateBusinessShareholder,
    deleteShareHolder,
  };
};
