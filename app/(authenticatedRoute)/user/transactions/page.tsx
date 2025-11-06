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

  return (
    <SideNav>
      <div className="py-5">
        <div className="flex items-center justify-end gap-2">
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

        <div className="py-3.5 px-6 bg-white rounded-md my-4">
          <h1 className="text-[#072032] text-2xl font-semibold font-dm-sans mb-2">
            Overview
          </h1>

          <div className="grid grid-cols-3 gap-3">
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
          <div className="flex items-center justify-between">
            <div className="flex  items-center gap-2.5">
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
            <button onClick={()=>router.push("/partner")} className="text-[13px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
              Start Now <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="py-3.5  bg-white rounded-md my-4">
          <h1 className="text-[#072032] px-6 text-2xl font-semibold font-dm-sans mb-2">
            Transactions
          </h1>
          <div className="">
            <table className="w-full">
              <thead className="bg-[#e2e8f0] w-full">
                <tr className="w-full">
                  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Transaction Id
                  </th>
                  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Sending Amount
                  </th>
                  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Receiving Amount
                  </th>
                
                  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Recipient
                  </th>
                  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Destination
                  </th>
                  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Date
                  </th>  <th className="font-poppins py-2 px-6 text-base font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="72"
                        height="72"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path
                            strokeLinecap="round"
                            d="M11.5 21c-4.478 0-6.718 0-8.109-1.391S2 15.979 2 11.5c0-4.478 0-6.718 1.391-8.109S7.021 2 11.5 2c4.478 0 6.718 0 8.109 1.391S21 7.021 21 11.5"
                          />
                          <path strokeLinejoin="round" d="M2 7h19" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 16h1m-5 0h1m3-4h4m-8 0h1m13.4 8.4L22 22m-.8-4.4a3.6 3.6 0 1 0-7.2 0a3.6 3.6 0 0 0 7.2 0"
                          />
                        </g>
                      </svg>
                      <p className="font-poppins text-[#8094ae]">
                        Don't have data
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-3.5 bg-white rounded-md my-4">
          <h1 className="text-[#072032]  px-6 text-2xl font-semibold font-dm-sans mb-2">
            Overview
          </h1>

          <hr />
          <div className="relative  px-6 ">
            <div className="absolute flex mt-5 flex-col gap-1 *:cursor-pointer">
              <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-main" /> Send Money:
                0.00
              </div>
              <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark" /> Request
                Money: 0.00
              </div>
              <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark-II" />{" "}
                Deposit: 0.00
              </div>
              <div className="flex items-center gap-1 text-sm font-poppins">
                <div className="w-3 h-3 rounded-full bg-primary" /> Withdraw:
                0.00
              </div>
            </div>
            <ChartRadialSimple />
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default CustomerTrxn;
