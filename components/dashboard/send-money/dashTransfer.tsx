"use client";
import { useState, useEffect, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import DropdownComponent from "./dropDown";
import { useRatesStore } from "@/stores/useRatesStore";

const DashTf = () => {
  const [sending_amount, setSendingAmount] = useState("1");
  const [get_amount, setGetAmount] = useState("");

  const { ratesData, isLoading } = useRatesStore();

  const moniepointRate = ratesData?.moniepoint?.rate || 0;
  const conversionRate = moniepointRate + 10;
  const isRateReady = conversionRate > 10 && !isLoading;

  const initialReceiveAmount = useMemo(() => {
    if (isRateReady) {
      const initialAmount = parseFloat(sending_amount);
      return (initialAmount * conversionRate).toFixed(2);
    }
    return "";
  }, [conversionRate, isRateReady, sending_amount]);

  useEffect(() => {
    if (isRateReady && get_amount === "") {
      setGetAmount(initialReceiveAmount);
    }
  }, [isRateReady, initialReceiveAmount, get_amount]);

  const handleSendingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSendingAmount(value);

    const amount = parseFloat(value);
    if (!isNaN(amount) && isRateReady) {
      const received = amount * conversionRate;
      setGetAmount(received.toFixed(2));
    } else if (value === "") {
      setGetAmount("");
    }
  };

  const handleReceiveAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setGetAmount(value);

    const amount = parseFloat(value);
    if (!isNaN(amount) && isRateReady) {
      const sent = amount / conversionRate;
      setSendingAmount(sent.toFixed(2));
    } else if (value === "") {
      setSendingAmount("");
    }
  };

  const placeholderReceive = isRateReady
    ? initialReceiveAmount
    : isLoading
    ? "Loading..."
    : "Rate error";

  return (
    <>
      <div className="relative font-poppins flex flex-wrap justify-between items-start mb-4">
        <div className="w-[calc(50%-16px)] ">
          <label className="text-black text-sm font-dm-sans font-medium block mb-2">
            You send exactly
          </label>
          <div
            className="flex relative flex-wrap items-center justify-between border border-black ps-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="sendMoneyBox"
          >
            <input
              type="text"
              name="sending_amount"
              value={sending_amount}
              onChange={handleSendingAmountChange}
              id="sending_amount"
              placeholder={
                isRateReady ? "1" : isLoading ? "Loading..." : "Rate error"
              }
              aria-label="Sending Money"
              disabled={!isRateReady}
              className={`focus:ring-0 focus:border-transparent outline-none bg-transparent ${
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

        <div className="absolute top-[35px] left-[calc(50%-20px)] z-1 -me-5">
          <span
            className=" bg-[#813FD6] inline-flex items-center justify-center rounded-full w-10 h-10  before:content-['']  outline-4 outline-white
                        before:absolute 
                        before:top-0 
                        before:-left-[7px] 
                        before:w-full 
                        before:h-full 
                        before:bg-white
                        before:-z-10 
                        before:rounded-full 
                        before:border 
                        before:border-white
                        
                        
                        after:content-[''] 
                        after:absolute 
                        after:top-0 
                        after:-right-[7px] 
                        after:w-full 
                        after:h-full 
                        after:bg-white 
                        after:-z-10 
                        after:rounded-full 
                        after:border 
                        after:border-white"
          >
            <FaArrowRight className="text-lg text-white" />
          </span>
        </div>

        <div className="w-[calc(50%-16px)]">
          <label className="text-black text-sm font-dm-sans font-medium block mb-2">
            You get exactly
          </label>
          <div
            className="flex relative flex-wrap items-center justify-between border border-black pe-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="receiveMoneyBox"
            data-country="norway"
            data-currency="EUR"
          >
            <input
              type="text"
              name="sending_amount"
              value={get_amount}
              onChange={handleReceiveAmountChange}
              id="sending_amount"
              placeholder={placeholderReceive}
              aria-label="Receiving Money"
              disabled={!isRateReady}
              className={`focus:ring-0 focus:border-transparent outline-none bg-transparent ${
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

export default DashTf;
