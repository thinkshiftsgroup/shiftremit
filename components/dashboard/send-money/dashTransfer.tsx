"use client";
import { useState, useEffect, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import DropdownComponent from "./dropDown";
import { useRatesStore } from "@/stores/useRatesStore";
import { AdminRateData, FxRateData } from "@/api/rateService";
import { useTransferStore } from "@/stores/useTransaferStore";
import { formatNumber } from "@/helper/utils";

interface DashTfProps {
  onRateUpdate: (
    label: string,
    sendingAmount: string,
    fromCurrency: string
  ) => void;
  setFromCurrency: any;
  fromCurrency: string;
  toCurrency: string;
  setToCurrency: any;
}

const DashTf = ({
  onRateUpdate,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
}: DashTfProps) => {
  const [sending_amount, setSendingAmount] = useState("10");
  const [get_amount, setGetAmount] = useState("");

  const MIN_SENDING = 10;

  const ratesData = useRatesStore(
    (state) => state.ratesData as FxRateData | null
  );
  const adminRateData = useRatesStore(
    (state) => state.adminRateData as AdminRateData | null
  );
  const isLoading = useRatesStore((state) => state.isLoading);
  const { setTransfer } = useTransferStore();

  const benchmarkGBP = adminRateData?.benchmarkGBP || 8;
  const rateNGN = adminRateData?.rateNGN || 1973;

  const { conversionRate, isRateReady, rateLabel } = useMemo(() => {
    let baseRate = ratesData?.lemfi?.rate || 0;
    let rate = baseRate + benchmarkGBP + 1;
    let ready = rate > benchmarkGBP && !isLoading;
    let label = ready
      ? `1 ${fromCurrency} = ${formatNumber(rate.toFixed(2))} ${toCurrency}`
      : "Rate Loading...";
    let precision = 2;

    if (fromCurrency === "NGN" && toCurrency === "GBP") {
      rate = 1 / rateNGN;
      ready = true;
      precision = benchmarkGBP;
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

  const initialReceiveAmount = useMemo(() => {
    if (isRateReady) {
      const initialAmount = parseFloat(sending_amount);
      if (fromCurrency === toCurrency) {
        return initialAmount.toFixed(2);
      }
      return (initialAmount * conversionRate).toFixed(
        conversionRate === 1 / rateNGN ? 8 : 2
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
    const raw = e.target.value.replace(/[^0-9.]/g, "");

    if (raw === "") {
      setSendingAmount("");
      setGetAmount("");
      return;
    }

    let numericValue = parseFloat(raw);

    // ✅ Hard enforce minimum
    if (numericValue < MIN_SENDING) numericValue = MIN_SENDING;

    setSendingAmount(numericValue.toString());

    if (isRateReady) {
      const precision = fromCurrency === "NGN" && toCurrency === "GBP" ? 8 : 2;

      const calculated = (numericValue * conversionRate).toFixed(precision);
      setGetAmount(calculated);
      setTransfer({
        convertedNGNAmount: parseInt(calculated),
      });
    }
  };

  const handleReceiveAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setGetAmount(value);

    if (value === "") {
      setSendingAmount(String(MIN_SENDING));
      return;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && isRateReady) {
      let sent =
        fromCurrency === toCurrency
          ? numericValue
          : numericValue / conversionRate;
      sent = Math.max(sent, MIN_SENDING);

      setSendingAmount(sent.toFixed(2));
    }
  };

  const handleFromCurrencySelect = (currencyCode: string) => {
    setFromCurrency(currencyCode);
    setSendingAmount("10");
    setGetAmount("");
  };

  const handleToCurrencySelect = (currencyCode: string) => {
    setToCurrency(currencyCode);
    setSendingAmount("10");
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
        <div className="w-full md:w-[calc(50%-16px)] ">
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
              value={formatNumber(sending_amount)}
              onChange={handleSendingAmountChange}
              id="sending_amount"
              placeholder={
                isRateReady ? "1" : isLoading ? "Loading..." : "Rate error"
              }
              aria-label="Sending Money"
              min={10}
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

        <div className="w-full md:w-[calc(50%-16px)]">
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
              name="receiving_amount"
              value={formatNumber(get_amount)}
              onChange={handleReceiveAmountChange}
              id="receiving_amount"
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
