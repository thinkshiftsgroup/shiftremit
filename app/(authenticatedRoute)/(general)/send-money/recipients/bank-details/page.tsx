"use client";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import { useRecipient } from "../../../recipients/useRecipient";
import { useTransferStore } from "@/stores/useTransaferStore";
import { Loader2 } from "lucide-react";
import RecentTfs from "@/components/general/send-money/recents";
import { useTrx } from "@/app/(authenticatedRoute)/user/transactions/useTrx";

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
  const [hasResolvedOnce, setHasResolvedOnce] = useState(false);
  const [filterName, setFilterName] = useState("");

  const [switchRecents, setSwitchRecents] = useState("");

  const [GBPAccountNumber, setGBPAccountNumber] = useState("");
  const [GBPBankName, setGBPBankName] = useState("");
  const [GBPAccountName, setGBPAccountName] = useState("");

  const [sortCode, setSortCode] = useState("");

  const { getBanks, getBankDetails } = useRecipient();
  const { setTransfer } = useTransferStore();
  const transfer = useTransferStore((state) => state.transfer);

  const { getRecentTrx } = useTrx();
  const [page, setPage] = useState(1);
  const { isLoading, data } = getRecentTrx({
    limit: 5,
    name: filterName,
    page: page,
  });
  const Trx = data?.data || [];

  const {
    mutate: resolveAccount,
    data: bankDetails,
    isPending: resolvingAccount,
    isSuccess: resolveSuccess,
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
      setHasResolvedOnce(true);
    }
  }, [accountNumber, bankCode, resolveAccount]);

  const shouldShowInvalidError =
    (hasResolvedOnce && accountNumber.length < 10) ||
    (accountNumber.length === 10 &&
      !resolvingAccount &&
      resolveSuccess &&
      !bankDetails?.data?.account_name);

  const handleBankDetailsNGN = () => {
    setTransfer({
      recipientBankName: bankName,
      recipientAccountNumber: accountNumber,
      recipientFullName: bankDetails?.data?.account_name,
      recipientEmail: email,
      purpose: purpose,
      isRecipientBusinessAccount: isBusiness,
    });

    router.push("/send-money/fund");
  };
  const handleBankDetailsGBP = () => {
    setTransfer({
      GBPBankName: GBPBankName,
      GBPAccountNumber: GBPAccountNumber,
      GBPAccountName: GBPAccountName,
      recipientEmail: email,
      purpose: purpose,
      isRecipientBusinessAccount: isBusiness,
      sortCode: sortCode,
    });

    router.push("/send-money/fund");
  };

  return (
    <SideNav>
      <div className="my-3 md:my-7 relative bg-white rounded-lg mx-auto ">
        <SendSteps step={2} />

        <div className="relative">
          <div className="my-5 md:my-10 ">
            <h1 className="text-xl sm:text-2xl md:text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
              {switchRecents
                ? "Select Recipients"
                : "Enter their account details"}
            </h1>
          </div>

          <div className="max-w-2xl mx-auto relative px-3.5 md:px-0">
            <button
              onClick={() =>
                setSwitchRecents((prev) => (prev === "recent" ? "" : "recent"))
              }
              className="underline cursor-pointer text-[#072032] font-dm-sans text-right w-full mb-3 font-medium"
            >
              {switchRecents !== "recent"
                ? "Recipient List"
                : "Enter bank details"}
            </button>
            <p className="text-sm sm:text-base font-dm-sans pb-2 text-gray-500 font-medium">
              {!switchRecents && "Recipient's bank details"}
            </p>

            {switchRecents && (
              <input
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Search Recipients"
                type="text"
                className="font-poppins text-xs sm:text-sm w-1/2 mt-2 py-2 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none mb-2 transition-colors"
              />
            )}

            <hr className="py-2" />

            {switchRecents ? (
              <RecentTfs
                Trx={Trx}
                page={page}
                setPage={setPage}
                isLoading={isLoading}
              />
            ) : (
              <>
                {transfer?.toCurrency === "NGN" ? (
                  <div className="space-y-2">
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Bank name
                      </label>
                      <select
                        name="bank name"
                        id="bank name"
                        value={JSON.stringify({
                          name: bankName,
                          code: bankCode,
                        })}
                        onChange={(e) => {
                          const { name, code } = JSON.parse(e.target.value);
                          setBankCode(code);
                          setBankName(name);
                        }}
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      >
                        {getBanks.isLoading ? (
                          <option value="">
                            Please choose recipient's bank
                          </option>
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
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Account number
                      </label>
                      <input
                        id="account-number"
                        value={accountNumber}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          setAccountNumber(val);
                        }}
                        type="text"
                        maxLength={10}
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Fullname of the account holder
                      </label>
                      <input
                        value={
                          accountNumber.length < 10
                            ? ""
                            : resolvingAccount
                            ? "Please wait..."
                            : bankDetails?.data?.account_name || ""
                        }
                        readOnly
                        type="text"
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                      {shouldShowInvalidError && (
                        <p className="text-xs text-red-500 font-dm-sans mt-1">
                          Invalid account details
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Their email (optional)
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                    </div>
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Purpose
                      </label>
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Purpose"
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
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
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Bank name
                      </label>
                      <input
                        id="bank-name"
                        value={GBPBankName}
                        onChange={(e) => {
                          setGBPBankName(e.target.value);
                        }}
                        type="text"
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                    </div>
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Account number
                      </label>
                      <input
                        id="account-number"
                        value={GBPAccountNumber}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 8);
                          setGBPAccountNumber(val);
                        }}
                        type="text"
                        maxLength={10}
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Fullname of the account holder
                      </label>
                      <input
                        value={GBPAccountName}
                        onChange={(e) => {
                          setGBPAccountName(e.target.value);
                        }}
                        type="text"
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                      {/* {shouldShowInvalidError && (
                    <p className="text-xs text-red-500 font-dm-sans mt-1">
                      Invalid account details
                    </p>
                  )} */}
                    </div>
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Sort Code
                      </label>
                      <input
                        value={sortCode}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);
                          setSortCode(val);
                        }}
                        type="number"
                        maxLength={6}
                        className="font-poppins w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                      {/* {shouldShowInvalidError && (
                    <p className="text-xs text-red-500 font-dm-sans mt-1">
                      Invalid account details
                    </p>
                  )} */}
                    </div>
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Their email (optional)
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="font-poppins  w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
                      />
                    </div>
                    <div>
                      <label
                        className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] "
                        htmlFor=""
                      >
                        Purpose
                      </label>
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Purpose"
                        className="font-poppins  w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors sm:text-base text-sm"
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
                )}
              </>
            )}

            {switchRecents ? (
              ""
            ) : (
              <>
                {" "}
                {transfer?.toCurrency === "NGN" ? (
                  <button
                    disabled={
                      resolvingAccount ||
                      accountNumber.length < 10 ||
                      !bankName ||
                      !bankDetails?.data?.account_name
                    }
                    onClick={handleBankDetailsNGN}
                    className="
    text-white w-full font-poppins flex justify-center disabled:cursor-not-allowed border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] disabled:from-[#813FD6]/30 to-[#301342] disabled:to-[#301342]/30
    transition-all duration-300 ease-in-out
    hover:border-transparent my-5 text-center 
  "
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    disabled={
                      GBPAccountNumber.length < 8 ||
                      !GBPBankName ||
                      !sortCode ||
                      !GBPAccountName
                    }
                    onClick={handleBankDetailsGBP}
                    className="
    text-white w-full font-poppins flex justify-center disabled:cursor-not-allowed border border-[#813FD6] py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] disabled:from-[#813FD6]/30 to-[#301342] disabled:to-[#301342]/30
    transition-all duration-300 ease-in-out
    hover:border-transparent my-5 text-center sm:text-base  text-sm
  "
                  >
                    Continue
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex justify-between p-5">
            <button
              onClick={() => router.back()}
              className="font-poppins text-sm sm:text-base flex items-center gap-2 sm:py-3 py-2 px-3 sm:px-6 cursor-pointer bg-gray-300 rounded-[6px]"
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
