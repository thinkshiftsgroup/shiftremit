import SendMoneyUI from "@/components/dashboard/send-money/sendMoney";
import SideNav from "@/components/dashboard/sideNav";
import React from "react";

const SendMoney = () => {
  return (
    <SideNav>
      <div className="my-7 bg-white  rounded-lg mx-auto ">
        <div className="flex py-3.5 px-6 border-b items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="w-6 h-6 p-1 rounded-full flex items-center justify-center font-semibold font-poppins bg-[#e2e8f0]">
              1
            </p>
            <p className="font-poppins text-[#454745] font-medium text-sm">
              Amount
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-6 h-6 p-1 rounded-full flex items-center justify-center font-semibold font-poppins bg-[#e2e8f0]">
              2
            </p>
            <p className="font-poppins text-[#454745] font-medium text-sm">
              Recipient
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-6 h-6 p-1 rounded-full flex items-center justify-center font-semibold font-poppins bg-[#e2e8f0]">
              3
            </p>
            <p className="font-poppins text-[#454745] font-medium text-sm">
              Pay
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-6 h-6 p-1 rounded-full flex items-center justify-center font-semibold font-poppins bg-[#e2e8f0]">
              4
            </p>
            <p className="font-poppins text-[#454745] font-medium text-sm">
              Preview
            </p>
          </div>
        </div>

        <div className="my-10">
          <h1 className=" text-3xl text-[#072032] font-dm-sans text-center mb-3 font-medium">
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
