"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgArrowRight } from "react-icons/cg";

import { FaArrowLeft } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

const Fund = () => {
  const router = useRouter();
  const [method, setMethod] = useState<"bank-transfer" | "bank-card">(
    "bank-transfer"
  );
  const [bankStep, setBankStep] = useState<1 | 2 | 3>(1);

  return (
    <SideNav>
      <div className="my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={3} />
        <div className="my-10 ">
          <h1 className=" text-3xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Funding
          </h1>
          <p className="font-poppins text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <div className="max-w-xl  mx-auto">
          <div className="rounded-[10px] border border-[#979797]">
            <div>
              <div className="flex items-center p-3 gap-2 ">
                <input
                  name="send-with"
                  type="radio"
                  checked={method === "bank-transfer"}
                  onChange={() => setMethod("bank-transfer")}
                  className="w-4.5 h-4.5 accent-main"
                />
                <p className="font-poppins text-sm font-semibold">
                  Send with bank transfer
                </p>
              </div>

              {method === "bank-transfer" && (
                <>
                  {bankStep === 1 && (
                    <div className="p-4 space-y-2 rounded-[10px] border border-[#979797] m-2">
                      <div className="flex items-center gap-1 font-poppins text-sm">
                        <FaCircleCheck className="text-black" size={16} />
                        <p>
                          Transfer <strong>£5000 </strong> to be credited to
                          your recipient
                        </p>
                      </div>
                      <div className="flex items-center gap-1 font-poppins text-sm">
                        <FaCircleCheck className="text-black" size={16} />
                        <p>
                          Do not save or reuse the account; it can only accept a
                          single transfer
                        </p>
                      </div>
                      <div className="flex items-center gap-1 font-poppins text-sm">
                        <FaCircleCheck className="text-black" size={16} />
                        <p>
                          The account expires after{" "}
                          <strong>a fixed period.</strong>
                        </p>
                      </div>
                      <div className="flex mt-5 items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-main w-3.5 h-3.5"
                        />{" "}
                        <p className="font-poppins text-xs text-[#979797]">
                          I understand these instructions
                        </p>
                      </div>
                      <button
                        onClick={() => setBankStep(2)}
                        className="
    text-white font-poppins border border-[#813FD6] mt-4 text-sm py-2 px-3 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
                      >
                        Send <CgArrowRight />
                      </button>
                    </div>
                  )}
                  {bankStep === 2 && (
                    <div className="flex m-2 items-center gap-2 justify-between">
                      <div className="bg-[#FAF7FF] p-3 space-y-1 font-poppins text-xs w-[75%] border rounded-[10px] border-[#E1E1E1]">
                        <p>
                          Transfer{" "}
                          <span className="text-sm font-bold">£5000</span> to
                          account below using the reference.
                        </p>
                        <p>
                          Account Number:{" "}
                          <span className="text-sm font-bold">07797478</span>
                        </p>
                        <p>
                          Account Name:{" "}
                          <span className="text-sm font-semibold">
                            Prospa Technology Limited
                          </span>
                        </p>
                        <p>
                          Transfer Reference:{" "}
                          <span className="text-sm font-semibold">Sr3454</span>
                        </p>

                        <button
                          onClick={() => setBankStep(3)}
                          className="
    text-white text-xs font-poppins border border-[#813FD6] mt-4 py-2 px-3 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
                        >
                          I've made the bank transfer
                        </button>
                      </div>
                      <div className="w-[25%] space-y-1 text-center">
                        <h1 className="font-semibold font-poppins text-sm">
                          Your Recipient
                        </h1>
                        <p className="font-poppins text-xs text-black font-normal">
                          John Israel
                        </p>
                        <p className="font-poppins text-xs text-black font-normal">
                          NGN 2,000,000
                        </p>
                        <p className="font-poppins text-xs text-black font-normal">
                          Wema Bank
                        </p>
                        <p className="font-poppins text-xs text-black font-normal">
                          7687323332
                        </p>
                      </div>
                    </div>
                  )}
                  {bankStep === 3 && (
                    <div className="flex m-2 items-center gap-2 justify-between">
                      <div className="bg-[#FAF7FF] p-3 flex flex-col gap-3 justify-between items-center font-poppins text-xs w-[75%] border rounded-[10px] border-[#E1E1E1]">
                        <Loader2 className="animate-spin text-main" size={30} />
                        <p className="font-poppins text-xs">
                          Confirming Your Bank Transfer
                        </p>
                        <p className="font-poppins text-base font-bold ">
                          £5000
                        </p>
                      </div>
                      <div className="w-[25%]  space-y-1 text-center">
                        <p className="font-poppins text-xs text-black font-semibold">
                          Need Help?
                        </p>
                        <p className="font-poppins text-xs text-black font-semibold">
                          +44 7852 366172
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <hr />
            <div className="flex items-center p-3 gap-2 ">
              <input
                name="send-with"
                type="radio"
                checked={method === "bank-card"}
                onChange={() => setMethod("bank-card")}
                className="w-4.5 h-4.5 accent-main"
              />
              <p className="font-poppins text-sm font-semibold">
                Send with bank card
              </p>
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
          {bankStep === 3 && (
            <button
              onClick={() => router.push("/customer/transactions")}
              className="
    text-white font-poppins border border-[#813FD6] text-sm py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
            >
              View Transactions <CgArrowRight />
            </button>
          )}
        </div>
      </div>
    </SideNav>
  );
};

export default Fund;
