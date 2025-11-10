import React, { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const ShareHolderForm = () => {
  const [activeTab, setActiveTab] = useState("individual");

  const renderIndividualForm = () => {
    return (
      <div className="grid md:grid-cols-3 gap-5">
        <div className="">
          <label
            htmlFor="firstname"
            className="font-poppins font-semibold text-sm text-[#454745]"
          >
            First Name*
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745]"
          >
            Last Name*
          </label>

          <input
            id="lastname"
            name="lastname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="dob"
            className="font-poppins font-semibold text-sm text-[#454745]"
          >
            Date of Birth*
          </label>

          <input
            id="dob"
            type="date"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Nationality*
          </label>
          <div className="relative w-full">
            <select
              className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
            >
              <option value="">Select Country</option>
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Identification Document*
          </label>
          <div className="relative w-full">
            <select
              className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
            >
              <option value="">Select Document</option>
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            ID/Passport Number*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Issued Country*
          </label>
          <div className="relative w-full">
            <select
              className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
            >
              <option value="">Select Country</option>
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Residential Address*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Percentage of Shares Owned*
          </label>

          <input
            placeholder="%"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="fileUpload1"
            className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745]"
          >
            Valid ID For Shareholder*
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <label
            htmlFor="fileUpload1"
            className="w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">Choose file to upload (required)</span>
          </label>

          <input
            id="fileUpload1"
            name="fileUpload1"
            type="file"
            className="hidden"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="fileUpload2"
            className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745]"
          >
            Proof of Address*
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <label
            htmlFor="fileUpload2"
            className="w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">Choose file to upload (required)</span>
          </label>

          <input
            id="fileUpload2"
            name="fileUpload2"
            type="file"
            className="hidden"
            required
          />
        </div>

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Tax Number*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
      </div>
    );
  };

  const renderEntityForm = () => {
    return (
      <div className="grid md:grid-cols-3 gap-5">
        <div className="">
          <label
            htmlFor="firstname"
            className="font-poppins font-semibold text-sm text-[#454745]"
          >
            Name*
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Country Of Registration/Incorpration*
          </label>
          <div className="relative w-full">
            <select
              className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
            >
              <option value="">Select Country</option>
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Registration/Incorpration Number*
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>


        {/* <div className="">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm text-[#454745]"
          >
            Last Name*
          </label>

          <input
            id="lastname"
            name="lastname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="dob"
            className="font-poppins font-semibold text-sm text-[#454745]"
          >
            Date of Birth*
          </label>

          <input
            id="dob"
            type="date"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div> */}

        {/* <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Identification Document*
          </label>
          <div className="relative w-full">
            <select
              className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
            >
              <option value="">Select Document</option>
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            ID/Passport Number*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div> 


        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Residential Address*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>*/}

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Percentage of Shares Owned*
          </label>

          <input
            placeholder="%"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>

        {/* <div className="">
          <label
            htmlFor="fileUpload1"
            className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745]"
          >
            Valid ID For Shareholder*
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <label
            htmlFor="fileUpload1"
            className="w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">Choose file to upload (required)</span>
          </label>

          <input
            id="fileUpload1"
            name="fileUpload1"
            type="file"
            className="hidden"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="fileUpload2"
            className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745]"
          >
            Proof of Address*
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>

          <label
            htmlFor="fileUpload2"
            className="w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">Choose file to upload (required)</span>
          </label>

          <input
            id="fileUpload2"
            name="fileUpload2"
            type="file"
            className="hidden"
            required
          />
        </div>

        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Tax Number*
          </label>

          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            required
          />
        </div> */}
      </div >
    );
  };

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
        <p className="font-poppins text-sm mb-4">
          Is this shareholder an individual or a legal entity (Company, NGO,
          etc)
        </p>

        <div className="flex items-center gap-2 flex-col md:flex-row mb-6">
          {/* Individual Tab */}
          <div
            onClick={() => setActiveTab("individual")}
            className={`flex items-center gap-3 md:gap-1 w-full md:w-auto cursor-pointer p-3 rounded-md transition-colors ${activeTab === "individual"
              ? "bg-main/10 border border-main"
              : "border border-[#d1d5db80]"
              }`}
          >
            <input
              type="checkbox"
              checked={activeTab === "individual"}
              onChange={() => setActiveTab("individual")}
              className="w-4 h-4 rounded-sm accent-main cursor-pointer"
            />
            <div>
              <h1 className="font-semibold font-poppins text-[#454745]">
                Natural Person/UBOs
              </h1>
              <p className="text-sm font-dm-sans text-[#454745]">
                This shareholder is an individual
              </p>
            </div>
          </div>

          {/* Legal Entity Tab */}
          <div
            onClick={() => setActiveTab("entity")}
            className={`flex items-center gap-3 md:gap-1 w-full md:w-auto cursor-pointer p-3 rounded-md transition-colors ${activeTab === "entity"
              ? "bg-main/10 border border-main"
              : "border border-[#d1d5db80]"
              }`}
          >
            <input
              type="checkbox"
              checked={activeTab === "entity"}
              onChange={() => setActiveTab("entity")}
              className="w-4 h-4 rounded-sm accent-main cursor-pointer"
            />
            <div>
              <h1 className="font-semibold font-poppins text-[#454745]">
                Legal Entity
              </h1>
              <p className="text-sm font-dm-sans text-[#454745]">
                This shareholder is a legal entity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      {activeTab === "individual" && (
        <div className="space-y-4">
          <p className="font-poppins text-sm font-semibold text-[#454745] mb-4">
            Natural Person/UBOs Form
          </p>
          {renderIndividualForm()}
        </div>
      )}

      {activeTab === "entity" && (
        <div className="space-y-4">
          <p className="font-poppins text-sm font-semibold text-[#454745] mb-4">
            Legal Entity Form
          </p>
          {renderEntityForm()}
        </div>
      )}

      <button className="font-poppins mt-6 text-sm border border-[#d1d5db80] text-[#454745] p-2 rounded-sm bg-[#e6e5e5]">
        Save and Add Another Shareholder +
      </button>
      <hr className="my-4" />
      <div>
        <button className="font-poppins text-sm border border-main text-main p-2 rounded-sm bg-main/30">
          I'm Done Adding Shareholder
        </button>
      </div>
    </div>
  );
};

export default ShareHolderForm;