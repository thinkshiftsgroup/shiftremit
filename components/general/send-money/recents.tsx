"use client";
import { useTrx } from "@/app/(authenticatedRoute)/user/transactions/useTrx";
import { useTransferStore } from "@/stores/useTransaferStore";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RecentTfs = ({ Trx, isLoading, page, setPage }: any) => {
  const router = useRouter();
  const { setTransfer, transfer } = useTransferStore();

  const filteredTrx = Trx.filter((trx: any) => {
    const isGBP = !!trx.sortCode;
    if (transfer?.toCurrency === "NGN") return !isGBP;
    if (transfer?.toCurrency === "GBP") return isGBP;
    return true;
  });

  const handleRecipientClick = (recipient: any) => {
    if (transfer?.toCurrency === "NGN") {
      setTransfer({
        recipientBankName: recipient.recipientBankName,
        recipientAccountNumber: recipient.recipientAccountNumber,
        recipientFullName: recipient.recipientFullName,
        isRecipientBusinessAccount: false,
        purpose: "",
        recipientEmail: "",
      });
    } else {
      setTransfer({
        GBPBankName: recipient.recipientBankName,
        GBPAccountNumber: recipient.recipientAccountNumber,
        GBPAccountName: recipient.recipientFullName,
        isRecipientBusinessAccount: false,
        purpose: "",
        recipientEmail: "",
      });
    }
    router.push("/send-money/fund");
  };

  return (
    <div className="py-4 font-poppins">
      <div className="grid max-w-[50vh] overflow-y-scroll scrollbar-hide grid-cols-4 gap-5 justify-center">
        {isLoading ? (
          <div className="col-span-4 flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-main" size={24} />
          </div>
        ) : filteredTrx.length === 0 ? (
          <div className="col-span-4 flex justify-center items-center py-20">
            <p className="text-center text-sm font-poppins text-gray-500">
              No recent recipients yet
            </p>
          </div>
        ) : (
          filteredTrx.map((trx: any) => (
            <div
              key={trx.transactionReference}
              onClick={() => handleRecipientClick(trx)}
              className="group w-[170px] flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:shadow-md bg-white rounded-lg p-3 border border-gray-100"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gray-100 uppercase font-poppins font-semibold text-lg text-main rounded-full flex items-center justify-center border border-gray-200">
                  {trx.recipientFullName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <img
                  src={
                    trx.sortCode
                      ? "https://flagcdn.com/gb.svg"
                      : "https://flagcdn.com/ng.svg"
                  }
                  alt={trx.sortCode ? "GBP" : "NGN"}
                  className="w-5 h-5 border-2 border-white rounded-full absolute -bottom-1 -right-1 object-cover"
                />
              </div>

              <div className="text-center">
                <h3 className="text-sm font-semibold text-[#072032] truncate max-w-[150px]">
                  {trx.recipientFullName}
                </h3>
                <p className="font-dm-sans text-xs text-gray-500 truncate max-w-[150px]">
                  {trx.recipientBankName}
                </p>
                <p className="font-dm-sans text-xs text-[#072032] truncate max-w-[150px]">
                  {trx.recipientAccountNumber}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
        {isLoading ? (
          ""
        ) : (
          <div className="flex items-center justify-between mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p:any) => Math.max(p - 1, 1))}
              className="p-2 disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => setPage((p:any) => p + 1)}
              className="p-2 disabled:opacity-40"
            >
              <ChevronRight size={20} className="text-main-dark-II" />
            </button>
          </div>
        )}
    </div>
  );
};

export default RecentTfs;
