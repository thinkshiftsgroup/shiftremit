"use client";
import SideNav from "@/components/dashboard/sideNav";
import Comingsoon from "@/components/general/coming-soon";
import { FaArrowUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { RiArrowRightUpLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoPlus } from "react-icons/go";

import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import { WalletSection } from "@/components/dashboard/wallets";
import { ChartRadialSimple } from "@/components/dashboard/overviewChart";
import { cryptoData, fiatData } from "@/data/data";
import DataTable from "@/components/dashboard/partner-space/dataTable";
import React, { useState } from "react";
import { Check } from "lucide-react";

const Partner = () => {
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
      title: "Total Deposit Amount",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
    {
      title: "Total Pending Sending Amount",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
    {
      title: "Total Exchange",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
    {
      title: "Total Withdraw",
      amount: 0.0,
      link: "",
      lastTxn: 0,
    },
  ];
  const cards = Array(5).fill(null);
  const partnerCode = "SR7X2AI";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(partnerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SideNav>
      <div className="py-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[#072032] text-lg font-poppins mb-2 font-semibold">
              Partner Business Space
            </p>
            <h1 className="font-dm-sans font-medium text-[16px] text-[#454745] flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#FFCA28"
                  d="M93.3 60c.2.3.7.1.7-.2c.6-5.4 2.2-20.3 12.8-23.5c3.4-1 6.8 1.4 7.2 4.5c.7 5-5 17.9-4.5 29.7c.1 1.9 3.3 22-5.2 33.9s-28.7 24-48.8 5.6c-10.4-9.5-10.4-13.3-23.3-26.6c-2.6-2.6-13-14-15.8-17.5c-3.7-4.7 2.2-10.9 6.7-7.7c2.1 1.5 20.7 17.1 21.4 17.8c1.4 1.2 3.1-.5 2.1-1.7c-11.4-15-22.4-28.5-25.4-33.7s4.2-10.8 8.4-6.3c2.9 3 24.4 28.1 25.4 29.2s2.7-.3 2.1-1.7c-.7-1.3-18.1-31.6-21.2-38.5c-2.7-6.1 6.3-11.8 10.5-5.5c3.4 5 22.4 36.6 23.1 37.7c.9 1.6 2.9.6 2.1-1.2C71 53 59.3 21 58.4 17.7c-1.6-5.8 6.7-10.6 10.6-4c5.3 9.1 15.8 36.9 24.3 46.3"
                ></path>
                <defs>
                  <path
                    id="SVGTXYnub2S"
                    d="M93.3 60c.2.3.7.1.7-.2c.6-5.4 2.2-20.3 12.8-23.5c3.4-1 6.8 1.4 7.2 4.5c.7 5-5 17.9-4.5 29.7c.1 1.9 3.3 22-5.2 33.9s-28.7 24-48.8 5.6c-10.4-9.5-10.4-13.3-23.3-26.6c-2.6-2.6-13-14-15.8-17.5c-3.7-4.7 2.2-10.9 6.7-7.7c2.1 1.5 20.7 17.1 21.4 17.8c1.4 1.2 3.1-.5 2.1-1.7c-11.4-15-22.4-28.5-25.4-33.7s4.2-10.8 8.4-6.3c2.9 3 24.4 28.1 25.4 29.2s2.7-.3 2.1-1.7c-.7-1.3-18.1-31.6-21.2-38.5c-2.7-6.1 6.3-11.8 10.5-5.5c3.4 5 22.4 36.6 23.1 37.7c.9 1.6 2.9.6 2.1-1.2C71 53 59.3 21 58.4 17.7c-1.6-5.8 6.7-10.6 10.6-4c5.3 9.1 15.8 36.9 24.3 46.3"
                  ></path>
                </defs>
                <clipPath id="SVGOde5adtf">
                  <use href="#SVGTXYnub2S"></use>
                </clipPath>
                <g fill="#FAA700" clipPath="url(#SVGOde5adtf)">
                  <path d="M91.2 60.2c-12.4 10.1-17.9 24.5-7.7 39.5c.9 1.3 2.8.1 2-1.4c-4.2-7.5-7.3-21 7.2-35.1c1.7.8 3.7-.9 3.8-2.4c1.1-9.4 2.2-17.2 9.2-21.6c2.7-1.7 6.2-.5 6.4 3.6c0 0 2.2.2 3.1.3c.5-2.1 1.5-5.9 1.5-6s-11.8-4.5-11.8-4.5L94.6 42.8zm-20-4.1c1.4-.7 2.6-1.8 2-3.3c-.6-1.6-11.7-31.8-12.4-34.1c-1.4-4.2 2.1-7.5 5.2-6.1c1.7.8 2.5-1.9 1.6-2.3s-3-2.3-7.2-.2c-7.5 3.8-3.1 12.2-1.1 17.1s11.9 28.9 11.9 28.9m-14.5 7.5c1.7-1.2 3-2.2 1.5-4.6c-1-1.6-17.9-32.3-19.6-35.3c-2.5-4.3 2.7-8.1 5.6-5.4c1.3 1.2 3.3-1.4 2.3-2.4s-4.5-3.9-8.9-1s-4.5 6.4-3.9 7.9c.5 1.5 23 40.8 23 40.8m-10 12.3c1.2-1.8 2-2.7.3-5S25.1 42.2 24 40.7c-2.8-3.7 1.3-6.9 3.3-5.8c1.9 1.1 3-2 1.4-2.8s-4.2-1.7-6.6 0s-3.8 5.2-3.4 7.2c.3 2 28 36.6 28 36.6"></path>
                  <path d="M92.8 113.6c-16.2 7.7-28.3 1.7-36.1-5.9c-8.9-8.7-13.1-16.7-19-22.1c-2-1.9-17.8-18.7-19.7-21.6c-1.5-2.4 1.5-6.5 4.8-4.2c2.1 1.4 3.1-1.6 1.7-2.4s-4.5-2.5-7.8 0c-3.3 2.4-3.4 6.7-2.6 8.1s49.4 57.2 49.4 57.2l19.8-.5l10.6-6.5z"></path>
                </g>
                <defs>
                  <use href="#SVGTXYnub2S" id="SVGdNmDqbHG"></use>
                </defs>
                <clipPath id="SVG4O03hchm">
                  <use href="#SVGdNmDqbHG"></use>
                </clipPath>
                <g fill="#B55E19" clipPath="url(#SVG4O03hchm)">
                  <path d="M111.5 36c.5 1.3 1.1 3.6.5 6.7c-2.3 11.6-6.1 18.4-4.9 30.9c2.2 24-6.2 42.2-35.1 45.8c-2.9.4-2.1 2.6-.6 2.4c.7-.1 21.3-3.8 21.3-3.8s19.1-16.3 19.1-16.5s4.8-62.4 4.8-62.4zm-50-25.5c1.3.2 4.1 1.3 6.1 5.2s11.8 26.4 13.1 28.8s6.6 14.3 10.9 17.9c1.4 1.1 2.1-.8 2.1-.8l.1-3.1L70.6 5.7l-7.7.3zm9.7 45.6c-1.9.9-3.3 1.7-4.7-.5C65.6 54 55.9 37.4 43.7 18c-1-1.5-3.3-2.8-5.1-2.1c-1.8.8-2.2-1.5-1.3-2s6.5-3.6 10.3 2.8s23.6 39.4 23.6 39.4m-14.5 7.5c-1.5 1.1-3 2.5-4.9.2c-1.8-2.2-22.3-26.6-23.5-28.1s-3.7-2.8-5.6-1.6c-1.3.8-2.5-1.6-1.7-2.2s5.3-4.6 8.3-1.2s27.4 32.9 27.4 32.9m-10 12.3c-1.3 1.4-2.7 2.2-4.6.8S23.2 61 22.1 60s-4.3-2.5-6.7-.1c-.9.9-2.5-.6-1.6-1.5c.9-1 5.8-6 9.7-2.7s23.2 20.2 23.2 20.2"></path>
                </g>
                <path
                  fill="#B0BEC5"
                  d="M10.6 81.3c3.1 9.2 7.8 14.9 15.5 20.1c1.4 1 .6 3-1 2.3c-7.2-2.9-15.2-9.3-17.1-22c-.3-1.7 2.1-2 2.6-.4m6-5.5c3.1 9.2 7.8 14.9 15.5 20.1c1.4 1 .6 3-1 2.3c-7.2-2.9-15.2-9.3-17.1-22c-.2-1.7 2.1-2 2.6-.4m76.9-41.2c-2.4-9.4-6.8-15.4-14.1-21c-1.4-1-.4-3 1.2-2.3c7 3.3 14.6 10.3 15.6 23.1c.1 1.7-2.3 1.9-2.7.2m6.5-4.8c-2.4-9.4-6.8-15.4-14.1-21c-1.4-1-.4-3 1.2-2.3c7 3.3 14.6 10.3 15.6 23.1c.1 1.6-2.2 1.8-2.7.2"
                ></path>
              </svg>
              Welcome back John!
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-[13px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
              Send <FaArrowUp />
            </button>
            <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Deposit <FaPlus />
            </button>
            <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Request Money <FaPlus />
            </button>
            {/* <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Exchange Money <FaArrowDown />
            </button> */}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="py-3.5 px-6 bg-white rounded-md my-4 w-7/10">
            <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
              &nbsp;
            </h1>

            <div className="grid grid-cols-3 gap-3">
              {cardData.map((card, index) => {
                return (
                  <div
                    key={index}
                    className="py-2 px-3 bg-white border border-gray-200 rounded-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[#072032] font-semibold text-sm font-dm-sans">
                        {card.title}
                      </p>
                      <div className="bg-[#22c55e]/20 flex justify-center items-center w-[30px] h-[30px] rounded-md">
                        <RiArrowRightUpLine
                          className="text-[#22c55e]"
                          size={20}
                        />
                      </div>
                    </div>
                    <h1 className="text-[#072032] font-medium font-dm-sans text-lg py-1 ">
                      {card.amount} G
                    </h1>
                    <p className="text-xs font-poppins text-[#454745]">
                      Last transaction{" "}
                      <span className="text-[#22c55e] font-medium">
                        {card.lastTxn} G
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className=" bg-white border my-4 border-gray-200 rounded-md overflow-hidden">
              <DataTable />
              {/* <div className="flex items-center justify-between gap-2 py-2 px-3">
                <h1 className="text-[#072032] font-semibold text-xl font-dm-sans mb-2">
                  Quick Recipients
                </h1>
                <p className="text-main font-semibold flex items-center gap-1 font-poppins text-sm">
                  View All <MdKeyboardArrowRight className="" />{" "}
                </p>
              </div> */}
              {/* <hr /> */}

              {/* <div className="">
                <div className="inline-flex flex-col py-2 px-3 gap-2 items-center">
                  <div className="w-[50px] cursor-pointer flex items-center justify-center h-[50px] rounded-full bg-main text-white">
                    <GoPlus size={25} />
                  </div>
                  <p className=" text-sm font-medium  font-dm-sans">Add</p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="py-3.5 px-6 bg-white rounded-md my-4 w-3/10">

            <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
              Your Partner Code
            </h1>

            <div className="rounded-xs py-0 px-2 pe-0 flex items-center justify-between gap-2 border border-[#f1f1f1] w-full">
              <p className="text-sm truncate w-7/12">{partnerCode}</p>

              <button
                onClick={handleCopy}
                className="p-1 cursor-pointer text-sm rounded transition w-5/12 flex items-center justify-center text-white  bg-linear-to-l from-[#813FD6] to-[#301342]"
                title="Copy Code"
              > Copy Code
                {copied ? (
                  <Check size={16} />
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 243 243"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M210.474 129.958C212.202 125.784 212.202 120.479 212.202 109.889C212.202 99.2992 212.202 93.9941 210.474 89.8208C209.332 87.0614 207.657 84.5542 205.545 82.4424C203.433 80.3306 200.926 78.6555 198.166 77.5129C193.993 75.7849 188.688 75.7849 178.098 75.7849H112.163C99.4306 75.7849 93.0645 75.7849 88.204 78.2607C83.9221 80.4411 80.4411 83.9221 78.2607 88.204C75.7849 93.0544 75.7849 99.4205 75.7849 112.163V178.098C75.7849 188.688 75.7849 193.993 77.5129 198.166C79.8269 203.734 84.2529 208.17 89.8208 210.474C93.9941 212.202 99.2992 212.202 109.889 212.202C120.479 212.202 125.784 212.202 129.958 210.474M210.474 129.958C209.332 132.717 207.657 135.224 205.545 137.336C203.433 139.448 200.926 141.123 198.166 142.266C193.993 143.994 188.688 143.994 178.098 143.994C167.508 143.994 162.203 143.994 158.029 145.722C155.27 146.864 152.763 148.539 150.651 150.651C148.539 152.763 146.864 155.27 145.722 158.029C143.994 162.203 143.994 167.508 143.994 178.098C143.994 188.688 143.994 193.993 142.266 198.166C141.123 200.926 139.448 203.433 137.336 205.545C135.224 207.657 132.717 209.332 129.958 210.474M210.474 129.958C205.038 148.701 195.039 165.805 181.372 179.736C167.705 193.668 150.797 203.993 132.161 209.787L129.958 210.474M166.73 75.7849V66.6905C166.73 53.9582 166.73 47.592 164.254 42.7315C162.076 38.4512 158.599 34.9704 154.321 32.7882C149.45 30.3125 143.084 30.3125 130.352 30.3125H66.6905C53.9582 30.3125 47.592 30.3125 42.7315 32.7882C38.4497 34.9687 34.9687 38.4497 32.7882 42.7315C30.3125 47.5819 30.3125 53.9481 30.3125 66.6905V130.352C30.3125 143.084 30.3125 149.45 32.7882 154.311C34.9709 158.595 38.447 162.071 42.7315 164.254C47.5819 166.73 53.9582 166.73 66.7006 166.73H75.7849"
                      stroke="currentColor"
                      strokeWidth="15.1575"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            <span className="text-gray-500 text-sm">or simply, share your code directly.</span>
            <hr className="mt-3 mb-4" />
            <div className="flex flex-col gap-3">
              <input type="text" className="rounded w-full border border-[#f1f1f1] focus:border-gray-600 p-2" placeholder="Enter customer email to invite them" />
              <button className="text-white w-1/2 bg-linear-to-l from-[#813FD6] to-[#301342] rounded px-2.5 py-1.5">
                Send Invite
              </button>
            </div>
            <div className=" bg-white my-4 rounded-md">
              <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
                Wallet Actions
              </h1>
              <div className="flex items-center justify-between gap-2">
                <button className="border border-[#f1f1f1] rounded cursor-pointer w-1/2 px-2 py-1.5">
                  Withdraw Funds
                </button>
                <button className="border border-[#f1f1f1] rounded cursor-pointer w-1/2 px-2 py-1.5">
                  Bank Account
                </button>
              </div>

              <div className="w-full overflow-x-auto my-3 rounded">
                <table className="w-full min-w-max border-collapse">
                  <thead>
                    <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                      <th className="px-4 py-2 whitespace-nowrap">ID</th>
                      <th className="px-4 py-2 whitespace-nowrap">Amount</th>
                      <th className="px-4 py-2 whitespace-nowrap">Date</th>
                      <th className="px-4 py-2 whitespace-nowrap">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-1 text-sm font-medium text-gray-900">
                        1
                      </td>
                      <td className="px-4 py-1 text-sm text-gray-700">
                        <span>£ 400</span>
                      </td>
                      <td className="px-4 py-1 text-sm text-gray-700">
                        12/03/26
                      </td>
                      <td className="px-4 py-1 text-sm text-gray-700">
                        <span className="p-1 m-1 rounded-xs flex bg-[#e8f7eb]">
                          Completed (12/03/26)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div className="py-3.5 px-6 bg-white rounded-md my-4 space-y-3 hidden">
          <WalletSection cards={fiatData} title="Fiat Wallets" />
          <WalletSection
            cards={cryptoData}
            title="Crypto Wallets"

          />
        </div>

        <div className="py-3.5 px-6 bg-white rounded-md my-4 hidden">
          <div className="flex items-center justify-between">
            <div className="flex  items-center gap-2.5">
              <div className="w-[50px] cursor-pointer flex items-center justify-center h-[50px] rounded-full bg-main text-white">
                <FaUserPlus size={25} />
              </div>
              <div>
                <h1 className="font-poppins font-medium">
                  Invite your friend now by referral code!
                </h1>
                <p className="font-poppins text-sm text-[#454745]">
                  Maximize Rewards - Share your Unique Referral Code for
                  Exclusive Benefits!
                </p>
              </div>
            </div>
            <button className="text-[13px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
              Invite Now <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="py-3.5  bg-white rounded-md my-4 hidden">
          <h1 className="text-[#072032] px-6 text-lg font-semibold font-dm-sans mb-2">
            Latest Sending Log
          </h1>
          <div className="">
            <table className="w-full">
              <thead className="bg-[#e2e8f0] w-full">
                <tr className="w-full">
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Trx
                  </th>
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Sending Amount
                  </th>
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Receiving Amount
                  </th>
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-10">
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

        <div className="py-3.5 bg-white rounded-md my-4 hidden">
          <h1 className="text-[#072032]  px-6 text-lg font-semibold font-dm-sans mb-2">
            Overview
          </h1>

          <hr />
          <div className="relative  px-6 ">
            <div className="absolute flex mt-5 flex-col gap-1 *:cursor-pointer">
              <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-main" /> Send Money:
                0.00
              </div>
              <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark" /> Request
                Money: 0.00
              </div>
              <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark-II" />{" "}
                Deposit: 0.00
              </div>
              <div className="flex items-center gap-1 text-xs font-poppins">
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

export default Partner;
