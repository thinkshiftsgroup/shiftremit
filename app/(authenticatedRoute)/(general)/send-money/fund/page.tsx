"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useTransferStore } from "@/stores/useTransaferStore";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { toast } from "sonner";
import { useSendMoney } from "../useSendMoney";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

import { formatNumber } from "@/helper/utils";

import { useRatesStore } from "@/stores/useRatesStore";
const Fund = () => {
  const router = useRouter();
  const [method, setMethod] = useState<"bank-transfer" | "bank-card">(
    "bank-transfer"
  );
  const [understand, setUnderstand] = useState(false);
  const [bankStep, setBankStep] = useState<1 | 2 | 3>(1);
  const [userReference, setUserReference] = useState("");

  const transfer = useTransferStore((state) => state.transfer);
  const { setTransfer, clearTransfer } = useTransferStore();
  const { sendTfDetails } = useSendMoney();
  const moniepointRate = useRatesStore(
    (state) => state.ratesData?.moniepoint?.rate
  );
  const benchmarkGBPToNGN = useRatesStore(
    (state) => state.adminRateData?.benchmarkGBP
  );
  const handleSendTransfer = () => {
    const rate1 = moniepointRate ?? 0;
    const rate2 = benchmarkGBPToNGN ?? 0;
    const convertedRate = rate1 + rate2;
    setTransfer({ userReference: userReference });
    console.log(convertedRate);
    sendTfDetails.mutate(
      {
        amount: transfer?.amount,
        fromCurrency: "GBP",
        toCurrency: "NGN",
        recipientBankName: transfer?.recipientBankName,
        recipientEmail: transfer?.recipientEmail,
        recipientAccountNumber: transfer?.recipientAccountNumber,
        recipientFullName: transfer?.recipientFullName,
        purpose: transfer?.purpose,
        isRecipientBusinessAccount: transfer?.isRecipientBusinessAccount,
        conversionRate: convertedRate,
        userReference: userReference,
      },
      {
        onSuccess: (data) => {
          setTransfer({
            transferReference: data?.transferReference,
            GBPAccountNumber: data?.GBP_Payment_Details?.GBPAccountNumber,
            GBPAccountName: data?.GBP_Payment_Details?.GBPAccountName,
          });

          toast.success(data?.message, {
            description: "Your transfer has been initiated successfully.",
          });

          setBankStep(2);
        },
        onError: (error) => {
          toast.error("Transfer initiation failed", {
            description: error.message || "Please try again later.",
          });
        },
      }
    );
  };

  return (
    <SideNav>
      <div className="my-3 md:my-7 bg-white rounded-lg mx-auto px-3 ">
        <SendSteps step={3} />
        <div className="my-10 ">
          <h1 className="text-2xl md:text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Funding
          </h1>
          <p className="font-poppins text-lg text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <div className=" mx-auto">
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
                            £{formatNumber(transfer?.amount!)}{" "}
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
                      </div>{" "}
                      <div className="flex items-start  gap-1 font-poppins text-base">
                        <FaCircleCheck
                          className="text-black mr-1 flex-none mt-1"
                          size={16}
                        />
                        <p>
                          Ensure the account used to fund this transfer matches
                          your legal name verified on Shiftremit
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
                          value={userReference}
                          onChange={(e) => setUserReference(e.target.value)}
                          type="text"
                          className="rounded-md border-[#e3e3e3] p-2 border w-full mt-1 text-base font-poppins active:border-[#e3e3e3]"
                        />
                      </div>
                      <button
                        disabled={!understand || sendTfDetails.isPending}
                        onClick={handleSendTransfer}
                        className="
    text-white font-poppins border disabled:cursor-not-allowed border-[#813FD6] mt-4 text-base py-2 px-3 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342] disabled:from-[#813FD6]/30 disabled:to-[#301342]/30
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
                      >
                        {sendTfDetails.isPending ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <>
                            Send <CgArrowRight />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  {bankStep === 2 && (
                    <div className="flex m-2 items-center gap-2 justify-between">
                      <div className="bg-[#FAF7FF] p-3 space-y-1 font-poppins text-sm w-[75%] border rounded-[10px] border-[#E1E1E1]">
                        <p>
                          Transfer{" "}
                          <span className="text-base font-medium">
                            £{formatNumber(transfer?.amount!)}
                          </span>{" "}
                          to account below using the reference.
                        </p>
                        <p>
                          Account Number:{" "}
                          <span className="text-base font-medium">
                            87812060
                          </span>
                        </p>
                        <p>
                          Account Name:{" "}
                          <span className="text-base font-medium">
                            {transfer?.GBPAccountName}
                          </span>
                        </p>
                        <p>
                          Sort Code:{" "}
                          <span className="text-base font-medium">
                            04-00-05
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
                          NGN {formatNumber(transfer?.convertedNGNAmount!)}
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
                          £{formatNumber(transfer?.amount!)}
                        </p>
                      </div>
                      <div className="w-[25%]  space-y-1 text-center">
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
