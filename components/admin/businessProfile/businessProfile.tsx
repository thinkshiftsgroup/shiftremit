"use client";
import { FormDataState } from "@/app/(authenticatedRoute)/(general)/account/business-account/page";

import { countriesWithCodes } from "@/data/data";
import { useAdmin } from "@/hooks/useAdmin";

import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import KnowBusiness from "./knowBusiness";

const BusinessProfile = ({ user, isLoading }: any) => {
  const { updateBussProfile } = useAdmin();

  const userDeets = user?.businessAccount;

  const dateRef = useRef<HTMLInputElement>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userDeets) {
      const b = userDeets;

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
    }
  }, [userDeets]);

  const handleBusinessForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      dob: formData.dob ? new Date(formData.dob).toISOString() : undefined,
      idDate: formData.idDate
        ? new Date(formData.idDate).toISOString()
        : undefined,
    };

    try {
      await updateBussProfile.mutateAsync({
        data: payload,
        id: userDeets?.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex font-poppins w-full h-screen items-center justify-center text-lg">
        <div className="flex items-center gap-1">
          <Loader2 size={30} className="text-main animate-spin" />
          Loading profile data...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex font-poppins w-full h-screen items-center justify-center text-lg">
        Failed to load user profile.
      </div>
    );
  }

  return (
    <div>
      <form className="relative" onSubmit={handleBusinessForm}>
        <div className="">
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
          appearance-none pr-8 capitalize
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
          appearance-none pr-8 capitalize
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
          appearance-none pr-8 capitalize
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
          appearance-none pr-8 capitalize
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
                readOnly
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
              readOnly
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
                aria-readonly
                name="countryOfResidence"
                value={formData.countryOfResidence}
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
            <div className="space-y-3 w-full mb-3">
              <label
                htmlFor="political"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                What would you be using ShiftRemit transfers for?*
              </label>
              <textarea
              readOnly
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
              disabled={updateBussProfile.isPending}
              className=" text-white justify-center font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]"
            >
              {updateBussProfile.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update"
              )}
            </button>
          </div>{" "}
        </div>
      </form>

    
    </div>
  );
};

export default BusinessProfile;
