"use client";
import SendMoneyUI from "@/components/dashboard/send-money/sendMoney";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
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
    </SideNav>
  );
};

export default SendMoney;
