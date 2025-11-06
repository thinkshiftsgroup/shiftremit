"use client";
import SideNav from "@/components/dashboard/sideNav";
import { Camera, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const BusinessAcc = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleImageSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const openFilePicker = () => fileRef.current?.click();
  const dateRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <SideNav>
      <div className="relative mb-16">
        <div className="w-full bg-white shadow-md my-10 rounded-md p-3">
          <div className="flex pb-5 items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                onClick={openFilePicker}
                className="inline-block relative group cursor-pointer w-24 h-24"
              >
                {image ? (
                  <img
                    src={image}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-700">
                    JI
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-6 h-6" />
                </div>

                <div className="w-5 h-5 bg-main absolute bottom-1 right-1 border-2 border-white rounded-full" />

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-poppins text-2xl font-semibold">
                    Joshua Israel
                  </h1>
                  <span className="text-xs text-white p-1 rounded-sm bg-main inline-block font-poppins">
                    <p>Business Account</p>
                  </span>
                </div>
                <div className="flex pt-2 items-center gap-2">
                  <p className="font-dm-sans text-sm flex items-center gap-1">
                    <MdOutlineEmail size={16} />
                    josh****el@gmail.com
                  </p>
                  <p className="font-dm-sans text-sm flex items-center gap-1">
                    <FiPhone size={16} />
                    +447***9597
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid mb-2 grid-cols-3 gap-3">
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
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="middleName"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Middle Name*
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="font-poppins font-semibold text-sm text-[#454745] ">
                Gender*
              </label>
              <div className="relative w-full">
                <select
                  className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8   /* space for icon */
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
                type="date"
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
                id="number"
                name="number"
                type="text"
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
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
            <div className="flex -space-x-3">
              <div className="relative w-full">
                <select
                  className="
      font-poppins text-sm w-full mt-2 py-3.5 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8   /* space for icon */
    "
                >
                  <option value="male">Select</option>
                  <option value="female">ID</option>
                  <option value="others">NIN</option>
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
                id="id"
                name="id"
                type="text"
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
                    id="id"
                    ref={dateRef}
                    name="id"
                    type="date"
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
              className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="flex items-start justify-between mb-3 gap-5">
            <div className="space-y-3 w-full">
              <label
                htmlFor="political"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Country of Residency*
              </label>
              <input
                id="political"
                name="political"
                type="text"
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-3 w-full mb-3">
              <label
                htmlFor="political"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                What would you be using ShiftRemit transfers for?*
              </label>
              <textarea
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="text-[#979797] flex items-center gap-2 font-poppins">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm accent-main"
              />
              I agree to not carry out any form of illegal transactions
            </div>
            <button className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
              Update
            </button>
          </div>{" "}
          <div
            onClick={() => router.back()}
            className="font-poppins bg-[#e3e3e3] pr-3 rounded-md inline-flex text-sm font-semibold  items-center text-main gap-2 cursor-pointer"
          >
            <ChevronLeft size={25} className="text-main cursor-pointer my-2" />
            Back
          </div>
        </div>

        <div className="bg-white flex flex-col justify-center fixed bottom-0 left-0 w-full p-3">
          <button className="font-poppins text-sm cursor-pointer bg-main text-white p-2 rounded-sm">
            Submit KYC for approval
          </button>
          <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
            <FaCircleCheck size={20} className="text-main" />
            Saved
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default BusinessAcc;
