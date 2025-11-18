"use client";
import SideNav from "@/components/dashboard/sideNav";
import { Camera, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import DocUpload from "@/components/account/docUpload";
import DirectorForm from "@/components/account/business-acc/directorForm";
import KnowBusiness from "@/components/account/business-acc/knowBusiness";
import PEPForm from "@/components/account/business-acc/PEPForm";
import ShareHolderForm from "@/components/account/business-acc/shareHoldersForm";
import { useProfileStore, UserProfileData } from "@/stores/useProfileStore";
import { useProfile } from "../useProfile";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import { countriesWithCodes } from "@/data/data";

export interface FormDataState {
  dob: string;
  idDate: string;
  meansOfIdentification: string;
  mobileNumber: string;
  countryOfResidence: string;
  validIDNumber: string;
  fullAddress: string;
  purposeOfShiftremit: string;
}

const BusinessAcc = () => {
  const photoUploadRef = useRef<{ openFileDialog: () => void }>(null);
  const { user: localUser, setUser } = useProfileStore();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const {
    fetchProfile,
    updateBusinessProfile,
    updateProfilePhoto,
    submitKyc,
    getKYCStatus,
    fetchBusinessProfile,
  } = useProfile();

  const { data: kycStatus, isLoading: kycStatusLoad } =
    getKYCStatus("BUSINESS");

  const [formData, setFormData] = useState<FormDataState>({
    dob: "",
    idDate: "",
    countryOfResidence: "",
    mobileNumber: "",
    meansOfIdentification: "ID",
    validIDNumber: "",
    fullAddress: "",
    purposeOfShiftremit: "",
  });

  const user = fetchProfile.data || localUser;

  const [showSuccess, setShowSuccess] = useState(false);

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

  const dateRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isLoading =
    fetchProfile.isLoading ||
    fetchProfile.isFetching ||
    fetchBusinessProfile.isLoading;

  useEffect(() => {
    if (fetchProfile.data && fetchBusinessProfile.data) {
      const u = fetchProfile.data;
      const b = fetchBusinessProfile.data;

      setFormData({
        mobileNumber: b.mobileNumber || "",
        countryOfResidence: b.countryOfResidence || "",
        dob: b.dob ? new Date(b.dob).toISOString().split("T")[0] : "",
        idDate: b.idDate ? new Date(b.idDate).toISOString().split("T")[0] : "",
        meansOfIdentification: b.meansOfIdentification || "ID",
        validIDNumber: b.validIDNumber || "",
        fullAddress: b.fullAddress || "",
        purposeOfShiftremit: b.purposeOfShiftremit || "",
      });

      setUser(u);
    }
  }, [fetchProfile.data, fetchBusinessProfile.data]);

  const handleBusinessForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    const payload = {
      ...formData,
      dob: formData.dob ? new Date(formData.dob).toISOString() : undefined,
      idDate: formData.idDate
        ? new Date(formData.idDate).toISOString()
        : undefined,
    };

    updateBusinessProfile.mutate(payload);
  };

  if (isLoading || kycStatusLoad) {
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

  return (
    <SideNav>
      <div className="relative mb-16">
        <form className="relative" onSubmit={handleBusinessForm}>
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
                      <p>Business Account</p>
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
                {/* <input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
                readOnly
              /> */}
                <div
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 uppercase
    "
                >
                  {user?.firstname}
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="lastname"
                  className="font-poppins font-semibold text-sm text-[#454745] "
                >
                  Last Name*
                </label>

                {/* <input
                id="lastname"
                name="lastname"
                type="text"
                // value={formData.lastname}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
                readOnly
              /> */}
                <div
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 uppercase
    "
                >
                  {user?.lastname}
                </div>
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="middleName"
                  className="font-poppins font-semibold text-sm text-[#454745] "
                >
                  Middle Name
                </label>
                {/* <input
                id="middleName"
                name="middleName"
                type="text"
                value={formData.middlename}
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
                readOnly
              /> */}
                <div
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 uppercase
    "
                >
                  {user?.middlename || "-"}
                </div>
              </div>
              <div className="space-y-3">
                <label className="font-poppins font-semibold text-sm text-[#454745] ">
                  Gender*
                </label>
                <div
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 uppercase
    "
                >
                  {user?.gender}
                </div>
                {/* <div className="relative w-full">
                <select
                  value={formData.gender}
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8
    "
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
              </div> */}
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
                  htmlFor="number"
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
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors"
                  placeholder="e.g. +448012345678"
                  required
                />
              </div>
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
      appearance-none pr-8   /* space for icon */
    "
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
                htmlFor="political"
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
            <div className="flex items-start justify-between mb-3 gap-5 flex-col md:flex-row">
              <div className="space-y-3 w-full">
                <label
                  htmlFor="political"
                  className="font-poppins font-semibold text-sm text-[#454745] "
                >
                  Country of Residency*
                </label>
                <select
                  id="countryOfResidence"
                  name="countryOfResidence"
                  value={formData.countryOfResidence}
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
              <div className="space-y-3 w-full mb-3">
                <label
                  htmlFor="political"
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
            </div>
            <div className="flex items-start md:items-center gap-2 justify-end flex-col md:flex-row">
              <button
                type="submit"
                disabled={
                  updateBusinessProfile.isPending ||
                  kycStatus.data.status === "APPROVED" ||
                  kycStatus.data.status === "PENDING_REVIEW" ||
                  kycStatusLoad
                }
                className=" text-white justify-center font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateBusinessProfile.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Update"
                )}
              </button>
            </div>{" "}
          </div>
        </form>

        <KnowBusiness
          updateBusinessProfile={updateBusinessProfile}
          fetchBusinessProfile={fetchBusinessProfile}
        />
        <DirectorForm fetchBusinessProfile={fetchBusinessProfile} />
        <ShareHolderForm fetchBusinessProfile={fetchBusinessProfile} />
        <PEPForm fetchBusinessProfile={fetchBusinessProfile} />
        <DocUpload fetchBusinessProfile={fetchBusinessProfile} />

        <div
          onClick={() => router.back()}
          className="font-poppins mb-5 py-2 bg-[#e3e3e3] pr-3 rounded-md inline-flex text-sm font-semibold  items-center text-main gap-2 cursor-pointer"
        >
          <ChevronLeft size={25} className="text-main cursor-pointer" />
          Back
        </div>
        {(kycStatus.data.status === "NOT_STARTED" ||
          kycStatus.data.status === "REJECTED") && (
          <div className="bg-white z-9 flex flex-col justify-center fixed bottom-0 left-0 w-full p-3">
            <button
              onClick={() =>
                submitKyc.mutate(
                  { type: "BUSINESS" },
                  {
                    onSuccess: () => {
                      toast.success("Submission for KYC successful");
                      setShowSuccess(true);
                      setTimeout(() => setShowSuccess(false), 3000);
                    },
                  }
                )
              }
              disabled={submitKyc.isPending}
              className="font-poppins text-sm cursor-pointer bg-main text-white p-2 rounded-sm"
            >
              {submitKyc.isPending
                ? "Submitting..."
                : "Submit KYC for Approval"}
            </button>
            {showSuccess && (
              <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
                <FaCircleCheck size={20} className="text-main" />
                Saved
              </div>
            )}
          </div>
        )}
      </div>
    </SideNav>
  );
};

export default BusinessAcc;
