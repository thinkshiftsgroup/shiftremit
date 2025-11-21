"use client";
import { useTrx } from "@/app/(authenticatedRoute)/user/transactions/useTrx";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useTransferStore } from "@/stores/useTransaferStore";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { FaArrowLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Recipients = () => {
  const router = useRouter();
  const { setTransfer, clearTransfer, transfer } = useTransferStore();
  const { getRecentTrx } = useTrx();
  const { isLoading, data } = getRecentTrx({ limit: 4, name: "" });
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
    <SideNav>
      <div className="my-4 md:my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />
        <div className="my-5 md:my-10 ">
          <h1 className="text-2xl md:text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Recipient
          </h1>
          <p className="font-poppins text-sm sm:text-base text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <div className="max-w-2xl px-3.5 md:px-0 mx-auto">
          <div
            onClick={() => router.push("/send-money/recipients/bank-details")}
            className="flex cursor-pointer items-center justify-between py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 flex-none h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 512 512"
                  className="text-[#072032]"
                >
                  <path
                    fill="currentColor"
                    d="M271.9 20.2c-9.8-5.6-21.9-5.6-31.8 0l-224 128c-12.6 7.2-18.8 22-15.1 36S17.5 208 32 208h32v208l-51.2 38.4C4.7 460.4 0 469.9 0 480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32c0-10.1-4.7-19.6-12.8-25.6L448 416V208h32c14.5 0 27.2-9.8 30.9-23.8s-2.5-28.8-15.1-36l-224-128zM400 208v208h-64V208zm-112 0v208h-64V208zm-112 0v208h-64V208zm80-112a32 32 0 1 1 0 64a32 32 0 1 1 0-64"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-poppins text-black font-semibold text-sm sm:text-base">
                  Bank Details
                </h1>
                <p className="font-dm-sans text-[#454745] font-medium text-xs sm:text-sm">
                  Enter name, bank and account number
                </p>
              </div>
            </div>
            <FaAngleRight size={16} className="" />
          </div>
          <div
            onClick={() => router.push("/send-money/recipients/find")}
            className="flex cursor-pointer items-center justify-between border-t border-t-gray-200 border-b border-b-gray-200 py-3"
          >
            <div className="flex items-start gap-2">
              <img
                src="/images/shiftremit-logo.png"
                className="w-12 flex-none h-12 rounded-full "
                alt=""
              />

              <div>
                <h1 className="font-poppins text-black font-semibold text-sm sm:text-base">
                  Find on ShiftRemit
                </h1>
                <p className="font-dm-sans text-[#454745] font-medium text-xs sm:text-sm">
                  Find on Shiftremit / search by Shiftremittag, email or mobile
                  number
                </p>
                <div className="rounded-sm px-1 py-0.5 inline-block bg-main/40">
                  <p className="font-dm-sans font-semibold text-[10px] text-main-dark">
                    Instant and convenient
                  </p>
                </div>
              </div>
            </div>
            <FaAngleRight size={16} className="" />
          </div>
          <div className="py-3">
            <h1 className="font-poppins text-xs sm:text-sm font-medium mb-5">Recents</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full gap-5">
              {isLoading ? (
                <div className="col-span-4 flex justify-center items-center py-20">
                  <Loader2 className="animate-spin text-main" size={24} />
                </div>
              ) : filteredTrx.length === 0 ? (
                <div className="col-span-4 flex justify-center items-center py-20">
                  <p className="text-center text-xs sm:text-sm font-poppins text-gray-500">
                    No recent recipient
                  </p>
                </div>
              ) : (
                filteredTrx.slice(0, 4).map((trx: any) => (
                  <div
                    key={trx.transactionReference}
                    onClick={() => handleRecipientClick(trx)}
                    className="group flex flex-col justify-center items-center gap-2 cursor-pointer"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 uppercase bg-gray-200 font-poppins font-semibold text-xl sm:text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center">
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
                      <h1 className="text-sm font-semibold text-[#072032] truncate max-w-[150px]">
                        {trx.recipientFullName}
                      </h1>
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
          </div>
        </div>

        <div className="flex justify-between p-5">
          <button
            onClick={() => {
              router.back();
              clearTransfer();
            }}
            className="font-poppins text-sm sm:text-base flex items-center gap-2 sm:py-3 py-2 px-3 sm:px-6 cursor-pointer bg-gray-300 rounded-[6px]"
          >
            <FaArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    </SideNav>
  );
};

export default Recipients;
