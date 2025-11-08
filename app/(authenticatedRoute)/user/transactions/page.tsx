"use client";
import SideNav from "@/components/dashboard/sideNav";
import { FaArrowUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { RiArrowRightUpLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoPlus } from "react-icons/go";

import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import { ChartRadialSimple } from "@/components/dashboard/overviewChart";
import { IoWallet } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTrx } from "./useTrx";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";

const CustomerTrxn = () => {
  const cardData = [
    {
      title: "Total send money",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
    {
      title: "Total receive money",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
    {
      title: "Total amount in transit",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
  ];
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { getBankTrfsUser } = useTrx();
  const { data, isLoading } = getBankTrfsUser({ page, pageSize: 5 });
  const Trxs = data?.transfers || [];
  return (
    <SideNav>
      <div className="py-5">
        <div className="flex items-center justify-center md:justify-end gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/send-money")}
              className="text-[15px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]"
            >
              Send Money <FaArrowUp />
            </button>
            {/* <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Deposit <FaPlus />
            </button> */}
            <button
              onClick={() => router.push("/request-money/send-request")}
              className="text-[15px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]"
            >
              Request Money <FaPlus />
            </button>
            {/* <button className="text-[15px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Wallet <IoWallet />
            </button> */}
          </div>
        </div>

        <div className="px-2.5 py-4 md:py-3.5 md:px-6 bg-white rounded-md my-4">
          <h1 className="text-[#072032] text-xl md:text-2xl font-semibold font-dm-sans mb-2">
            Overview
          </h1>

          <div className="grid md:grid-cols-3 gap-3">
            {cardData.map((card, index) => {
              return (
                <div
                  key={index}
                  className="py-2 px-3 bg-white border border-gray-200 rounded-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[#072032] font-semibold text-base font-dm-sans">
                      {card.title}
                    </p>
                    <div className="bg-[#22c55e]/20 flex justify-center items-center w-[30px] h-[30px] rounded-md">
                      <RiArrowRightUpLine
                        className="text-[#22c55e]"
                        size={20}
                      />
                    </div>
                  </div>
                  <h1 className="text-[#072032] font-medium font-dm-sans text-2xl py-1 ">
                    {card.amount} GBP
                  </h1>
                  <p className="text-sm font-poppins text-[#454745]">
                    Last transaction{" "}
                    <span className="text-[#22c55e] font-medium">
                      {card.lastTxn} GBP
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-3.5 px-6 bg-white rounded-md my-4">
          <div className="flex md:items-center justify-between flex-col md:flex-row space-y-3">
            <div className="flex  md:items-center gap-2.5 flex-col md:flex-row">
              <div className="w-[50px] cursor-pointer flex items-center justify-center h-[50px] rounded-full bg-main text-white">
                <FaUserPlus size={25} />
              </div>
              <div>
                <h1 className="font-poppins font-medium">
                  Take share in ShiftRemit Daily Profits.
                </h1>
                <p className="font-poppins text-sm text-[#454745]">
                  Create your partner account and run your remitting space and
                  withdraw your earnings from wallet weekly.
                </p>
              </div>
            </div>
            <Link href={"/customer/partner-space"}>
              <button className="text-[13px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
                Start Now <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
        <div className="py-3.5  bg-white rounded-md my-4">
          <h1 className="text-[#072032] px-3 md:px-6 text-xl md:text-2xl font-semibold font-dm-sans mb-2">
            Transactions
          </h1>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead className="bg-[#e2e8f0] w-full">
                <tr className="w-full text-left">
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Transaction Id
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Sending Amount
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Receiving Amount
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Recipient
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Destination
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Date
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <Loader2 className="animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : Trxs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-sm font-poppins opacity-70"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  Trxs.map((trx: any) => (
                    <tr key={trx.id}>
                      <td className="px-4 text-sm py-1 font-poppins">
                        {trx.transferReference}
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        £{trx.amount}
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        ₦{trx.convertedNGNAmount}
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        <span className="flex flex-col gap-0.5">
                          {trx.recipientFullName}
                          <p>{trx.recipientEmail}</p>
                        </span>
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        <span>
                          {trx.recipientBankName}
                          <p>
                            {trx.recipientAccountNumber}
                          </p>
                        </span>
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        {new Date(trx.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        <span
                          className={`p-1 rounded-sm border capitalize ${
                            trx.status === "COMPLETED"
                              ? "bg-green-500/40 text-green-500 border-green-500"
                              : trx.status === "PENDING"
                              ? "bg-[#FFB90D]/20 text-[#FFB90D] border-[#FFB90D]"
                              : "bg-red-500/40 text-red-500 border-red-500"
                          }`}
                        >
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between mt-4 px-3 md:px-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 disabled:opacity-40"
              >
                <ChevronLeft />
              </button>

              <p className="text-xs font-poppins text-main-dark">
                Page {data?.meta.page}
              </p>

              <button
                onClick={() => setPage(page + 1)}
                className="p-2 disabled:opacity-40"
              >
                <ChevronRight size={20} className="text-main-dark-II" />
              </button>
            </div>
          )}
        </div>

        <div className="py-3.5 bg-white rounded-md my-4">
          <h1 className="text-[#072032]  px-6 text-2xl font-semibold font-dm-sans mb-2">
            Overview
          </h1>

          <hr />
          <div className="relative  px-6 ">
            <div className="absolute flex mt-5 flex-col gap-1 *:cursor-pointer z-50 md:auto">
              <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-main" /> Send Money:
                0.00
              </div>
              <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark" /> Request
                Money: 0.00
              </div>
              {/* <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark-II" />{" "}
                Deposit: 0.00
              </div> */}
            </div>
            <ChartRadialSimple />
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default CustomerTrxn;
