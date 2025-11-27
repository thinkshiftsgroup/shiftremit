"use client";
import { useEffect, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import DropdownComponent from "./dropDown";
import { useState } from "react";
import { useRatesStore } from "@/stores/useRatesStore";
import { AdminRateData, FxRateData } from "@/api/rateService";
import { formatNumber } from "@/helper/utils";

interface TransferProps {
  onRateUpdate: (
    label: string,
    sendingAmount: string,
    fromCurrency: string
  ) => void;
}

const Transfer = ({ onRateUpdate }: TransferProps) => {
  const [sending_amount, setSendingAmount] = useState("1");
  const [receive_amount, setReceiveAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("NGN");

  const ratesData = useRatesStore(
    (state) => state.ratesData as FxRateData | null
  );
  const adminRateData = useRatesStore(
    (state) => state.adminRateData as AdminRateData | null
  );
  const isLoading = useRatesStore((state) => state.isLoading);

  const getDecimalPlaces = (currency: string) => {
    return currency === "NGN" ? 2 : 8;
  };

  const { conversionRate, isRateReady, rateLabel } = useMemo(() => {
    if (fromCurrency === toCurrency) {
      return {
        conversionRate: 1,
        isRateReady: true,
        rateLabel: `1 ${fromCurrency} = 1.00 ${toCurrency}`,
      };
    }

    const lemfi = ratesData?.lemfi?.rate || 0;

    const benchmarkGBP = adminRateData?.benchmarkGBP || 8;
    const rateNGN = adminRateData?.rateNGN || 1973;

    let rate = 0;
    let ready = false;
    let label = "Rate Loading...";

    if (fromCurrency === "GBP" && toCurrency === "NGN") {
      rate = lemfi + benchmarkGBP;
      ready = rate > benchmarkGBP && !isLoading;
      label = ready ? `1 GBP = ${formatNumber(rate.toFixed(2))} NGN` : label;
    } else if (fromCurrency === "NGN" && toCurrency === "GBP") {
      rate = 1 / rateNGN;
      ready = rateNGN > 0 && !isLoading;
      label = ready
        ? `1 NGN = ${rate.toFixed(getDecimalPlaces("GBP"))} GBP`
        : label;
    }

    return {
      conversionRate: rate,
      isRateReady: ready,
      rateLabel: label,
    };
  }, [fromCurrency, toCurrency, ratesData, adminRateData, isLoading]);

  const calculateReceiveAmount = (
    sendAmount: string,
    rate: number,
    from: string,
    to: string
  ) => {
    if (sendAmount === "" || isNaN(parseFloat(sendAmount))) return "";

    const amount = parseFloat(sendAmount);
    if (amount === 0) return "0";

    let received;
    if (from === to) {
      received = amount;
      return received.toFixed(2);
    } else if (from === "GBP" && to === "NGN") {
      received = amount * rate;
      return received.toFixed(2);
    } else if (from === "NGN" && to === "GBP") {
      received = amount * rate;
      return received.toFixed(getDecimalPlaces("GBP"));
    }
    return "";
  };

  const calculateSendAmount = (
    receiveAmount: string,
    rate: number,
    from: string,
    to: string
  ) => {
    if (receiveAmount === "" || isNaN(parseFloat(receiveAmount)) || rate === 0)
      return "";

    const amount = parseFloat(receiveAmount);
    if (amount === 0) return "0";

    let sent;
    if (from === to) {
      sent = amount;
      return sent.toFixed(2);
    } else if (from === "GBP" && to === "NGN") {
      sent = amount / rate;
      return sent.toFixed(2);
    } else if (from === "NGN" && to === "GBP") {
      sent = amount / rate;
      return sent.toFixed(2);
    }
    return "";
  };

  // Update onRateUpdate prop when dependencies change
  useEffect(() => {
    let label = rateLabel;
    if (!isRateReady && !isLoading) {
      label = "Rate error";
    }
    onRateUpdate(label, sending_amount, fromCurrency);
  }, [
    rateLabel,
    isRateReady,
    isLoading,
    onRateUpdate,
    sending_amount,
    fromCurrency,
  ]);

  // Recalculate receive amount whenever sending amount, rate, or currencies change
  useEffect(() => {
    if (isRateReady) {
      const received = calculateReceiveAmount(
        sending_amount,
        conversionRate,
        fromCurrency,
        toCurrency
      );
      setReceiveAmount(received);
    } else if (!isLoading) {
      setReceiveAmount("");
    }
  }, [
    isRateReady,
    sending_amount,
    conversionRate,
    fromCurrency,
    toCurrency,
    isLoading,
  ]);

  // Calculate initialReceiveAmount for the placeholder
  const initialReceiveAmount = useMemo(() => {
    if (isRateReady) {
      // Use "1" as the default sending amount for the placeholder if current amount is empty
      const amountToUse = sending_amount === "" ? "1" : sending_amount;
      return calculateReceiveAmount(
        amountToUse,
        conversionRate,
        fromCurrency,
        toCurrency
      );
    }
    return "";
  }, [conversionRate, isRateReady, sending_amount, fromCurrency, toCurrency]);

  const handleSendingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setSendingAmount(value);

    if (value === "" || parseFloat(value) === 0) {
      setReceiveAmount(value === "" ? "" : "0");
      return;
    }

    if (isRateReady) {
      const received = calculateReceiveAmount(
        value,
        conversionRate,
        fromCurrency,
        toCurrency
      );
      setReceiveAmount(received);
    }
  };

  const handleReceiveAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    setReceiveAmount(numericValue);

    if (numericValue === "" || parseFloat(numericValue) === 0) {
      setSendingAmount(numericValue === "" ? "" : "0");
      return;
    }

    if (isRateReady) {
      const sent = calculateSendAmount(
        numericValue,
        conversionRate,
        fromCurrency,
        toCurrency
      );
      setSendingAmount(sent);
    }
  };

  const handleFromCurrencySelect = (currencyCode: string) => {
    setFromCurrency(currencyCode);
  };

  const handleToCurrencySelect = (currencyCode: string) => {
    setToCurrency(currencyCode);
  };

  return (
    <>
      <div className="relative flex flex-wrap justify-between items-start mb-4 gap-5 md:gap-0">
        <div className="w-full md:w-[calc(50%-16px)] ">
          <label className="text-[#ccc] text-sm font-medium block mb-2">
            You send exactly
          </label>
          <div
            className="flex relative  items-center justify-between md:justify-start gap-1.5 border border-[#ffffff3d] ps-2.5 px-4 py-3 rounded-[8.5px] w-full"
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
              className={`focus:ring-0 placeholder:text-white focus:border-transparent outline-none w-full font-bold bg-transparent ${
                !isRateReady ? "opacity-60" : ""
              }`}
            />

            <button
              type="button"
              id="sendMoneyCurrencyBtn"
              className="w-32 inline-flex items-center gap-1 relative"
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
            className="flex relative items-center justify-between md:justify-start gap-1.5 border border-[#ffffff3d] pe-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="receiveMoneyBox"
            data-country="norway"
            data-currency="EUR"
          >
            <input
              type="text"
              name="receive_amount"
              id="receive_amount"
              value={receive_amount}
              placeholder={initialReceiveAmount}
              onChange={handleReceiveAmountChange}
              disabled={!isRateReady}
              aria-label="Receive Money"
              className={`focus:ring-0 placeholder:text-white w-[80%] focus:border-transparent outline-none font-bold bg-transparent ${
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

export default Transfer;
