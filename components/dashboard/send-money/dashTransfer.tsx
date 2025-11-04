"use client";
import DropdownComponent from "@/components/landing/hero/dropDown";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const DashTf = () => {
  const [sending_amount, setSendingAmount] = useState("");
  const [get_amount, setGetAmount] = useState("");
  return (
    <>
      <div className="relative font-poppins flex flex-wrap justify-between items-start mb-4">
        <div className="w-[calc(50%-16px)] ">
          <label className="text-black text-sm font-dm-sans font-medium block mb-2">
            You send exactly
          </label>
          <div
            className="flex relative flex-wrap items-center justify-between border border-black ps-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="sendMoneyBox"
          >
            <input
              type="text"
              name="sending_amount"
              value={sending_amount}
              onChange={(e) => setSendingAmount(e.target.value)}
              id="sending_amount"
              placeholder="1"
              aria-label="Sending Money"
              className="focus:ring-0 focus:border-transparent outline-none"
            />

            <button
              type="button"
              id="sendMoneyCurrencyBtn"
              className="w-[90px] inline-flex items-center gap-1 relative"
            >
              <DropdownComponent />
            </button>
          </div>
          <p id="sendingError" className="text-deep-danger text-sm mt-1"></p>
        </div>

        <div className="absolute top-[35px] left-[calc(50%-20px)] z-1 -me-5">
          <span
            className=" bg-[#813FD6] inline-flex items-center justify-center rounded-full w-10 h-10  before:content-['']  outline-4 outline-white
                        before:absolute 
                        before:top-0 
                        before:-left-[7px] 
                        before:w-full 
                        before:h-full 
                        before:bg-white
                        before:-z-10 
                        before:rounded-full 
                        before:border 
                        before:border-white
                        
                        
                        after:content-[''] 
                        after:absolute 
                        after:top-0 
                        after:-right-[7px] 
                        after:w-full 
                        after:h-full 
                        after:bg-white 
                        after:-z-10 
                        after:rounded-full 
                        after:border 
                        after:border-white"
          >
            <FaArrowRight className="text-lg text-white" />
          </span>
        </div>

        <div className="w-[calc(50%-16px)]">
          <label className="text-black text-sm font-dm-sans font-medium block mb-2">
            You get exactly
          </label>
          <div
            className="flex relative flex-wrap items-center justify-between border border-black pe-2.5 px-4 py-3 rounded-[8.5px] w-full"
            id="receiveMoneyBox"
            data-country="norway"
            data-currency="EUR"
          >
            <input
              type="text"
              name="sending_amount"
              value={get_amount}
              onChange={(e) => setGetAmount(e.target.value)}
              id="sending_amount"
              placeholder="1500"
              aria-label="Sending Money"
              className="focus:ring-0 focus:border-transparent outline-none"
            />
            <button
              type="button"
              id="receiveMoneyCurrencyBtn"
              className="w-[90px] inline-flex items-center gap-1 relative"
            >
              <DropdownComponent defaultCurrency="NGN" />
            </button>
          </div>
          <p id="receivingError" className="text-deep-danger text-sm mt-1"></p>
        </div>
      </div>
    </>
  );
};

export default DashTf;
