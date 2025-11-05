"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useRouter } from "next/navigation";

import { FaArrowLeft } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";

const Find = () => {
  const router = useRouter();
  return (
    <SideNav>
      <div className="my-7 relative bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />

        <div className="relative">
          <div
            className="flex items-center absolute top-1 left-1 ml-5 font-poppins gap-2 text-sm cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft size={16} />
            Back
          </div>

          <div className="max-w-xl mx-auto relative my-10">
            <div>
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                <img src="/images/shiftremit-logo.png" alt="" />
              </div>
              <div className="text-center my-5">
                <h1 className=" text-2xl text-[#072032] font-dm-sans text-center font-semibold">
                  Find People and businesses on ShiftRemit
                </h1>
                <p className="font-poppins text-sm text-[#454745] text-center">
                  Enter Shiftremittag, email or mobile number
                </p>
              </div>

              <div className="relative">
                <FiSearch
                  size={20}
                  className="text-[#072032] absolute top-2.5 left-2"
                />
                <input
                  type="text"
                  className="rounded-[10px] indent-5 w-full p-2 border-2 text-sm border-main-dark-II"
                />
                <IoIosCloseCircle
                  size={20}
                  className="text-[#072032] absolute top-2.5 right-2"
                />
              </div>

              <div className="">
                <p className="text-sm mt-10 font-dm-sans pb-2 text-gray-500 font-medium">
                  Personal account
                </p>

                <hr className="py-2" />

                <div className="pb-5">
                  <div className="rounded-lg w-full cursor-pointer p-3 flex items-center gap-2 bg-gray-100">
                    <div className="inline-block relative">
                      <div className="font-poppins border-gray-400 border w-14 h-14 p-2 rounded-full flex justify-center items-center font-bold text-2xl">
                        JI
                      </div>
                      <div className="w-4 h-4 absolute bottom-0 -right-1 border border-white rounded-full">
                        <img src="/images/shiftremit-logo.png" className="object-cover" alt="" />
                      </div>
                    </div>
                    <div className="">
                        <h1 className="font-poppins text-sm font-semibold text-black">Joshua Israel</h1>
                        <p className="text-xs py-0.5 font-dm-sans text-gray-500">joshisr@gmail.com</p>
                        <span className="bg-gray-50 inline-block text-gray-500 font-dm-sans rounded-full p-1 text-xs">
                            <p>@joshisr23</p>
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default Find;
