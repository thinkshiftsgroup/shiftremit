"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { FaArrowLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Recipients = () => {
  const router = useRouter();
  return (
    <SideNav>
      <div className="my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />
        <div className="my-10 ">
          <h1 className=" text-3xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Recipient
          </h1>
          <p className="font-poppins text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <div className="max-w-xl  mx-auto">
          <div
            onClick={() => router.push("/send-money/recipients/bank-details")}
            className="flex cursor-pointer items-center justify-between py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 512 512"
                  className="text-[#072032]"
                >
                  <path
                    fill="currentColor"
                    d="M271.9 20.2c-9.8-5.6-21.9-5.6-31.8 0l-224 128c-12.6 7.2-18.8 22-15.1 36S17.5 208 32 208h32v208l-51.2 38.4C4.7 460.4 0 469.9 0 480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32c0-10.1-4.7-19.6-12.8-25.6L448 416V208h32c14.5 0 27.2-9.8 30.9-23.8s-2.5-28.8-15.1-36l-224-128zM400 208v208h-64V208zm-112 0v208h-64V208zm-112 0v208h-64V208zm80-112a32 32 0 1 1 0 64a32 32 0 1 1 0-64"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-poppins text-black font-semibold text-sm">
                  Bank Details
                </h1>
                <p className="font-dm-sans text-[#454745] font-medium text-xs">
                  Enter name, bank and account number
                </p>
              </div>
            </div>
            <FaAngleRight size={16} className="" />
          </div>
          <div
            onClick={() => router.push("/send-money/recipients/find")}
            className="flex cursor-pointer items-center justify-between border-t border-t-gray-200 border-b border-b-gray-200 py-3"
          >
            <div className="flex items-start gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="/images/shiftremit-logo.png" alt="" />
              </div>
              <div>
                <h1 className="font-poppins text-black font-semibold text-sm">
                  Find on ShiftRemit
                </h1>
                <p className="font-dm-sans text-[#454745] font-medium text-xs">
                  Find on Shiftremit / search by Shiftremittag, email or mobile
                  number
                </p>
                <div className="rounded-sm px-1 py-0.5 inline-block bg-main/40">
                  <p className="font-dm-sans font-semibold text-[10px] text-main-dark">
                    Instant and convenient
                  </p>
                </div>
              </div>
            </div>
            <FaAngleRight size={16} className="" />
          </div>
          <div className="py-3">
            <h1 className="font-poppins text-xs font-medium mb-5">Recents</h1>
            <div className="flex items-center justify-between gap-5">
              <div className="inline-flex cursor-pointer flex-col items-center gap-2 ">
                <div className="relative ">
                  <div className="w-14 uppercase h-14 bg-gray-200 font-poppins font-semibold text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center ">
                    JS
                  </div>

                  <img
                    src="https://transfermax.springsoftit.com/demo/files/image/currency/67344a3a6f5ee-1731480122.jpg"
                    className="w-5 h-5 border-2 border-white rounded-full absolute -bottom-1 -right-1"
                    alt=""
                  />
                </div>
                <div className=" text-center">
                  <h1 className="text-sm font-poppins font-semibold text-[#072032]">
                    Jason S.
                  </h1>
                  <p className="font-dm-sans text-xs font-medium text-[#454745]">
                    Canbank A...
                  </p>
                </div>
              </div>
              <div className="inline-flex cursor-pointer flex-col items-center gap-2 ">
                <div className="relative ">
                  <div className="w-14 uppercase h-14 bg-gray-200 font-poppins font-semibold text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center ">
                    AI
                  </div>
                  <img
                    src="https://flagcdn.com/ng.svg"
                    className="w-5 h-5 border-2 object-cover border-white rounded-full absolute -bottom-1 -right-1"
                    alt=""
                  />
                </div>
                <div className=" text-center">
                  <h1 className="text-sm font-poppins font-semibold text-[#072032]">
                    Ade I.
                  </h1>
                  <p className="font-dm-sans text-xs font-medium text-[#454745]">
                    Nigbank A...
                  </p>
                </div>
              </div>
              <div className="inline-flex cursor-pointer flex-col items-center gap-2 ">
                <div className="relative ">
                  <div className="w-14 uppercase h-14 bg-gray-200 font-poppins font-semibold text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center ">
                    JS
                  </div>

                  <img
                    src="https://transfermax.springsoftit.com/demo/files/image/currency/67344a3a6f5ee-1731480122.jpg"
                    className="w-5 h-5 border-2 border-white rounded-full absolute -bottom-1 -right-1"
                    alt=""
                  />
                </div>
                <div className=" text-center">
                  <h1 className="text-sm font-poppins font-semibold text-[#072032]">
                    Jason S.
                  </h1>
                  <p className="font-dm-sans text-xs font-medium text-[#454745]">
                    Canbank A...
                  </p>
                </div>
              </div>
              <div className="inline-flex cursor-pointer flex-col items-center gap-2 ">
                <div className="relative ">
                  <div className="w-14 uppercase h-14 bg-gray-200 font-poppins font-semibold text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center ">
                    AI
                  </div>
                  <img
                    src="https://flagcdn.com/ng.svg"
                    className="w-5 h-5 border-2 object-cover border-white rounded-full absolute -bottom-1 -right-1"
                    alt=""
                  />
                </div>
                <div className=" text-center">
                  <h1 className="text-sm font-poppins font-semibold text-[#072032]">
                    Ade I.
                  </h1>
                  <p className="font-dm-sans text-xs font-medium text-[#454745]">
                    Nigbank A...
                  </p>
                </div>
              </div>
              <div className="inline-flex cursor-pointer flex-col items-center gap-2 ">
                <div className="relative ">
                  <div className="w-14 uppercase h-14 bg-gray-200 font-poppins font-semibold text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center ">
                    AI
                  </div>
                  <img
                    src="https://flagcdn.com/ng.svg"
                    className="w-5 h-5 border-2 object-cover border-white rounded-full absolute -bottom-1 -right-1"
                    alt=""
                  />
                </div>
                <div className=" text-center">
                  <h1 className="text-sm font-poppins font-semibold text-[#072032]">
                    Ade I.
                  </h1>
                  <p className="font-dm-sans text-xs font-medium text-[#454745]">
                    Nigbank A...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-5">
          <button
            onClick={() => router.back()}
            className="font-poppins text-sm flex items-center gap-2 py-3 px-6 cursor-pointer bg-gray-300 rounded-[6px]"
          >
            <FaArrowLeft size={16} />
            Back
          </button>
          {/* <button
            
            className="
    text-white font-poppins border border-[#813FD6] text-sm py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
          >
            Next <CgArrowRight />
          </button> */}
        </div>
      </div>
    </SideNav>
  );
};

export default Recipients;
