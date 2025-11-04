"use client";
import { useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import Transfer from "./transfer";

const SideHero = () => {
  const [isFiat, setIsFiat] = useState(true);
  const [isBank, setIsBank] = useState(true);

  const [sendAmount, setSendAmount] = useState(100);
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveAmount, setReceiveAmount] = useState(11942.6657);
  const [receiveCurrency, setReceiveCurrency] = useState("BDT");

  return (
    <div className="bg-main-dark-II w-[55%] rounded-xl p-6 sm:p-8 text-white shadow-xl">
      {/* <h2 className="text-center font-semibold font-poppins text-lg mb-4">
        Get Started
      </h2> */}

      {/* <div className="w-full flex justify-center my-5">
        <span className="bg-[#ffffff0d] p-1 inline-flex rounded-md items-center">
          <p
            onClick={() => setIsFiat(true)}
            className={`text-white  text-sm w-[114px] cursor-pointer text-center font-poppins font-medium px-5 py-1.5 rounded-md ${
              isFiat ? "bg-main" : ""
            }`}
          >
            Fiat
          </p>
          <p
            onClick={() => setIsFiat(false)}
            className={`text-white  text-sm w-[114px] cursor-pointer text-center font-poppins font-medium px-5 py-1.5 rounded-md ${
              !isFiat ? "bg-main" : ""
            }`}
          >
            Crypto
          </p>
        </span>
      </div> */}
      <Transfer />

      <div className="bg-[#ffffff0d] text-[#cccccc] rounded-lg p-4 mb-6 font-poppins text-sm space-y-2">
        <div className="flex justify-between">
          <span>Delivery Method</span>
          <div className="*:text-white font-normal *:cursor-pointer flex items-center gap-1 text-sm ">
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
            {/* <p
              onClick={() => setIsBank(false)}
              className={`border relative ${
                !isBank ? "border-main" : "border-white"
              } rounded-sm p-1`}
            >
              {!isBank && (
                <span className="bg-main text-white rounded-full inline-flex items-center justify-center w-3.5 h-3.5 absolute -top-2 -right-2">
                  <IoIosCheckmark size={14} />
                </span>
              )}
              BKash
            </p> */}
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

      <div className="flex font-poppins justify-between items-center">
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

export default SideHero;
