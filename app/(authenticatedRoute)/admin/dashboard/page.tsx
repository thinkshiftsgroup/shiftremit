"use client";
import { useEffect, useMemo, useState } from "react";
import SideNav from "@/components/dashboard/sideNav";
import { FaArrowUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { RiArrowRightUpLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoPlus } from "react-icons/go";

import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import { WalletSection } from "@/components/dashboard/wallets";
import { ChartRadialSimple } from "@/components/dashboard/overviewChart";

import { useRatesStore } from "@/stores/useRatesStore";
import { useTrx } from "../../user/transactions/useTrx";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { LuArrowUpRight } from "react-icons/lu";
import FilterComponent from "@/components/admin/filterBar";

interface RateCard {
  country: string;
  name: string;
  amount: number;
  lastTxs: number;
}

interface Rate {
  icon: string;
  name: string;
  currentRate: number;
  discount: number;
}

const PROVIDER_MAP: {
  [key: string]: { name: string; icon: string; lastTxs: number };
} = {
  "Shift Remit": {
    name: "Shift Remit",
    icon: "/images/brands/vec-1.svg",
    lastTxs: 0,
  },
  MonieWorld: {
    name: "MonieWorld",
    icon: "/images/brands/vec-2.svg",
    lastTxs: 30,
  },
  Nala: { name: "Nala", icon: "/images/brands/vec-6.svg", lastTxs: 0.0 },
  LemFi: { name: "LemFi", icon: "/images/brands/vec-4.svg", lastTxs: 37 },
  FlutterSend: {
    name: "FlutterSend",
    icon: "/images/brands/vec-5.svg",
    lastTxs: 0.0,
  },
  "TapTap Send": {
    name: "TapTap Send",
    icon: "/images/brands/vec-3.svg",
    lastTxs: 0.0,
  },
};
const Dashboard = () => {
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
  const { ratesData, adminRateData, isLoading, fetchAdminRate, fetchRates } =
    useRatesStore();

  useEffect(() => {
    if (!ratesData && !adminRateData && !isLoading) {
      fetchRates();
      fetchAdminRate();
    }
  }, [ratesData, isLoading, fetchRates]);

  const benchmarkGBP = adminRateData?.benchmarkGBP || 8;

  const { dynamicFiatData, rateDifference } = useMemo(() => {
    if (!ratesData) {
      return { dynamicFiatData: [], rateDifference: 0 };
    }

    const lemfiRate = ratesData.lemfi.rate;

    const shiftRemitCurrentRate = lemfiRate + benchmarkGBP;

    const allRates: Rate[] = [
      {
        ...PROVIDER_MAP["Shift Remit"],
        currentRate: shiftRemitCurrentRate,
        discount: 0,
      },
      // {
      //   ...PROVIDER_MAP["MonieWorld"],
      //   currentRate: moniepointRate,
      //   discount: 0,
      // },
      // {
      //   ...PROVIDER_MAP["TapTap Send"],
      //   currentRate: tapTapCurrentRate,
      //   discount: 0,
      // },
      {
        ...PROVIDER_MAP["Nala"],
        currentRate: ratesData.nala.rate,
        discount: 0,
      },
      {
        ...PROVIDER_MAP["LemFi"],
        currentRate: ratesData.lemfi.rate,
        discount: 0,
      },
      {
        ...PROVIDER_MAP["FlutterSend"],
        currentRate: ratesData.sendApp.rate,
        discount: 0,
      },
    ];

    const shiftRemitRate =
      allRates.find((r) => r.name === "Shift Remit")?.currentRate || 0;

    const competitorRates = allRates.filter((r) => r.name !== "Shift Remit");

    const lowestCompetitorRate =
      competitorRates.length > 0
        ? Math.min(...competitorRates.map((r) => r.currentRate))
        : 0;

    const calculatedRateDifference = Math.max(
      0,
      shiftRemitRate - lowestCompetitorRate
    );

    const highestRate = shiftRemitRate;

    const competitorCards: RateCard[] = allRates
      // .filter((rate) => rate.name !== "Shift Remit")
      .map((rate) => {
        const discount = Math.max(0, highestRate - rate.currentRate);

        return {
          country: rate.icon,
          name: rate.name,
          amount: rate.currentRate,
          lastTxs: parseFloat(discount.toFixed(2)),
        };
      });

    return {
      dynamicFiatData: competitorCards,
      rateDifference: calculatedRateDifference,
    };
  }, [ratesData]);

  const difference = isLoading
    ? ""
    : rateDifference > 0
    ? rateDifference.toFixed(2)
    : "";

  const [page, setPage] = useState(1);
  const { getBankTrfsAdmin } = useTrx();
  const { data, isLoading: tfLoad } = getBankTrfsAdmin({
    page,
    limit: 5,
    status: "COMPLETED",
    transactionReference: "",
    startDate: "",
    endDate: "",
    recipientName: "",
    senderName: "",
    sortOrder: "",
    sortBy: "",
  });
  const Trxs = data?.transfers || [];

  return (
    <SideNav>
      <div className="py-3 md:py-5">
        <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
          <div>
            <p className="text-[#454745] text-sm font-poppins mb-2">
              Welcome Back
            </p>
            <h1 className="font-dm-sans font-medium text-xl text-[#072032] hidden md:flex items-center gap-1">
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
              , Hello Remi Tony
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-[13px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
              Send <FaArrowUp />
            </button>
            {/* <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Deposit <FaPlus />
            </button>
            <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Request Money <FaPlus />
            </button> */}
            {/* <button className="text-[13px] font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer flex items-center gap-1 bg-white text-[#072032]">
              Exchange Money <FaArrowDown />
            </button> */}
          </div>
        </div>

        <div className="px-2.5 py-4 md:py-3.5 md:px-6 bg-white rounded-md my-4">
          <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
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
                    {card.amount} GBP
                  </h1>
                  <p className="text-xs font-poppins text-[#454745]">
                    Last transaction{" "}
                    <span className="text-[#22c55e] font-medium">
                      {card.lastTxn} GBP
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className=" bg-white border my-4 border-gray-200 rounded-md">
            <div className="flex items-center justify-between gap-2 py-2 px-3">
              <h1 className="text-[#072032] font-semibold text-xl font-dm-sans mb-2">
                Quick Recipients
              </h1>
              <p className="text-main font-semibold flex items-center gap-1 font-poppins text-sm">
                View All <MdKeyboardArrowRight className="" />{" "}
              </p>
            </div>
            <hr />

            <div className="">
              <div className="inline-flex flex-col py-2 px-3 gap-2 items-center">
                <div className="w-[50px] cursor-pointer flex items-center justify-center h-[50px] rounded-full bg-main text-white">
                  <GoPlus size={25} />
                </div>
                <p className=" text-sm font-medium  font-dm-sans">Add</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-3.5 px-6 bg-white rounded-md my-4 space-y-3">
          <WalletSection cards={dynamicFiatData} rateDifference={difference} />
        </div>

        <div className="py-3.5 px-6 bg-white rounded-md my-4">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row">
            <div className="flex  items-start md:items-center gap-2.5 flex-col md:flex-row">
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
        {/* <FilterComponent /> */}
        <div className="py-3.5  bg-white rounded-md my-4">
          <h1 className="text-[#072032] px-6 text-lg font-semibold font-dm-sans mb-2">
            Latest Transaction Log
          </h1>
          <div className=" ">
            <div className="w-full overflow-x-auto">
              <table className="w-full font-poppins min-w-max border-collapse">
                <thead>
                  <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                    <th className="px-4 py-2 whitespace-nowrap">Customer</th>
                    <th className="px-4 py-2 whitespace-nowrap">Trx ID</th>
                    <th className="px-4 py-2 whitespace-nowrap">Sending Trx</th>
                    <th className="px-4 py-2 whitespace-nowrap">Recipient</th>
                    <th className="px-4 py-2 whitespace-nowrap">Date</th>
                    <th className="px-4 py-2 whitespace-nowrap">Status</th>
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
                    Trxs.map((row: any, index: any) => (
                      <tr
                        key={row.no}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                        } border-b border-gray-100`}
                      >
                        <td className="px-4 py-1 flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-900">
                          {row.user.fullName}
                          <LuArrowUpRight size={14} />
                        </td>
                        <td className="px-4 py-1 text-sm text-gray-700">
                          {row.transferReference}
                        </td>
                        <td className="px-4 py-1 text-sm text-gray-700">
                          <span className="font-bold">£{row.amount}</span>
                          {/* (ref:{row.id}) */}
                        </td>
                        <td className="px-4 flex flex-col py-1 text-sm text-gray-700">
                          <span className="font-medium">
                            {row.recipientFullName}
                          </span>
                          <span>{row.recipientAccountNumber}</span>
                          <span>{row.recipientBankName}</span>
                        </td>
                        <td className="px-4 py-1 text-sm text-gray-700">
                          {new Date(row.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-1 gap-1 flex flex-col text-sm text-gray-700">
                          <span
                            className={`p-1 text-center rounded-sm border capitalize ${
                              row.status === "COMPLETED"
                                ? "bg-green-500/20 text-green-500 border-green-500"
                                : row.status === "PENDING"
                                ? "bg-[#FFB90D]/20 text-[#FFB90D] border-[#FFB90D]"
                                : "bg-red-500/20 text-red-500 border-red-500"
                            }`}
                          >
                            {row.status === "COMPLETED"
                              ? "DELIVERED"
                              : row.status === "PENDING"
                              ? "IN REVIEW"
                              : row.status}
                          </span>
                          <span className="flex items-center gap-1">
                            {row.status !== "PENDING" ? (
                              new Date(row.updatedAt).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            ) : (
                              <span className="text-gray-400 italic"></span>
                            )}

                            <a target="_blank" href={row.pdfFile}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                className="text-black"
                              >
                                <g fill="">
                                  <path d="M6.5 12a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M11.185 1H4.5A1.5 1.5 0 0 0 3 2.5v15A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5V7.202a1.5 1.5 0 0 0-.395-1.014l-4.314-4.702A1.5 1.5 0 0 0 11.185 1M4 2.5a.5.5 0 0 1 .5-.5h6.685a.5.5 0 0 1 .369.162l4.314 4.702a.5.5 0 0 1 .132.338V17.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z"
                                    clipRule="evenodd"
                                  />
                                  <path d="M11 7h5.5a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0z" />
                                </g>
                              </svg>
                            </a>
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
                  Page {data?.meta.currentPage}
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
        </div>

        <div className="py-3.5 bg-white rounded-md my-4">
          <h1 className="text-[#072032]  px-6 text-lg font-semibold font-dm-sans mb-2">
            Overview
          </h1>

          <hr />
          <div className="relative  px-6 ">
            <div className="absolute flex mt-5 flex-col gap-1 *:cursor-pointer z-50">
              <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-main" /> Send Money:
                0.00
              </div>
              <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark" /> Request
                Money: 0.00
              </div>
              {/* <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-main-dark-II" />{" "}
                Deposit: 0.00
              </div>
              <div className="flex items-center gap-1 text-xs font-poppins">
                <div className="w-3 h-3 rounded-full bg-primary" /> Withdraw:
                0.00
              </div> */}
            </div>
            <ChartRadialSimple />
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default Dashboard;
