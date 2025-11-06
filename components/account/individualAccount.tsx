import React from "react";
import { FaRegUser } from "react-icons/fa";

const IndividualAccount = () => {
  return (
    <div className="w-full shadow-md rounded-md p-3">
      <div className="grid mb-2 grid-cols-3 gap-3">
        <div className="space-y-3">
          <label
            htmlFor="firstname"
            className="font-poppins font-semibold text-sm "
          >
            First Name*
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>

        <div className="space-y-3">
          <label
            htmlFor="lastname"
            className="font-poppins font-semibold text-sm "
          >
            Last Name*
          </label>

          <input
            id="lastname"
            name="lastname"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="middleName"
            className="font-poppins font-semibold text-sm "
          >
            Middle Name*
          </label>
          <input
            id="middleName"
            name="middleName"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>
        <div className="space-y-3">
          <label className="font-poppins font-semibold text-sm ">Gender*</label>
          <select
            name=""
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            id=""
          >
            <option value="">Male</option>
            <option value="">Female</option>
            <option value="">Others</option>
          </select>
        </div>

        <div className="space-y-3">
          <label htmlFor="dob" className="font-poppins font-semibold text-sm ">
            DOB*
          </label>

          <input
            type="date"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="number"
            className="font-poppins font-semibold text-sm "
          >
            Mobile Number*
          </label>
          <input
            id="number"
            name="number"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>
      </div>
      <div className="space-y-3">
        <label
          htmlFor="political"
          className="font-poppins font-semibold text-sm "
        >
          Political Exposed Person?*
        </label>
        <textarea
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
          required
        />
      </div>
      <div className="space-y-3 my-2">
        <label
          htmlFor="political"
          className="font-poppins font-semibold text-sm "
        >
          Means of Identification*
        </label>
        <div className="flex -space-x-3">
          <select
            name="id"
            className="font-poppins text-sm w-full indent-2 mr-1 mt-2 py-3 pr-10 rounded-sm border-[#454745] text-[#454745] border"
            id="id"
          >
            <option value="">Select</option>
            <option value="">ID</option>
            <option value="">NIN</option>
          </select>
          <input
            id="id"
            name="id"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] bg-main text-white placeholder:text-white border"
            required
            placeholder="Valid ID Number"
          />
          <div className="relative w-full">
            <p className="font-semibold absolute top-5.5 left-2 text-white font-poppins">
              Expires
            </p>
            <input
              id="id"
              name="id"
              type="date"
              className="font-poppins bg-main-dark text-sm w-full indent-16 mt-2 py-3.5 px-2 rounded-sm border-[#454745] text-white border"
              required
              placeholder="Valid ID Number"
            />
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-2">
        <label
          htmlFor="political"
          className="font-poppins font-semibold text-sm "
        >
          Full Address*
        </label>
        <textarea
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
          required
        />
      </div>
      <div className="flex items-center justify-between mb-3 gap-5">
        <div className="space-y-3 w-full">
          <label
            htmlFor="political"
            className="font-poppins font-semibold text-sm "
          >
            Country of Residency*
          </label>
          <input
            id="political"
            name="political"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>
        <div className="space-y-3 w-full">
          <label
            htmlFor="political"
            className="font-poppins font-semibold text-sm "
          >
            TAX Number (optional)
          </label>
          <input
            id="political"
            name="political"
            type="text"
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
            required
          />
        </div>
      </div>
      <div className="space-y-3 mb-3">
        <label
          htmlFor="political"
          className="font-poppins font-semibold text-sm "
        >
          What would you be using ShiftRemit transfers for?*
        </label>
        <textarea
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border-[#454745] text-[#454745] border"
          required
        />
      </div>

      <div className="flex items-center gap-2 justify-between">
        <div className="text-[#979797] flex items-center gap-2 font-poppins">
          <input type="checkbox" className="w-4 h-4 rounded-sm accent-main" />I
          agree to not carry out any form of illegal transactions
        </div>
        <button className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
         Update
        </button>
      </div>
    </div>
  );
};

export default IndividualAccount;
