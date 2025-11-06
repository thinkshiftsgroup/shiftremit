import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const KnowBusiness = () => {
  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
          Let's Know Your Business
          <FaCircleQuestion size={16} className="text-[#454745]" />
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          Tell us a bit about you & your business
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="">
          <label
            htmlFor="firstname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Business Name*
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

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745] ">
            Company Type*
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
              <option value="male">Select Country</option>
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
        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745] ">
            Business Model*
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
              <option value="male">Select Country</option>
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
        <div className="">
          <label
            htmlFor="firstname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Incorporation Number*
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
        <div className="">
          <label
            htmlFor="dob"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Date of Corporation*
          </label>

          <input
            type="date"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745] ">
            Country of Corporation*
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
              <option value="male">Select Country</option>
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
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins flex items-center gap-1 font-semibold text-sm text-[#454745] "
          >
            Tag Number*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins flex items-center gap-1 font-semibold text-sm text-[#454745] "
          >
            Company Address*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Zip Code*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            State*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            City*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins flex items-center gap-1 font-semibold text-sm text-[#454745] "
          >
            What does your business do?*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins flex items-center gap-1 font-semibold text-sm text-[#454745] "
          >
            Company Website*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
      </div>

      <div className="flex my-4 justify-end">
        <button className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
          Update
        </button>
      </div>
    </div>
  );
};

export default KnowBusiness;
