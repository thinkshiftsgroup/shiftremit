"use client";
import { useState, useEffect } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import Transfer from "./transfer";
import CompareRates from "./compareRates";
import { useRatesStore } from "@/stores/useRatesStore";
import { formatNumber } from "@/helper/utils";

const SideHero = () => {
  const [isBank, setIsBank] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [rateLabelFromTransfer, setRateLabelFromTransfer] = useState("");

  const [sendingAmount, setSendingAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("GBP");

  const {
    ratesData,
    adminRateData,
    isLoading,
    error,
    fetchRates,
    fetchAdminRate,
  } = useRatesStore();

  useEffect(() => {
    if (!ratesData && !adminRateData && !isLoading) {
      fetchRates();
      fetchAdminRate();
    }
  }, [ratesData, isLoading, fetchRates]);

  const handleRateUpdate = (
    label: string,
    amount: string,
    currency: string
  ) => {
    setRateLabelFromTransfer(label);
    setSendingAmount(amount);
    setFromCurrency(currency);
  };

  const totalAmountDisplay =
    sendingAmount === ""
      ? `0 ${fromCurrency}`
      : `${formatNumber(sendingAmount)} ${fromCurrency}`;

  return (
    <div className="w-full lg:w-1/2 font-poppins flex items-center max-h-auto">
      <div
        className={`bg-main-dark-II mb-5 md:mb-3 lg:mb-0 rounded-xl p-4 md:p-6 sm:p-8 text-white shadow-xl lg:border-0 border border-[#ffffff30] ${
          isOpen ? "lg:my-10" : "my-0 lg:mt-20"
        } `}
      >
        <Transfer onRateUpdate={handleRateUpdate} />
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
            </div>
          </div>
          <div className="flex font-poppins justify-between">
            <span>Rate</span>
            <span>
              {isLoading && !ratesData
                ? "Loading..."
                : error
                ? "Error"
                : rateLabelFromTransfer|| "Checking live rates..."}
            </span>
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
            {/* Display the dynamic total amount */}
            <p className="font-semibold text-lg">{totalAmountDisplay}</p>
          </div>
          <a href="/login">
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
          </a>
        </div>

        <CompareRates isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default SideHero;
