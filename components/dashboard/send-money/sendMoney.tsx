"use client";
import CompareRates from "@/components/landing/hero/compareRates";
import { useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import DashTf from "./dashTransfer";

const SendMoneyUI = () => {
  const [isFiat, setIsFiat] = useState(true);
  const [isBank, setIsBank] = useState(true);

  const [sendAmount, setSendAmount] = useState(100);
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveAmount, setReceiveAmount] = useState(11942.6657);
  const [receiveCurrency, setReceiveCurrency] = useState("BDT");

  return (
    <div className="p-10">
      <DashTf />

      <div className="bg-[#f1f5f9] text-[#454745] rounded-lg p-4 mb-6 font-poppins text-sm space-y-2">
        <div className="flex justify-between">
          <span>Delivery Method</span>
          <div className="*:text-black font-normal *:cursor-pointer flex items-center gap-1 text-sm ">
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
          <span>1 GBP = 1,895.23 NGN</span>
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
          <p className="text-xs opacity-80">Total Amount</p>
          <p className="font-semibold text-lg">1 GBP</p>
        </div>
        <button
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
