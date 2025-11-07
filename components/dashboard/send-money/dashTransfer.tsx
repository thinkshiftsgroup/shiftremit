"use client";
import { useState, useEffect, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import DropdownComponent from "./dropDown";
import { useRatesStore } from "@/stores/useRatesStore";

interface DashTfProps {
  onRateUpdate: (label: string) => void;
}

const DashTf = ({ onRateUpdate }: DashTfProps) => {
  const [sending_amount, setSendingAmount] = useState("1");
  const [get_amount, setGetAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("NGN");

  const { ratesData, isLoading } = useRatesStore();

  const NGN_TO_GBP_RATE = 1963;

  const { conversionRate, isRateReady, rateLabel } = useMemo(() => {
    let baseRate = ratesData?.moniepoint?.rate || 0;
    let rate = baseRate + 8;
    let ready = rate > 8 && !isLoading;
    let label = ready
      ? `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`
      : "Rate Loading...";
    let precision = 2;

    if (fromCurrency === "NGN" && toCurrency === "GBP") {
      rate = 1 / NGN_TO_GBP_RATE;
      ready = true;
      precision = 8;
      label = `1 NGN = ${rate.toFixed(precision)} GBP`;
    } else if (fromCurrency === toCurrency) {
      rate = 1;
      ready = true;
      label = `1 ${fromCurrency} = 1.00 ${toCurrency}`;
    } else if (fromCurrency === "GBP" && toCurrency === "NGN") {
      label = ready ? `1 GBP = ${rate.toFixed(2)} NGN` : "Rate Loading...";
    }

    return {
      conversionRate: rate,
      isRateReady: ready,
      rateLabel: label,
      precision: precision,
    };
  }, [fromCurrency, toCurrency, ratesData, isLoading]);

  useEffect(() => {
    if (isRateReady) {
      onRateUpdate(rateLabel);
    } else if (!isLoading) {
      onRateUpdate("Rate error");
    }
  }, [rateLabel, isRateReady, isLoading, onRateUpdate]);

  const initialReceiveAmount = useMemo(() => {
    if (isRateReady) {
      const initialAmount = parseFloat(sending_amount);
      if (fromCurrency === toCurrency) {
        return initialAmount.toFixed(2);
      }
      return (initialAmount * conversionRate).toFixed(
        conversionRate === 1 / NGN_TO_GBP_RATE ? 8 : 2
      );
    }
    return "";
  }, [conversionRate, isRateReady, sending_amount, fromCurrency, toCurrency]);

  useEffect(() => {
    if (isRateReady && get_amount === "") {
      setGetAmount(initialReceiveAmount);
    }
  }, [isRateReady, initialReceiveAmount, get_amount]);

  const handleSendingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    setSendingAmount(numericValue);

    const amount = parseFloat(numericValue);
    if (!isNaN(amount) && isRateReady) {
      let received;
      let precision = 2;

      if (fromCurrency === toCurrency) {
        received = amount;
      } else {
        received = amount * conversionRate;
        if (fromCurrency === "NGN" && toCurrency === "GBP") {
          precision = 8;
        }
      }
      setGetAmount(received.toFixed(precision));
    } else if (numericValue === "") {
      setGetAmount("");
    }
  };

  const handleReceiveAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    setGetAmount(numericValue);

    const amount = parseFloat(numericValue);
    if (!isNaN(amount) && isRateReady) {
      let sent;
      if (fromCurrency === toCurrency) {
        sent = amount;
      } else {
        sent = amount / conversionRate;
      }
      setSendingAmount(sent.toFixed(2));
    } else if (numericValue === "") {
      setSendingAmount("");
    }
  };

  const handleFromCurrencySelect = (currencyCode: string) => {
    setFromCurrency(currencyCode);
    setSendingAmount("1");
    setGetAmount("");
  };

  const handleToCurrencySelect = (currencyCode: string) => {
    setToCurrency(currencyCode);
    setSendingAmount("1");
    setGetAmount("");
  };

  const placeholderReceive = isRateReady
    ? initialReceiveAmount
    : isLoading
    ? "Loading..."
    : "Rate error";

  return (
    <>
      <div className="relative font-poppins flex flex-wrap justify-between items-start mb-4">
        <div className="w-full nd:w-[calc(50%-16px)] ">
          <label className="text-black text-sm font-dm-sans font-medium block mb-2">
            You send exactly
          </label>
          <div
            className="flex relative md:flex-wrap items-center justify-between border border-black ps-2.5 px-4 py-3 rounded-[8.5px] w-full"
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
              className={`focus:ring-0 focus:border-transparent outline-none bg-transparent w-auto ${
                !isRateReady ? "opacity-60" : ""
              }`}
            />

            <button
              type="button"
              id="sendMoneyCurrencyBtn"
              className="w-[90px] inline-flex items-center gap-1 relative"
            >
              <DropdownComponent
                defaultCurrency="GBP"
                onSelect={handleFromCurrencySelect}
              />
            </button>
          </div>
          <p id="sendingError" className="text-deep-danger text-sm mt-1"></p>
        </div>

        <div className="absolute top-[35px] left-[calc(50%-20px)] z-1 -me-5 hidden md:block">
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

        <div className="w-full nd:w-[calc(50%-16px)]">
          <label className="text-black text-sm font-dm-sans font-medium block mb-2">
            You get exactly
          </label>
          <div
            className="flex relative md:flex-wrap items-center justify-between border border-black pe-2.5 px-4 py-3 rounded-[8.5px] w-full"
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
              className={`focus:ring-0 focus:border-transparent outline-none bg-transparent w-auto ${
                !isRateReady ? "opacity-60" : ""
              }`}
            />
            <button
              type="button"
              id="receiveMoneyCurrencyBtn"
              className="w-[90px] inline-flex items-center gap-1 relative"
            >
              <DropdownComponent
                defaultCurrency="NGN"
                onSelect={handleToCurrencySelect}
              />
            </button>
          </div>
          <p id="receivingError" className="text-deep-danger text-sm mt-1"></p>
        </div>
      </div>
    </>
  );
};

export default DashTf;
