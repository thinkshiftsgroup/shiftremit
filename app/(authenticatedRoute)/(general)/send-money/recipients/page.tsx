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
    <SideNav>
      <div className="my-4 md:my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />
        <div className="my-5 md:my-10 ">
          <h1 className="text-2xl md:text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Recipient
          </h1>
          <p className="font-poppins text-base text-[#454745] mb-3 text-center">
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
                <h1 className="font-poppins text-black font-semibold text-base">
                  Bank Details
                </h1>
                <p className="font-dm-sans text-[#454745] font-medium text-sm">
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
                <h1 className="font-poppins text-black font-semibold text-base">
                  Find on ShiftRemit
                </h1>
                <p className="font-dm-sans text-[#454745] font-medium text-sm">
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
            <h1 className="font-poppins text-sm font-medium mb-5">Recents</h1>
            <div className="flex flex-wrap items- w-full justify-between gap-5">
              {isLoading ? (
                <div className="flex w-full justify-center">
                  <Loader2 className="animate-spin text-main" size={20} />
                </div>
              ) : filteredTrx.length === 0 ? (
                <p className="text-center py-6 w-full text-sm font-poppins text-gray-500">
                  No recent recipient
                </p>
              ) : (
                <div className="flex font-poppins flex-wrap justify-between gap-5">
                  {filteredTrx.slice(0, 6).map((trx: any) => {
                    return (
                      <div
                        key={trx.transactionReference}
                        onClick={() => handleRecipientClick(trx)}
                        className="group w-[140px] flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <div className="relative">
                          <div className="w-14 h-14 uppercase bg-gray-200 font-poppins font-semibold text-2xl text-main rounded-full border border-gray-200 flex items-center justify-center">
                            {trx.recipientFullName
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          {trx.sortCode !== "" ? (
                            <img
                              src="https://flagcdn.com/uk.svg"
                              alt="gbp"
                              className="w-5 h-5 border-2 border-white rounded-full absolute -bottom-1 -right-1 object-cover"
                            />
                          ) : (
                            <img
                              alt="ngn"
                              src="https://flagcdn.com/ng.svg"
                              className="w-5 h-5 border-2 border-white rounded-full absolute -bottom-1 -right-1 object-cover"
                            />
                          )}
                        </div>
                        <div className="text-center">
                          <h1 className="text-sm font-semibold text-[#072032] truncate max-w-[120px]">
                            {trx.recipientFullName}
                          </h1>
                          <p className="font-dm-sans text-xs text-gray-500 truncate max-w-[120px]">
                            {trx.recipientBankName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
            className="font-poppins text-base flex items-center gap-2 py-3 px-6 cursor-pointer bg-gray-300 rounded-[6px]"
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
