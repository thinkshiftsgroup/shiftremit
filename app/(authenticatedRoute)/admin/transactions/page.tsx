"use client";
import SideNav from "@/components/dashboard/sideNav";
import { Calendar, Check, Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { useTrx } from "../../user/transactions/useTrx";
import AdminDataTable from "@/components/admin/dataTable";
import FilterComponent from "@/components/admin/filterBar";

const AminTrx = () => {
  const partnerCode = "SR7X2AI";

  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(1);
  const { getBankTrfsAdmin } = useTrx();
  const { data, isLoading } = getBankTrfsAdmin({ page, limit: 10, status: "" });
  const Trxs = data?.transfers || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(partnerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [showAPT, setShowAPT] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchId, setSearchId] = useState("");

  const handleFilter = () => {
    console.log({ searchId, startDate, endDate });
  };
  return (
    <SideNav>
      <div className="py-5 font-poppins">
        <FilterComponent />
        <div className="flex items-center justify-between gap-2 mb-3 flex-col lg:flex-row">
          <div>
            <p className="text-[#072032] text-lg font-poppins mb-2 font-semibold">
              Transactions
            </p>
            <h1 className="font-dm-sans font-medium text-[16px] text-[#454745] hidden lg:flex items-center gap-1">
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
        </div>
        <div className="bg-white flex gap-0 flex-col md:flex-row">
          <div className="py-3.5 px-6 pe-3 bg-white rounded-md my-4 md:w-6/10">
            <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
              Transactions
            </h1>
            <p>{data?.kpis.totalTransactions || 0} Transaction</p>
            <div className="flex lg:hidden items-center gap-3 mb-2 md:mb-5 lg:mb-15 lg:mt-5">
              <div className="relative ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="TRX ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 border border-[#f1f1f1] rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleFilter}
                className="px-6 py-1.5 bg-[#e1e7ef] font-medium rounded transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
            </div>
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="TRX ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 border border-[#f1f1f1] rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}
            <div className="flex items-center gap-3 mb-15 mt-5 flex-col md:flex-row">
              {/* Search Input */}

              {/* Start Date */}
              <div className="relative w-full md:w-auto">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="pl-10 pr-4 py-1.5 border border-[#f1f1f1] rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto"
                />
              </div>

              <span className="text-gray-700 font-medium hidden sm:inline">
                to
              </span>
              {/* End Date */}
              <div className="relative w-full md:w-auto">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="pl-10 pr-4 py-1.5 border border-[#f1f1f1] rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  w-full md:w-auto"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={handleFilter}
                className="px-6 py-1.5 bg-[#e1e7ef] font-medium rounded transition-colors duration-200 hidden lg:flex items-center gap-2 whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>
          <hr className="rotate-180" />
          <div className="py-3.5 bg-white my-4 md:w-4/10 space-y-3 md:border-l ps-3">
            <div className="flex gap-2">
              <div className="rounded-full p-3 w-14 flex justify-center items-center h-14 bg-[#dbefe5] text-[#23c45f]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.005 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15zm-14 2v10h16V9zm0-4v2h12V5zm11 8h3v2h-3z"
                    strokeWidth={0.5}
                    stroke="currentColor"
                  ></path>
                </svg>
              </div>
              <div className="">
                <div className="flex flex-col">
                  <p className="">Total Transaction Amount</p>
                  <div className="flex items-center lg:items-center my-2 gap-1 flex-col lg:flex-row">
                    <div className="relative">
                      {/* <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="pl-4 lg:pl-0 pr-4 py-1.5 border border-[#f1f1f1] text-sm rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* <span className="text-gray-700 font-medium hidden sm:inline">
                      to
                    </span> */}
                    {/* End Date */}
                    <div className="relative">
                      {/* <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="pl-4 lg:pl-0 pr-4 py-1.5 border border-[#f1f1f1] text-sm rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-gray-600 font-bold text-xl font-dm-sans">
                      {data?.totals?.totalAmountGBP || 0} GBP
                    </h1>
                    <select
                      className="text-gray-600 font-bold text-xl font-dm-sans"
                      name=""
                      id=""
                    >
                      <option value="">NGN</option>
                      <option value="">GBP</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded space-y-1.5 p-3">
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm text-medium">
                  Transactions
                </span>
                <span className="text-black font-semibold text-sm text-right">
                  {data?.kips?.totalTransactions || 0}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm text-medium">Since</span>
                <span className="text-black font-semibold text-sm">
                  03 Nov 2025
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm text-medium">
                  Completed
                </span>
                <span className="p-1 rounded-xs flex bg-[#e8f7eb] text-xs">
                  {data?.kips?.totalCompleted || 0}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm text-medium">
                  Abandoned
                </span>
                <span className="text-black font-semibold text-sm">
                  {" "}
                  {data?.kips?.totalAbandoned || 0}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm text-medium">
                  Pending
                </span>
                <span className="text-black font-semibold text-sm">
                  {" "}
                  {data?.kips?.totalPending || 0}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm text-medium">
                  Failed
                </span>
                <span className="text-black font-semibold text-sm">
                  {" "}
                  {data?.kips?.totalFailed || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-3.5 bg-white rounded-md my-4 overflow-hidden">
          <AdminDataTable
            Trxs={Trxs}
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            data={data}
          />
        </div>
      </div>
    </SideNav>
  );
};

export default AminTrx;
