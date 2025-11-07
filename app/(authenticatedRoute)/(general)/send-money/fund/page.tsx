"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useTransferStore } from "@/stores/useTransaferStore";
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
  const [understand, setUnderstand] = useState(false);
  const [bankStep, setBankStep] = useState<1 | 2 | 3>(1);
  const transfer = useTransferStore((state) => state.transfer);
  const clearTransfer = useTransferStore((state) => state.clearTransfer);

  return (
    <SideNav>
      <div className="my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={3} />
        <div className="my-10 ">
          <h1 className=" text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Funding
          </h1>
          <p className="font-poppins text-lg text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <div className="max-w-2xl  mx-auto">
          <div className="rounded-[10px] border border-[#e3e3e3]">
            <div>
              <div className="flex items-center p-3 gap-2 ">
                <input
                  name="send-with"
                  type="radio"
                  checked={method === "bank-transfer"}
                  onChange={() => setMethod("bank-transfer")}
                  className="w-4.5 h-4.5 accent-main"
                />
                <p className="font-poppins text-base font-medium">
                  Send with bank transfer
                </p>
              </div>

              {method === "bank-transfer" && (
                <>
                  {bankStep === 1 && (
                    <div className="p-4 space-y-2 rounded-[10px] border border-[#e3e3e3] m-2">
                      <div className="flex items-center gap-1 font-poppins text-base">
                        <FaCircleCheck className="text-black" size={16} />
                        <p className="font-normal">
                          Transfer{" "}
                          <span className="font-semibold">
                            £{transfer?.amount}{" "}
                          </span>{" "}
                          to be credited to your recipient
                        </p>
                      </div>
                      <div className="flex items-center gap-1 font-poppins text-base">
                        <FaCircleCheck className="text-black" size={16} />
                        <p>
                          Do not save or reuse the account; it can only accept a
                          single transfer
                        </p>
                      </div>
                      <div className="flex items-center gap-1 font-poppins text-base">
                        <FaCircleCheck className="text-black" size={16} />
                        <p>
                          The account expires after{" "}
                          <span className="font-semibold">a fixed period.</span>
                        </p>
                      </div>
                      <div className="flex mt-5 items-center gap-1">
                        <input
                          checked={understand}
                          onChange={(e) => setUnderstand(e.target.checked)}
                          type="checkbox"
                          className="accent-main w-3.5 h-3.5"
                        />{" "}
                        <p className="font-poppins text-sm text-gray-500">
                          I understand these instructions
                        </p>
                      </div>
                      <div className="my-5">
                        <label
                          htmlFor=""
                          className="text-sm font-semibold text-[#072032] font-poppins"
                        >
                          Your Reference (optional)
                        </label>
                        <input
                          type="text"
                          className="rounded-md border-[#e3e3e3] p-2 border w-full mt-1 text-base font-poppins active:border-[#e3e3e3]"
                        />
                      </div>
                      <button
                        disabled={!understand}
                        onClick={() => setBankStep(2)}
                        className="
    text-white font-poppins border disabled:cursor-not-allowed border-[#813FD6] mt-4 text-base py-2 px-3 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342] disabled:from-[#813FD6]/30 disabled:to-[#301342]/30
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
                      <div className="bg-[#FAF7FF] p-3 space-y-1 font-poppins text-sm w-[75%] border rounded-[10px] border-[#E1E1E1]">
                        <p>
                          Transfer{" "}
                          <span className="text-base font-medium">
                            £{transfer?.amount}
                          </span>{" "}
                          to account below using the reference.
                        </p>
                        <p>
                          Account Number:{" "}
                          <span className="text-base font-medium">
                            {transfer?.GBPAccountNumber}
                          </span>
                        </p>
                        <p>
                          Account Name:{" "}
                          <span className="text-base font-medium">
                            {transfer?.GBPAccountName}
                          </span>
                        </p>
                        <p>
                          Use Transfer Reference:{" "}
                          <span className="text-base font-medium">
                            {transfer?.transferReference}
                          </span>
                        </p>

                        <button
                          onClick={() => setBankStep(3)}
                          className="
    text-white text-sm font-poppins border border-[#813FD6] mt-4 py-2 px-3 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
                        >
                          I've made the bank transfer
                        </button>
                      </div>
                      <div className="w-[25%] space-y-1 text-center">
                        <h1 className="font-semibold font-poppins text-base">
                          Your Recipient
                        </h1>
                        <p className="font-poppins text-sm text-black font-normal">
                          {transfer?.recipientFullName}
                        </p>
                        <p className="font-poppins text-sm text-black font-semibold">
                          NGN {transfer?.convertedNGNAmount}
                        </p>
                        <p className="font-poppins text-sm text-black font-normal">
                          {transfer?.recipientBankName}
                        </p>
                        <p className="font-poppins text-sm text-black font-normal">
                          {transfer?.recipientAccountNumber}
                        </p>
                      </div>
                    </div>
                  )}
                  {bankStep === 3 && (
                    <div className="flex m-2 items-center gap-2 justify-between">
                      <div className="bg-[#FAF7FF] p-3 flex flex-col gap-3 justify-between items-center font-poppins text-sm w-[75%] border rounded-[10px] border-[#E1E1E1]">
                        <Loader2 className="animate-spin text-main" size={30} />
                        <p className="font-poppins text-base">
                          Confirming Your Bank Transfer
                        </p>
                        <p className="font-poppins text-xl font-bold ">
                          £{transfer?.amount}
                        </p>
                      </div>
                      <div className="w-[25%]  space-y-1 text-center">
                        <p className="font-poppins text-sm text-black font-semibold">
                          Need Help?
                        </p>
                        <p className="font-poppins text-sm text-black font-semibold">
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
              <p className="font-poppins text-base font-medium">
                Send with bank card
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-5">
          <button
            onClick={() => router.back()}
            className="font-poppins text-base flex items-center gap-2 py-3 px-6 cursor-pointer bg-gray-300 rounded-[6px]"
          >
            <FaArrowLeft size={16} />
            Back
          </button>
          {bankStep === 3 && (
            <button
              onClick={() => {
                router.push("/user/transactions");
                clearTransfer();
              }}
              className="
    text-white font-poppins border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
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
