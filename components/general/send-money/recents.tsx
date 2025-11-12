"use client";
import { useTrx } from "@/app/(authenticatedRoute)/user/transactions/useTrx";
import { useTransferStore } from "@/stores/useTransaferStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const RecentTfs = () => {
  const router = useRouter();
  const { setTransfer, transfer } = useTransferStore();
  const { getRecentTrx } = useTrx();
  const { isLoading, data } = getRecentTrx();
  const Trx = data?.data || [];

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
      

      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {isLoading ? (
          <div className="flex w-full justify-center py-6">
            <Loader2 className="animate-spin text-main" size={24} />
          </div>
        ) : filteredTrx.length === 0 ? (
          <p className="text-center py-10 w-full text-sm font-poppins text-gray-500">
            No recent recipients yet
          </p>
        ) : (
          filteredTrx.map((trx: any) => (
            <div
              key={trx.transactionReference}
              onClick={() => handleRecipientClick(trx)}
              className="group w-[140px] flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md bg-white rounded-lg p-3 border border-gray-100"
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
                <h3 className="text-sm font-semibold text-[#072032] truncate max-w-[120px]">
                  {trx.recipientFullName}
                </h3>
                <p className="font-dm-sans text-xs text-gray-500 truncate max-w-[120px]">
                  {trx.recipientBankName}
                </p>
              </div>

              <div className="absolute inset-0 rounded-lg bg-main/5 opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTfs;
