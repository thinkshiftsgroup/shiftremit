"use client";
import SideNav from "@/components/dashboard/sideNav";
import { Camera, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useProfile } from "../useProfile";
import { useProfileStore, UserProfileData } from "@/stores/useProfileStore";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import IndividualDoc from "@/components/account/individualAcc/docUpload";
import { countriesWithCodes } from "@/data/data";

interface FormDataState {
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  dob: string;
  meansOfIdentification: string;
  phoneNumber: string;
  country: string;
  politicalExposure: string;
  validIDNumber: string;
  idDate: string;
  fullAddress: string;
  taxNumber: string;
  purposeOfShiftremit: string;
}

const IndiAcc = () => {
  const router = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);
  const photoUploadRef = useRef<{ openFileDialog: () => void }>(null);

  const {
    fetchProfile,
    updateProfile,
    updateProfilePhoto,
    fetchIndividualDocs,
    updateIndividualDocs,
    getKYCStatus,
  } = useProfile();
  const kycStatus = getKYCStatus?.data?.data?.status;

  const { user: localUser, setUser } = useProfileStore();
  const [formData, setFormData] = useState<FormDataState>({
    firstname: "",
    lastname: "",
    middlename: "",
    gender: "male",
    dob: "",
    country: "",
    politicalExposure: "",
    phoneNumber: "",
    meansOfIdentification: "ID",
    validIDNumber: "",
    idDate: "",
    fullAddress: "",
    taxNumber: "",
    purposeOfShiftremit: "",
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const user = fetchProfile.data || localUser;
  const isLoading = fetchProfile.isLoading || fetchProfile.isFetching;

  useEffect(() => {
    if (user && user.id) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        gender: user.gender || "male",
        middlename: user.middlename || "",
        politicalExposure: user.politicalExposure || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        idDate: user.idDate
          ? new Date(user.idDate).toISOString().split("T")[0]
          : "",

        meansOfIdentification: user.meansOfIdentification || "ID",
        validIDNumber: user.validIDNumber || "",
        fullAddress: user.fullAddress || "",
        taxNumber: user.taxNumber || "",
        purposeOfShiftremit: user.purposeOfShiftremit || "",
      });
      if (
        fetchProfile.isFetched &&
        fetchProfile.data &&
        fetchProfile.data.id !== localUser?.id
      ) {
        setUser(fetchProfile.data);
      }
    }
  }, [user, fetchProfile.isFetched]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoChange = async (urls: string[]) => {
    if (urls.length > 0) {
      const newUrl = urls[0];
      try {
        await updateProfilePhoto.mutateAsync(newUrl);
        setUser({ profilePhotoUrl: newUrl });
      } catch (error) {}
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    const payload = {
      ...formData,
      dob: formData.dob ? new Date(formData.dob).toISOString() : undefined,
      idDate: formData.idDate
        ? new Date(formData.idDate).toISOString()
        : undefined,
    };

    try {
      const updatedUser = await updateProfile.mutateAsync(payload);
      toast.success("Profile updated successfully!");
      setUser(updatedUser);
    } catch (error) {
    } finally {
      setIsFormSubmitting(false);
    }
  };

  if (isLoading || getKYCStatus.isLoading) {
    return (
      <SideNav>
        <div className="flex font-poppins w-full h-screen items-center justify-center text-lg">
          <div className="flex items-center gap-1">
            <Loader2 size={30} className="text-main animate-spin" />
            Loading profile data...
          </div>
        </div>
      </SideNav>
    );
  }

  if (!user) {
    return (
      <SideNav>
        <div className="flex font-poppins w-full h-screen items-center justify-center text-lg">
          Failed to load user profile.
        </div>
      </SideNav>
    );
  }

  const getInitials = (user: UserProfileData) => {
    const fn = user.firstname?.[0] || "";
    const ln = user.lastname?.[0] || "";
    return (fn + ln).toUpperCase() || (user.fullName?.[0] || "").toUpperCase();
  };

  const isUpdating =
    isFormSubmitting || updateProfile.isPending || updateProfilePhoto.isPending;

  return (
    <SideNav>
      <form className=" relative" onSubmit={handleFormSubmit}>
        <div className="w-full bg-white shadow-md my-10 rounded-md p-3">
          <div className="flex pb-5 items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                onClick={() => photoUploadRef.current?.openFileDialog()}
                className="inline-block relative group cursor-pointer w-24 h-24"
              >
                {user.profilePhotoUrl ? (
                  <img
                    src={user.profilePhotoUrl}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-700">
                    {getInitials(user)}
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-6 h-6" />
                </div>

                <div className="w-5 h-5 bg-main absolute bottom-1 right-1 border-2 border-white rounded-full" />

                <ImageUpload
                  ref={photoUploadRef}
                  onChange={handleProfilePhotoChange}
                  multiple={false}
                  className="hidden"
                  maxFiles={1}
                />
              </div>
              <div>
                <div className="flex items-start md:items-center gap-2 flex-col md:flex-row">
                  <h1 className="font-poppins md:text-2xl font-semibold">
                    {user.fullName ||
                      `${user.firstname || ""} ${user.lastname || ""}`}
                  </h1>
                  <span className="text-xs text-white p-1 rounded-sm bg-main inline-block font-poppins">
                    <p>Individual Account</p>
                  </span>
                </div>
                <div className="flex pt-2 md:items-center gap-2 flex-col md:flex-row">
                  <p className="font-dm-sans text-sm flex items-center gap-1">
                    <MdOutlineEmail size={16} />
                    {user.email}
                  </p>
                  {user?.phoneNumber && (
                    <p className="font-dm-sans text-sm flex items-center gap-1">
                      <FiPhone size={16} />
                      {user?.phoneNumber || ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid mb-2 md:grid-cols-3 gap-3">
            <div className="space-y-3">
              <label
                htmlFor="firstname"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                First Name*
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="lastname"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Last Name*
              </label>

              <input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="middlename"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Middle Name
              </label>
              <input
                id="middlename"
                name="middlename"
                type="text"
                value={formData.middlename}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-3">
              <label className="font-poppins font-semibold text-sm text-[#454745] ">
                Gender*
              </label>
              <div className="relative w-full">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 
    "
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>

                <svg
                  className="absolute right-3 top-8 -translate-y-1/2 pointer-events-none text-[#7A7A7A]"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="dob"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                DOB*
              </label>

              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="phoneNumber"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Mobile Number*
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                inputMode="tel"
                pattern="^\+?[0-9]{7,15}$"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors"
                placeholder="e.g. +2348012345678"
                required
              />
            </div>
          </div>
          <div className="space-y-3">
            <label
              htmlFor="political"
              className="font-poppins font-semibold text-sm text-[#454745] "
            >
              Political Exposed Person?*
            </label>
            <textarea
              id="politicalExposure"
              name="politicalExposure"
              value={formData.politicalExposure}
              onChange={handleInputChange}
              className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="space-y-3 my-2">
            <label
              htmlFor="political"
              className="font-poppins font-semibold text-sm text-[#454745] "
            >
              Means of Identification*
            </label>
            <div className="flex -space-x-3 flex-col md:flex-row">
              <div className="relative w-full">
                <select
                  name="meansOfIdentification"
                  value={formData.meansOfIdentification}
                  onChange={handleInputChange}
                  className="
      font-poppins text-sm w-full mt-2 py-3.5 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 
    "
                  required
                >
                  <option value="Select">Select</option>
                  <option value="ID">National ID Card</option>
                  <option value="Driver's License">Driver’s License</option>
                  <option value="International Passport">
                    International Passport
                  </option>
                  <option value="Voter’s Card">Voter’s Card</option>
                  <option value="Resident Permit / Work Permit">
                    Resident Permit / Work Permit
                  </option>
                </select>

                <svg
                  className="absolute right-3 top-8 -translate-y-1/2 pointer-events-none text-[#7A7A7A]"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </div>
              <input
                id="validIDNumber"
                name="validIDNumber"
                type="text"
                value={formData.validIDNumber}
                onChange={handleInputChange}
                className="font-poppins z-3 text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#d1d5db80] active:border-main bg-main text-white! placeholder:text-white! border"
                required
                placeholder="Valid ID Number"
              />
              <div className="relative z-4 w-full">
                <p className="font-semibold absolute top-5.5 left-2 text-white font-poppins">
                  Expires
                </p>
                <div className="relative w-full">
                  <input
                    id="idDate"
                    name="idDate"
                    ref={dateRef}
                    type="date"
                    value={formData.idDate}
                    onChange={handleInputChange}
                    className="font-poppins bg-main-dark text-sm w-full mt-2 py-3.5 px-2 pr-10 rounded-sm border-[#d1d5db80] text-white! border appearance-none hide-native-calendar"
                    required
                    placeholder="Valid ID Number"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 absolute top-1/2 right-3 -translate-y-1/2 text-white cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => dateRef.current?.showPicker?.()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <style jsx>{`
                  /* Hide native calendar icon in Chrome/Safari/Edge */
                  input.hide-native-calendar::-webkit-calendar-picker-indicator {
                    opacity: 0;
                    display: block;
                    -webkit-appearance: none;
                  }
                `}</style>
              </div>
            </div>
          </div>
          <div className="space-y-3 mb-2">
            <label
              htmlFor="fullAddress"
              className="font-poppins font-semibold text-sm text-[#454745] "
            >
              Full Address*
            </label>
            <textarea
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleInputChange}
              className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-3 gap-5 flex-col md:flex-row">
            <div className="space-y-3 w-full">
              <label
                htmlFor="country"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Country of Residency*
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745]
              focus:border-main focus:outline-none transition-colors bg-white"
                required
              >
                <option value="">Select a Country</option>

                {countriesWithCodes.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3 w-full">
              <label
                htmlFor="taxNumber"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                TAX Number (optional)
              </label>
              <input
                id="taxNumber"
                name="taxNumber"
                type="text"
                value={formData.taxNumber}
                onChange={handleInputChange}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="space-y-3 mb-3">
            <label
              htmlFor="purposeOfShiftremit"
              className="font-poppins font-semibold text-sm text-[#454745] "
            >
              What would you be using ShiftRemit transfers for?*
            </label>
            <textarea
              id="purposeOfShiftremit"
              name="purposeOfShiftremit"
              value={formData.purposeOfShiftremit}
              onChange={handleInputChange}
              className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="flex items-start md:items-center gap-2 justify-between flex-col md:flex-row">
            {/* <div className="text-[#979797] flex items-center gap-2 font-poppins">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-sm accent-main"
                  required
                />
                I agree to not carry out any form of illegal transactions
              </div> */}
            <button
              type="submit"
              disabled={
                isUpdating ||
                kycStatus === "APPROVED" ||
                kycStatus === "PENDING_REVIEW"
              }
              className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>

      <IndividualDoc />
    </SideNav>
  );
};

export default IndiAcc;
