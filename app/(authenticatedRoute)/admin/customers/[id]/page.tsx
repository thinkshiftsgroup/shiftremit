"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import SideNav from "@/components/dashboard/sideNav";
import { useCustomers } from "../useCustomers";
import { Camera, Loader2 } from "lucide-react";
import { FormDataState } from "@/app/(authenticatedRoute)/(general)/account/individual-account/page";
import { toast } from "sonner";
import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { ImageUpload } from "@/components/ui/image-upload";
import { UserProfileData } from "@/stores/useProfileStore";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { countriesWithCodes } from "@/data/data";
import DocUpload from "@/components/admin/docUpload";
import { useAdmin } from "@/hooks/useAdmin";
import { FaCircleCheck } from "react-icons/fa6";
import BusinessProfile from "@/components/admin/businessProfile/businessProfile";
import KnowBusiness from "@/components/admin/businessProfile/knowBusiness";
import DirectorForm from "@/components/admin/businessProfile/directorForm";
import BusinessDocUpload from "@/components/admin/businessProfile/docUoload";
import ShareHolderForm from "@/components/admin/businessProfile/shareHolder";
import PEPForm from "@/components/admin/businessProfile/pepForm";
import { Switch } from "@/components/ui/switch";

const CustomerDetails = () => {
  const params = useParams<{ id: string }>();

  const { useUserByID } = useCustomers();
  const {
    updateProfile,
    approveKYC,
    disApproveKYC,
    updateBussProfile,
    approveKYCBizz,
    disApproveKYCBizz,
    verifyUser,
    deleteUser,
  } = useAdmin();
  const { data, isLoading } = useUserByID(params?.id);
  const user = data?.data;
  const userDeets = user?.businessAccount;

  const dateRef = useRef<HTMLInputElement>(null);
  const photoUploadRef = useRef<{ openFileDialog: () => void }>(null);

  const [isVerified, setIsVerified] = useState<boolean>(
    user?.isVerified ?? false
  );

  const [isDeleted, setIsDeleted] = useState<boolean>(user?.isDeleted ?? false);

  const [formData, setFormData] = useState<FormDataState>({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
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

  useEffect(() => {
    if (user && user.id) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        gender: user.gender || "male",
        middlename: user.middlename || "",
        email: user.email || "",
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

      setIsVerified(user?.isVerified ?? false);
      setIsDeleted(user?.isDeleted ?? false);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleProfilePhotoChange = async (urls: string[]) => {
    if (urls.length > 0) {
      const newUrl = urls[0];
      try {
        await updateProfile.mutateAsync({
          data: { profilePhotoUrl: newUrl },
          id: params?.id,
        });
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
      await updateProfile.mutateAsync({ data: payload, id: params?.id });
      toast.success("User Profile updated successfully!");
    } catch (error) {
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const getInitials = (user: UserProfileData) => {
    const fn = user.firstname?.[0] || "";
    const ln = user.lastname?.[0] || "";
    return (fn + ln).toUpperCase() || (user.fullName?.[0] || "").toUpperCase();
  };

  const isUpdating = isFormSubmitting || updateProfile.isPending;
  const [indiprofile, setIndiProfile] = useState(true);

  if (isLoading) {
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

  return (
    <SideNav>
      <div className="w-full bg-white shadow-md my-5  rounded-md p-3">
        <form className=" relative" onSubmit={handleFormSubmit}>
          <div className="">
            <div className="flex items-center justify-between">
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
                    {indiprofile ? (
                      <span className="text-xs text-white p-1 rounded-sm bg-main inline-block font-poppins">
                        <p>Individual Account</p>
                      </span>
                    ) : (
                      <span className="text-xs text-white p-1 rounded-sm bg-main inline-block font-poppins">
                        <p>Business Account</p>
                      </span>
                    )}
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

              <div className="font-poppins flex-col text-main flex text-xs items-center gap-2">
                <div className="flex items-center gap-1">
                  <p>Verify</p>
                  <Switch
                    checked={isVerified}
                    onCheckedChange={(value) => {
                      setIsVerified(value);
                      verifyUser.mutate({
                        data: value,
                        id: params?.id,
                      });
                    }}
                    disabled={verifyUser.isPending}
                    className="
    data-[state=checked]:bg-main
    data-[state=checked]:border-main
    data-[state=unchecked]:bg-gray-300
    [&>span]:data-[state=checked]:bg-white
  "
                  />
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-red-500">Delete</p>
                  <Switch
                    checked={isDeleted}
                    onCheckedChange={(value) => {
                      setIsDeleted(value);
                      deleteUser.mutate({
                        data: value,
                        id: params?.id,
                      });
                    }}
                    disabled={deleteUser.isPending}
                    className="
    data-[state=checked]:bg-main
    data-[state=checked]:border-main
    data-[state=unchecked]:bg-gray-300
    [&>span]:data-[state=checked]:bg-white
  "
                  />
                </div>
              </div>
            </div>

            <div className="w-full border-b flex items-center rounded-sm gap-5 my-3 font-poppins">
              <div
                onClick={() => setIndiProfile(true)}
                className={`cursor-pointer px-2 py-1 flex items-center gap-1 ${
                  indiprofile ? " border-b-2 border-b-main" : ""
                } `}
              >
                <p
                  className={`text-sm font-medium ${
                    indiprofile ? "text-main" : "text-gray-400"
                  }`}
                >
                  Individual Account{" "}
                </p>
                {user?.kycSubmission?.status === "APPROVED" ? (
                  <span className="text-xs text-white p-1 rounded-sm bg-main inline-block font-poppins">
                    <p>verified</p>
                  </span>
                ) : user?.kycSubmission?.status === "REJECTED" ? (
                  <span className="text-xs text-white p-1 rounded-sm bg-red-500 inline-block font-poppins">
                    <p>rejected</p>
                  </span>
                ) : (
                  <span className="text-xs text-white p-1 rounded-sm bg-orange-500 inline-block font-poppins">
                    <p>in review</p>
                  </span>
                )}
              </div>
              <div
                onClick={() => setIndiProfile(false)}
                className={`cursor-pointer px-2 py-1 flex items-center gap-1 ${
                  !indiprofile ? " border-b-2 border-b-main" : ""
                } `}
              >
                <p
                  className={`text-sm font-medium ${
                    !indiprofile ? "text-main" : "text-gray-400"
                  }`}
                >
                  Business Account{" "}
                </p>
                {user?.businessAccount?.kycSubmission?.status === "APPROVED" ? (
                  <span className="text-xs text-white p-1 rounded-sm bg-main inline-block font-poppins">
                    <p>verified</p>
                  </span>
                ) : user?.businessAccount?.kycSubmission?.status ===
                  "REJECTED" ? (
                  <span className="text-xs text-white p-1 rounded-sm bg-red-500 inline-block font-poppins">
                    <p>rejected</p>
                  </span>
                ) : (
                  <span className="text-xs text-white p-1 rounded-sm bg-orange-500 inline-block font-poppins">
                    <p>in review</p>
                  </span>
                )}
              </div>
            </div>

            {indiprofile && (
              <>
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
                      readOnly
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
                      readOnly
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
                      readOnly
                      value={formData.middlename}
                      onChange={handleInputChange}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="font-poppins font-semibold text-sm text-[#454745] "
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={formData.email}
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
                        aria-readonly
                        // onChange={handleInputChange}
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
                      readOnly
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
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      inputMode="tel"
                      pattern="^\+?[0-9]{7,15}$"
                      readOnly
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors"
                      placeholder="e.g. +448012345678"
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
                    readOnly
                    className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                    required
                    placeholder="Someone who holds, or has held, a prominent public position, or is closely related or associated with such a person. "
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
                        <option value="Driver's License">
                          Driver’s License
                        </option>
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
                    readOnly
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
                      aria-readonly
                      value={formData.country}
                      // onChange={handleInputChange}
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
                      readOnly
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
                    readOnly
                    name="purposeOfShiftremit"
                    value={formData.purposeOfShiftremit}
                    onChange={handleInputChange}
                    className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div className="flex items-start md:items-center gap-2 justify-between flex-col md:flex-row">
                  <button
                    type="submit"
                    disabled={isUpdating}
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
              </>
            )}
          </div>
        </form>
        {!indiprofile && <BusinessProfile user={user} isLoading={isLoading} />}
      </div>
      {!indiprofile && (
        <KnowBusiness
          userDeets={userDeets}
          updateBussProfile={updateBussProfile}
        />
      )}{" "}
      {!indiprofile && <DirectorForm userDeets={userDeets} />}
      {!indiprofile && <ShareHolderForm userDeets={userDeets} />}
      {!indiprofile && <PEPForm userDeets={userDeets} />}
      {!indiprofile && (
        <BusinessDocUpload
          userDeets={userDeets}
          updateBussProfile={updateBussProfile}
        />
      )}
      {indiprofile && <DocUpload user={user} isLoading={isLoading} />}
      {indiprofile && (
        <>
          {user?.kycSubmission?.status !== "APPROVED" ? (
            <div className="bg-white w-full p-3 flex flex-col items-center">
              <button
                onClick={() => {
                  user?.kycSubmission?.id
                    ? approveKYC.mutate(
                        { id: user?.kycSubmission?.id },
                        {
                          onSuccess: () => {
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          },
                        }
                      )
                    : toast.error("No individual kyc submission yet");
                }}
                disabled={approveKYC.isPending}
                className="w-full flex justify-center font-poppins text-sm cursor-pointer bg-main text-white p-2 rounded-sm disabled:opacity-50"
              >
                {approveKYC.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Approve Individual KYC"
                )}
              </button>

              {showSuccess && (
                <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
                  <FaCircleCheck size={20} className="text-red-500" />
                  Approved
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full p-3 flex flex-col items-center">
              <button
                onClick={() =>
                  disApproveKYC.mutate(
                    { id: user?.kycSubmission?.id },
                    {
                      onSuccess: () => {
                        setShowSuccess(true);
                        setTimeout(() => setShowSuccess(false), 3000);
                      },
                    }
                  )
                }
                disabled={disApproveKYC.isPending}
                className="w-full font-poppins flex justify-center text-sm cursor-pointer bg-red-500 text-white p-2 rounded-sm disabled:opacity-50"
              >
                {disApproveKYC.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Disapprove Individual KYC"
                )}
              </button>

              {showSuccess && (
                <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
                  <FaCircleCheck size={20} className="text-red-500" />
                  Disapproved
                </div>
              )}
            </div>
          )}
        </>
      )}
      {!indiprofile && (
        <>
          {user?.businessAccount?.kycSubmission?.status !== "APPROVED" ? (
            <div className="bg-white w-full p-3 flex flex-col items-center">
              <button
                onClick={() => {
                  user?.businessAccount?.kycSubmission?.id
                    ? approveKYCBizz.mutate(
                        { id: user?.businessAccount?.kycSubmission?.id },
                        {
                          onSuccess: () => {
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          },
                        }
                      )
                    : toast.error("No business kyc submission yet");
                }}
                disabled={approveKYCBizz.isPending}
                className="w-full flex justify-center font-poppins text-sm cursor-pointer bg-main text-white p-2 rounded-sm disabled:opacity-50"
              >
                {approveKYCBizz.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Approve Business KYC"
                )}
              </button>

              {showSuccess && (
                <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
                  <FaCircleCheck size={20} className="text-main" />
                  Approved
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full p-3 flex flex-col items-center">
              <button
                onClick={() => {
                  user?.businessAccount?.kycSubmission?.id
                    ? disApproveKYCBizz.mutate(
                        { id: user?.businessAccount?.kycSubmission?.id },
                        {
                          onSuccess: () => {
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          },
                        }
                      )
                    : toast.error("No business kyc submission yet");
                }}
                disabled={disApproveKYCBizz.isPending}
                className="w-full font-poppins flex justify-center text-sm cursor-pointer bg-red-500 text-white p-2 rounded-sm disabled:opacity-50"
              >
                {disApproveKYCBizz.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Disapprove Business KYC"
                )}
              </button>

              {showSuccess && (
                <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
                  <FaCircleCheck size={20} className="text-main" />
                  Disapproved
                </div>
              )}
            </div>
          )}
        </>
      )}
    </SideNav>
  );
};

export default CustomerDetails;
