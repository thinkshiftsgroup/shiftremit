"use client";
import { useEffect, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import DropdownComponent from "./dropDown";
import { useState } from "react";
import { useRatesStore } from "@/stores/useRatesStore";
const Transfer = () => {
  const [sending_amount, setSendingAmount] = useState("1");
  const [receive_amount, setReceiveAmount] = useState("");

  const { ratesData, isLoading } = useRatesStore();

  const moniepointRate = ratesData?.moniepoint?.rate || 0;
  const conversionRate = moniepointRate + 8;
  const isRateReady = conversionRate > 8 && !isLoading;

  const initialReceiveAmount = useMemo(() => {
    if (isRateReady) {
      const initialAmount = parseFloat(sending_amount);
      return (initialAmount * conversionRate).toFixed(2);
    }
    return "";
  }, [conversionRate, isRateReady, sending_amount]);

  useEffect(() => {
    if (isRateReady && receive_amount === "") {
      setReceiveAmount(initialReceiveAmount);
    }
  }, [isRateReady, initialReceiveAmount, receive_amount]);

  const handleSendingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSendingAmount(value);

    const amount = parseFloat(value);
    if (!isNaN(amount) && isRateReady) {
      const received = amount * conversionRate;
      setReceiveAmount(received.toFixed(2));
    } else if (value === "") {
      setReceiveAmount("");
    }
  };

  const handleReceiveAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setReceiveAmount(value);

    const amount = parseFloat(value);
    if (!isNaN(amount) && isRateReady) {
      const sent = amount / conversionRate;
      setSendingAmount(sent.toFixed(2));
    } else if (value === "") {
      setSendingAmount("");
    }
  };

  return (
    <>
      <div className="relative flex flex-wrap justify-between items-start mb-4 gap-5 md:gap-0">
        <div className="w-full md:w-[calc(50%-16px)] ">
          <label className="text-[#ccc] text-sm font-medium block mb-2">
            You send exactly
          </label>
          <div
            className="flex relative  items-center justify-between md:justify-start gap-5.5 border border-[#ffffff3d] ps-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="sendMoneyBox"
          >
            <input
              type="text"
              name="sending_amount"
              id="sending_amount"
              aria-label="Sending Money"
              value={sending_amount}
              placeholder={
                isRateReady ? "1" : isLoading ? "Loading..." : "Rate error"
              }
              onChange={handleSendingAmountChange}
              disabled={!isRateReady}
              className={`focus:ring-0 placeholder:text-white focus:border-transparent outline-none w-[40%] font-bold bg-transparent ${
                !isRateReady ? "opacity-60" : ""
              }`}
            />

            <button
              type="button"
              id="sendMoneyCurrencyBtn"
              className="w-[90px] inline-flex items-center gap-1 relative"
            >
              <DropdownComponent defaultCurrency="GBP" />
            </button>
          </div>
          <p id="sendingError" className="text-deep-danger text-sm mt-1"></p>
        </div>

        <div className="absolute top-[35px] left-[calc(50%-20px)] z-1 -me-5 hidden md:block">
          <span
            className=" bg-[#813FD6] inline-flex items-center justify-center rounded-full w-10 h-10  before:content-['']  outline-4 outline-[#230a2f]
                        before:absolute 
                        before:top-0 
                        before:-left-[7px] 
                        before:w-full 
                        before:h-full 
                        before:bg-[#230a2f] 
                        before:-z-10 
                        before:rounded-full 
                        before:border 
                        before:border-[#ffffff3d]
                        
                        
                        after:content-[''] 
                        after:absolute 
                        after:top-0 
                        after:-right-[7px] 
                        after:w-full 
                        after:h-full 
                        after:bg-[#230a2f] 
                        after:-z-10 
                        after:rounded-full 
                        after:border 
                        after:border-[#ffffff3d]"
          >
            <FaArrowRight className="text-lg text-white" />
          </span>
        </div>

        <div className="w-full md:w-[calc(50%-16px)]">
          <label className="text-[#ccc] text-sm font-medium block mb-2">
            You get exactly
          </label>
          <div
            className="flex relative items-center justify-between md:justify-start gap-5.5 border border-[#ffffff3d] pe-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="receiveMoneyBox"
            data-country="norway"
            data-currency="EUR"
          >
            <input
              type="text"
              name="receive_amount"
              id="receive_amount"
              value={receive_amount}
              placeholder={
                isRateReady
                  ? initialReceiveAmount
                  : isLoading
                  ? "Loading..."
                  : "Rate error"
              }
              onChange={handleReceiveAmountChange}
              disabled={!isRateReady}
              aria-label="Receive Money"
              className={`focus:ring-0 placeholder:text-white w-[40%] focus:border-transparent outline-none font-bold bg-transparent ${
                !isRateReady ? "opacity-60" : ""
              }`}
            />
            <button
              type="button"
              id="receiveMoneyCurrencyBtn"
              className="w-[90px] inline-flex items-center gap-1 relative"
            >
              <DropdownComponent defaultCurrency="NGN" />
            </button>
          </div>
          <p id="receivingError" className="text-deep-danger text-sm mt-1"></p>
        </div>
      </div>
    </>
  );
};

export default Transfer;
