"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useRouter } from "next/navigation";

import { FaArrowLeft } from "react-icons/fa6";

const BankDetails = () => {
  const router = useRouter();
  return (
    <SideNav>
      <div className="my-7 relative bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />

        <div className="relative">
          <div
            className="flex items-center my-5 ml-10 font-poppins gap-2 text-base cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft size={16} />
            Back
          </div>

          <div className="my-10 ">
            <h1 className=" text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
              Enter their account details
            </h1>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <p className="text-base font-dm-sans pb-2 text-gray-500 font-medium">
              Recipient's bank details
            </p>

            <hr className="py-2" />

            <div className="space-y-2">
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Bank name
                </label>
                <select
                  name=""
                  id=""
                  className="rounded-md text-base border-[#072032] font-poppins p-2 border w-full mt-1"
                >
                  <option value="">Please choose recipient's bank</option>
                </select>
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Account number
                </label>
                <input
                  type="text"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>{" "}
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Fullname of the account holder
                </label>
                <input
                  type="text"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Their email (optional)
                </label>
                <input
                  type="email"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Purpose
                </label>
                <textarea
                  placeholder="Purpose"
                  className="rounded-md font-poppins text-base h-[100px] border-[#072032] p-2 border w-full mt-1"
                />
              </div>
              <div className="flex justify-end">
                <div className="flex items-center gap-1">
                  <p className="font-poppins text-xs">
                    Is this a business bank account
                  </p>
                  <input type="checkbox" className="accent-main w-3.5 h-3.5" />
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/send-money/fund")}
              className="
    text-white w-full font-poppins border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent my-5 text-center 
  "
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default BankDetails;
