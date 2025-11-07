import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const PEPForm = () => {
  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
          Peps
          <FaCircleQuestion size={16} className="text-[#454745]" />
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          We would like to know a bit about your peps
        </p>
      </div>

      <button className="font-poppins my-3 text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm bg-main/30">
        Add Another pep +
      </button>

      <div className="w-full grid md:grid-cols-3 mb-5 gap-5 shadow-sm p-3 rounded-md">
        <div className="">
          <label className="font-poppins font-semibold text-sm text-[#454745] ">
            Name
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
            Position
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
            PEP Status Description
          </label>
          <input
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            required
          />
        </div>
      </div>

      <hr className="my-4" />
      <button className="font-poppins text-sm border border-[#d1d5db80] text-[#454745] p-2 rounded-sm bg-[#e6e5e5]">
        Save and Add Another PEP +{" "}
      </button>
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <button className="font-poppins text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm bg-main/30">
          I'm Done Adding PEP
        </button>
        <button className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PEPForm;
