import SideNav from "@/components/dashboard/sideNav";
import { cryptoData, fiatData } from "@/data/data";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

const Wallets = () => {

  return (
    <SideNav>
      <div className="py-5">
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
      </div>
    </SideNav>
  );
};

export default Wallets;
