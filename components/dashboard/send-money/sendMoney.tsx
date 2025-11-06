"use client";
import CompareRates from "@/components/landing/hero/compareRates";
import { useState, useEffect } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { IoIosCheckmark } from "react-icons/io";
import DashTf from "./dashTransfer";
import { useRouter } from "next/navigation";
import { useRatesStore } from "@/stores/useRatesStore";

const SendMoneyUI = () => {
  const [isBank, setIsBank] = useState(true);

  const router = useRouter();

  const { ratesData, isLoading, error, fetchRates } = useRatesStore();

  useEffect(() => {
    if (!ratesData && !isLoading) {
      fetchRates();
    }
  }, [ratesData, isLoading, fetchRates]);

  const moniepointRate = ratesData?.moniepoint?.rate || 0;

  const shiftRemitRate = moniepointRate + 8;

  const rateDisplay =
    shiftRemitRate > 20
      ? `1 GBP = ${shiftRemitRate.toFixed(2)} NGN`
      : isLoading
      ? "Fetching rate..."
      : error
      ? "Rate error"
      : "1 GBP = 0.00 NGN";

  return (
    <div className="p-10">
      <DashTf />

      <div className="bg-[#f1f5f9] text-[#454745] rounded-lg p-4 mb-6 font-poppins text-base space-y-2">
        <div className="flex justify-between">
          <span>Delivery Method</span>
          <div className="*:text-black font-normal *:cursor-pointer flex items-center gap-1 text-base ">
            <p
              onClick={() => setIsBank(true)}
              className={`border relative ${
                isBank ? "border-main" : "border-white"
              } rounded-sm p-1`}
            >
              {isBank && (
                <span className="bg-main text-white rounded-full inline-flex items-center justify-center w-3.5 h-3.5 absolute -top-2 -right-2">
                  <IoIosCheckmark size={14} />
                </span>
              )}
              Bank
            </p>
          </div>
        </div>
        <div className="flex font-poppins justify-between">
          <span>Rate</span>
          <span>{rateDisplay}</span>
        </div>
        <div className="flex justify-between">
          <span>Send Fee</span>
          <span>0.00 GBP</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Time</span>
          <span>2 minutes</span>
        </div>
      </div>
      <hr />
      <div className="flex font-poppins mt-5 justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Total Amount</p>
          <p className="font-semibold text-xl">1 GBP</p>
        </div>
        <button
          onClick={() => router.push("/send-money/recipients")}
          className="
    text-base text-white font-poppins border border-[#813FD6] py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
        >
          Send Now <CgArrowTopRight />
        </button>
      </div>
    </div>
  );
};

export default SendMoneyUI;
