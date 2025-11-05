"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useRouter } from "next/navigation";

import { CgArrowRight } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa6";

const BankDetails = () => {
  const router = useRouter();
  return (
    <SideNav>
      <div className="my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />

        <div className="my-10 ">
          <h1 className=" text-3xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Enter their account details
          </h1>
        </div>

        <div className="max-w-xl  mx-auto">
          <p className="text-xs font-dm-sans pb-2 text-gray-500 font-medium">
            Recipient's bank details
          </p>

          <hr className="py-2" />

          <div>
            <label
              className="text-sm font-semibold text-black font-poppins"
              htmlFor=""
            >
              Fullname of the account holder
            </label>
            <input
              type="text"
              className="rounded-md border-black p-2 border w-full mt-1"
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold text-black font-poppins"
              htmlFor=""
            >
              Bank name
            </label>
            <select
              name=""
              id=""
              className="rounded-md border-black p-2 border w-full mt-1"
            >
                <option value=""></option>
            </select>
          </div>
          <div>
            <label
              className="text-sm font-semibold text-black font-poppins"
              htmlFor=""
            >
              Account number
            </label>
            <input
              type="text"
              className="rounded-md border-black p-2 border w-full mt-1"
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold text-black font-poppins"
              htmlFor=""
            >
              Purpose
            </label>
            <textarea className="rounded-md h-[100px] border-black p-2 border w-full mt-1" />
          </div>
        </div>

        <div className="flex justify-end p-5">
          <button
            onClick={() => router.push("/send-money/recipients/bank-details")}
            className="
    text-white font-poppins border border-[#813FD6] text-sm py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
          >
            Next <CgArrowRight />
          </button>
        </div>
      </div>
    </SideNav>
  );
};

export default BankDetails;
