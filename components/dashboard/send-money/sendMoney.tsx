"use client";
import CompareRates from "@/components/landing/hero/compareRates";
import { useState, useEffect, useMemo } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { IoIosCheckmark } from "react-icons/io";
import DashTf from "./dashTransfer";
import { useRouter } from "next/navigation";
import { useRatesStore } from "@/stores/useRatesStore";
import { toast } from "sonner";
import { useTransferStore } from "@/stores/useTransaferStore";
import { formatNumber } from "@/helper/utils";

const SendMoneyUI = () => {
  const [isBank, setIsBank] = useState(true);
  const [rateLabelFromTransfer, setRateLabelFromTransfer] = useState("");

  const router = useRouter();

  const { ratesData, isLoading, error, fetchRates } = useRatesStore();
  const [sending_amount, setSendingAmount] = useState("10");
  const [get_amount, setGetAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("NGN");

  useEffect(() => {
    if (!ratesData && !isLoading) {
      fetchRates();
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
    sending_amount === ""
      ? `0 ${fromCurrency}`
      : `${formatNumber(sending_amount)} ${fromCurrency}`;

  const { setTransfer } = useTransferStore();

  return (
    <div className="p-5 md:p-10">
      <DashTf
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        onRateUpdate={handleRateUpdate}
        setToCurrency={setToCurrency}
        toCurrency={toCurrency}
        sending_amount={sending_amount}
        setSendingAmount={setSendingAmount}
        get_amount={get_amount}
        setGetAmount={setGetAmount}
      />

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
          <span>
            {isLoading && !ratesData
              ? "Fetching rate..."
              : error
              ? "Rate error"
              : rateLabelFromTransfer || "Loading..."}
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
      <hr />
      <div className="flex font-poppins mt-5 justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Total Amount</p>
          <p className="font-semibold text-xl">{totalAmountDisplay}</p>
        </div>
        <button
          disabled={
            fromCurrency === toCurrency || parseInt(sending_amount) < 10
          }
          onClick={() => {
            if (parseFloat(sending_amount) < 10) {
              toast.error("Minimum transferable amount is 10 GBP");
              return;
            }
            console.log(fromCurrency, toCurrency, sending_amount, "from:to");
            setTransfer({
              amount: parseInt(sending_amount),
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              setToAmount: parseInt(get_amount),
            });
            router.push("/send-money/recipients");
          }}
          className="
    text-base text-white font-poppins border border-[#813FD6] py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2 disabled:cursor-not-allowed disabled:from-[#813FD6]/30 disabled:to-[#301342]/30
  "
        >
          Send Now <CgArrowTopRight />
        </button>
      </div>
    </div>
  );
};

export default SendMoneyUI;
