"use client";
import SendMoneyUI from "@/components/dashboard/send-money/sendMoney";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { WalletSection } from "@/components/dashboard/wallets";
import { cryptoData, fiatData } from "@/data/data";
import React, { useState } from "react";

const SendMoney = () => {
  return (
    <SideNav>
      <div className="my-7 bg-white  rounded-lg mx-auto ">
        <SendSteps step={1} />

        <div className="my-10">
          <h1 className=" text-3xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Send Money
          </h1>
          <p className="font-poppins text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <SendMoneyUI />
      </div>
      <div className="py-3.5 px-6 bg-white font-poppins font-semibold rounded-md my-4 space-y-3">
        <p>Get up to <span className="text-green-900" >₦69.19</span> more with ShiftRemit</p>
        <WalletSection cards={fiatData} title="Compare  Rates" />
      </div>
    </SideNav>
  );
};

export default SendMoney;
