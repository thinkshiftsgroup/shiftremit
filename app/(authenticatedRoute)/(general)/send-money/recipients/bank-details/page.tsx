"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import { useRecipient } from "../../../recipients/useRecipient";
import { useTransferStore } from "@/stores/useTransaferStore";
import { useSendMoney } from "../../useSendMoney";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BankI {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  available_for_direct_debit: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
const BankDetails = () => {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);

  const [error, setError] = useState(false);

  const { getBanks, getBankDetails } = useRecipient();
  const { setTransfer } = useTransferStore();
  const { sendTfDetails } = useSendMoney();
  const transfer = useTransferStore((state) => state.transfer);
  const {
    mutate: resolveAccount,
    data: bankDetails,
    isPending: resolvingAccount,
  } = getBankDetails({ accountNumber, bankCode });

  useEffect(() => {
    if (getBanks.data?.data?.length > 0) {
      const first = getBanks.data.data[0];
      setBankCode(first.code);
      setBankName(first.name);
    }
  }, [getBanks.data]);

  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      resolveAccount();
      setError(false);
    } else {
      setError(true);
    }
  }, [accountNumber, bankCode, resolveAccount]);

  const handleBankDetails = () => {
    setTransfer({
      recipientBankName: bankName,
      recipientAccountNumber: accountNumber,
      recipientFullName: bankDetails?.data?.account_name,
      recipientEmail: email,
      purpose: purpose,
      isRecipientBusinessAccount: isBusiness,
    });

    sendTfDetails.mutate(
      {
        amount: transfer?.amount,
        fromCurrency: "GBP",
        toCurrency: "NGN",
        recipientBankName: bankName,
        recipientEmail: email,
        recipientAccountNumber: accountNumber,
        recipientFullName: bankDetails?.data?.account_name,
        purpose: purpose,
        isRecipientBusinessAccount: isBusiness,
        convertedNGNAmount: transfer?.convertedNGNAmount,
      },
      {
        onSuccess: (data) => {
          router.push("/send-money/fund");
          toast.success(data?.message, data?.nextStep);

          setTransfer({
            transferReference: data?.transferReference,
            GBPAccountNumber: data?.GBP_Payment_Details?.GBPAccountNumber,
            GBPAccountName: data?.GBP_Payment_Details?.GBPAccountName,
          });
        },
      }
    );
  };

  return (
    <SideNav>
      <div className="my-7 relative bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />

        <div className="relative">
          <div className="my-10 ">
            <h1 className=" text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
              Enter their account details
            </h1>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <p className="text-base font-dm-sans pb-2 text-gray-500 font-medium">
              Recipient's bank details
            </p>

            <hr className="py-2" />

            <div className="space-y-2">
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  Bank name
                </label>
                <select
                  name="bank name"
                  id="bank name"
                  value={JSON.stringify({ name: bankName, code: bankCode })}
                  onChange={(e) => {
                    const { name, code } = JSON.parse(e.target.value);
                    setBankCode(code);
                    setBankName(name);
                  }}
                  className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                >
                  {getBanks.isLoading ? (
                    <option value="">Please choose recipient's bank</option>
                  ) : (
                    getBanks.data.data.map((bank: BankI) => {
                      return (
                        <option
                          key={bank.id}
                          value={JSON.stringify({
                            name: bank.name,
                            code: bank.code,
                          })}
                        >
                          {bank.name}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  Account number
                </label>
                <input
                  id="account-number"
                  value={accountNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setAccountNumber(val);
                  }}
                  type="text"
                  maxLength={10}
                  className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                />
              </div>{" "}
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  Fullname of the account holder
                </label>
                <input
                  value={
                    resolvingAccount
                      ? "Please wait..."
                      : bankDetails?.data?.account_name || ""
                  }
                  readOnly
                  type="text"
                  className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                />
                {error && (
                  <p className="text-xs text-red-500 font-dm-sans mt-1">
                    Invalid account details
                  </p>
                )}
              </div>
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  Their email (optional)
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  Purpose
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Purpose"
                  className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                />
              </div>
              <div className="flex justify-end">
                <div className="flex items-center gap-1">
                  <p className="font-poppins text-xs">
                    Is this a business bank account
                  </p>
                  <input
                    type="checkbox"
                    checked={isBusiness}
                    onChange={(e) => setIsBusiness(e.target.checked)}
                    className="accent-main w-3.5 h-3.5"
                  />
                </div>
              </div>
            </div>
            <button
              disabled={
                resolvingAccount ||
                accountNumber.length < 10 ||
                !bankName ||
                !bankDetails?.data?.account_name
              }
              onClick={handleBankDetails}
              className="
    text-white w-full font-poppins flex justify-center disabled:cursor-not-allowed border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] disabled:from-[#813FD6]/30 to-[#301342] disabled:to-[#301342]/30
    transition-all duration-300 ease-in-out
    hover:border-transparent my-5 text-center 
  "
            >
              {sendTfDetails.isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
          <div className="flex justify-between p-5">
            <button
              onClick={() => router.back()}
              className="font-poppins text-base flex items-center gap-2 py-3 px-6 cursor-pointer bg-gray-300 rounded-[6px]"
            >
              <FaArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default BankDetails;
