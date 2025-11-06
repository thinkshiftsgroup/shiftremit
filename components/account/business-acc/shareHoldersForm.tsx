import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const ShareHolderForm = () => {
  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
          Shareholders
          <FaCircleQuestion size={16} className="text-[#454745]" />
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          We would like to know a bit about your shareholders
        </p>
      </div>

      <div>
        <p className="font-poppins text-sm">
          Is this shareholder an individual or a legal entity (Company, NGO,
          etc)
        </p>
        <div className="flex items-center my-6 gap-2">
          <div className="text-[#454745] flex items-start gap-1">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 rounded-sm accent-main"
            />
            <div>
              <h1 className="font-semibold font-poppins">
                Natural Person/UBOs
              </h1>
              <p className="text-sm font-dm-sans">
                This shareholder is an individual
              </p>
            </div>
          </div>
          <div className="text-[#454745] flex items-start gap-1">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 rounded-sm accent-main"
            />
            <div>
              <h1 className="font-semibold font-poppins">Legal Entity</h1>
              <p className="text-sm font-dm-sans">
                This shareholder is an legal entity
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="">
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

        <div className="">
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
        {/* <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Position*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div> */}
        <div className="">
          <label
            htmlFor="dob"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Date of Birth*
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
            Nationality*
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
            Identification Document*
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
              <option value="male"></option>
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
            ID/Passport Number*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745] ">
            Issued Country*
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
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Residential Address*
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
            Percentage of Shares Owned*
          </label>

          <input
            placeholder="%"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="fileUpload"
            className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745] "
          >
            Valid ID For Shareholder*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <label
            htmlFor="fileUpload"
            className="
      w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-between
      hover:border-main transition-colors
    "
          >
            <span className="opacity-80">Choose file to upload (required)</span>
          </label>

          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="hidden"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="fileUpload"
            className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745] "
          >
            Proof of Address*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <label
            htmlFor="fileUpload"
            className="
      w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-between
      hover:border-main transition-colors
    "
          >
            <span className="opacity-80">Choose file to upload (required)</span>
          </label>

          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="hidden"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Tax Number*
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
      </div>

      <button className="font-poppins text-sm border border-[#d1d5db80] text-[#454745] p-2 rounded-sm bg-[#e6e5e5]">
        Save and Add Another Shareholder +{" "}
      </button>
      <hr className="my-4" />
      <div>
        <button className="font-poppins text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm bg-main/30">
          I'm Done Adding Shareholder
        </button>
      </div>
    </div>
  );
};

export default ShareHolderForm;
