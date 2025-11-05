"use client"
import SideNav from "@/components/dashboard/sideNav";
import { cryptoData, fiatData } from "@/data/data";
import React, { useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

const Wallets = () => {
  const [tab, setTab] = useState("all-account");
  return (
    <SideNav>
      {/* <div className="py-5">
        <div className="mb-5"> 
          <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
            Fiats Wallets
          </h1>

          <div className="grid grid-cols-3 gap-5">
            {fiatData.map((fiat, index) => {
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-md cursor-pointer flex items-center justify-between gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={fiat.country}
                      alt=""
                      className="w-11 h-11 rounded-fill object-cover"
                    />
                    <div>
                      <h1 className="font-poppins font-medium">{fiat.amount} {fiat.name}</h1>
                      <p className="text-xs font-poppins text-[#454745]">
                        Last Transaction: {fiat.lastTxs} {fiat.name}
                      </p>
                    </div>
                  </div>
                  <RiArrowRightUpLine className="text-[#072032]" size={20} />
                </div>
              );
            })}
          </div>
        </div>

        <hr />

        <div className="mt-5"> 
          <h1 className="text-[#072032] text-lg font-semibold font-dm-sans mb-2">
            Crypto Wallets
          </h1>

          <div className="grid grid-cols-3 gap-5">
            {cryptoData.map((crypto, index) => {
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-md cursor-pointer flex items-center justify-between gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={crypto.country}
                      alt=""
                      className="w-11 h-11 rounded-fill object-cover"
                    />
                    <div>
                      <h1 className="font-poppins font-medium">{crypto.amount} {crypto.name}</h1>
                      <p className="text-xs font-poppins text-[#454745]">
                        Last Transaction: {crypto.lastTxs} {crypto.name}
                      </p>
                    </div>
                  </div>
                  <RiArrowRightUpLine className="text-[#072032]" size={20} />
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
      <div className="py-10 flex items-center justify-between gap-5">
        <div className="w-1/2 rounded-md bg-white py-3.5 px-6 shadow-md">
          <h1 className="text-[#072032]  text-lg font-semibold font-dm-sans mb-2">
            All Recipients
          </h1>

          <div className="border-b flex items-center gap-2">
            <div
              onClick={() => setTab("all-account")}
              className={`font-poppins text-xs ${
                tab === "all-account"
                  ? "text-main border-b-2 border-b-main"
                  : "text-black"
              } cursor-pointer flex items-center gap-2 py-2 px-4`}
            >
              <p>All Account</p>
              <p
                className={`${
                  tab === "all-account" ? "bg-main" : "bg-black"
                } rounded-full p-1 text-white w-4.5 h-4.5 flex items-center justify-center`}
              >
                0
              </p>
            </div>
            <div
              onClick={() => setTab("my-account")}
              className={`font-poppins text-xs ${
                tab === "my-account"
                  ? "text-main border-b-2 border-b-main"
                  : "text-black"
              } cursor-pointer flex items-center gap-2 py-2 px-4`}
            >
              <p>My Account</p>
              <p
                className={`${
                  tab === "my-account" ? "bg-main" : "bg-black"
                } rounded-full p-1 text-white w-4.5 h-4.5 flex items-center justify-center`}
              >
                0
              </p>
            </div>
          </div>

          <div className="h-[50vh] flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
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
                  fill-rule="evenodd"
                  d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill="currentColor"
                  d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4"
                ></path>
              </svg>
              <p className="font-poppins text-xs text-[#8094ae]">
                Don't have any data
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 rounded-md bg-white  shadow-md">
          <h1 className="text-[#072032] py-3.5 px-6 text-lg font-semibold font-dm-sans mb-2">
            Add New Recipients
          </h1>
          <hr />
          <div className="h-[55vh] px-6 py-3">
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="w-full flex gap-2 flex-col font-poppins text-sm">
                <label className="font-semibold" htmlFor="">
                  Currency Type
                </label>
                <select
                  name=""
                  id=""
                  className="active:border-main rounded-md border p-3 border-[#dee2e6]"
                >
                  <option value="">Select Type</option>
                  <option value="">Fiat Currency</option>
                  <option value="">Crypto Currency</option>
                </select>
              </div>
              <div className="w-full flex gap-2 flex-col font-poppins text-sm">
                <label className="font-semibold" htmlFor="">
                  Currency
                </label>
                <select
                  name=""
                  id=""
                  className="active:border-main rounded-md border p-3 border-[#dee2e6]"
                >
                  <option value="">Select a currency</option>
                </select>
              </div>
              <div className="w-full flex gap-2 flex-col font-poppins text-sm">
                <label className="font-semibold" htmlFor="">
                  Recipient Type
                </label>
                <select
                  name=""
                  id=""
                  className="active:border-main rounded-md border p-3 border-[#dee2e6]"
                >
                  <option value="">System User</option>
                  <option value="">External User</option>
                  <option value="">My Account</option>
                </select>
              </div>
              <div className="w-full flex gap-2 flex-col font-poppins text-sm">
                <label className="font-semibold" htmlFor="">
                  Recipient name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="active:border-main rounded-md border p-3 border-[#dee2e6]"
                  placeholder="Enter Recipient Name"
                />
              </div>
            </div>
            <div className="w-full flex gap-2 flex-col font-poppins text-sm">
              <label className="font-semibold" htmlFor="">
                Recipient email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="active:border-main rounded-md border p-3 border-[#dee2e6]"
                placeholder="Enter Recipient Email"
              />
            </div>
            <div className="mt-5 flex justify-end">
              <button className="bg-main text-white rounded-md py-2 px-4 cursor-pointer font-poppins">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default Wallets;
