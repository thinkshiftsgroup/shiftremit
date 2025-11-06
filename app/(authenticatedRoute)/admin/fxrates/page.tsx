"use client";
import SideNav from "@/components/dashboard/sideNav";
import React, { useState } from "react";

const FXRates = () => {
  const [tab, setTab] = useState("all-account");

  return (
    <SideNav>
      <div className="py-10 flex items-start justify-between gap-5">
        <div className="w-1/2  rounded-md bg-white py-3.5 px-6 shadow-md">
          <h1 className="text-[#072032]  text-xl font-semibold font-dm-sans mb-2">
            Rate History
          </h1>

          <div className="border-b border-gray-300 flex items-center gap-6">
            <div
              onClick={() => setTab("all-account")}
              className="flex items-center gap-2 py-2 px-4 cursor-pointer"
            >
              <p className="font-poppins text-sm">Naira (₦)</p>

              <div className="relative flex items-center justify-center">
                <div className="w-5 font-poppins h-5 rounded-full bg-main text-white text-xs flex items-center justify-center">
                  2
                </div>

                {tab === "all-account" && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-main rounded-full"></div>
                )}
              </div>
            </div>

            <div
              onClick={() => setTab("my-account")}
              className="flex items-center gap-2 py-2 px-4 cursor-pointer"
            >
              <p className="font-poppins text-sm">Pounds (£)</p>

              <div className="relative flex items-center justify-center">
                <div className="w-5 font-poppins h-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  0
                </div>

                {tab === "my-account" && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-main rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {tab === "all-account" && (
            <div>
              <div className="flex flex-col items-center justify-center gap-2 h-[60vh]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 20h3.627a5.25 5.25 0 1 1 8.369-6.34Q22 12.9 22 12c0-.442 0-1.608-.002-2H2.002C2 10.392 2 11.558 2 12c0 3.771 0 5.657 1.172 6.828S6.229 20 10 20"
                    opacity=".5"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75"
                  ></path>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4"
                  ></path>
                </svg>
                <p className="font-poppins text-sm text-[#8094ae]">
                  Don't have any data
                </p>
              </div>
            </div>
          )}
          {tab === "my-account" && (
            <div>
              <div className="flex flex-col items-center justify-center gap-2 h-[60vh]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 20h3.627a5.25 5.25 0 1 1 8.369-6.34Q22 12.9 22 12c0-.442 0-1.608-.002-2H2.002C2 10.392 2 11.558 2 12c0 3.771 0 5.657 1.172 6.828S6.229 20 10 20"
                    opacity=".5"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75"
                  ></path>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4"
                  ></path>
                </svg>
                <p className="font-poppins text-sm text-[#8094ae]">
                  Don't have any data
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="w-1/2 rounded-md bg-white  shadow-md">
          <h1 className="text-[#072032] py-3 px-6 text-lg font-semibold font-dm-sans mb-2">
            Manage Live Rates
          </h1>
          <hr />
          <div className="px-6 py-3">
            <div className="space-y-2">
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  NGN (Actual Daily Rates)
                </label>
                <input
                  placeholder="₦"
                  type="text"
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  className="font-poppins font-semibold text-sm text-[#454745] "
                  htmlFor=""
                >
                  GBP (Benchmark Daily Rates)
                </label>
                <input
                  placeholder="£"
                  type="text"
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                />
              </div>
            </div>
            <button
              // onClick={() => router.push("/send-money/fund")}
              className="
         text-white w-full font-poppins border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
         bg-linear-to-l from-[#813FD6] to-[#301342]
         transition-all duration-300 ease-in-out
         hover:border-transparent my-5 text-center 
       "
            >
              Go Live
            </button>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default FXRates;
