"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { filter } from "framer-motion/client";

interface Rate {
  icon: string;
  name: string;
  currentRate: number;
  // oldRate: number | null;
  discount: number;
}

const RateCard = ({ icon, name, currentRate, discount }: Rate) => {
  const isShiftRemit = name === "Shift Remit";

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl">
          <img
            src={icon}
            alt={name}
            // width="64"
            // height="64"
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg md:text-xl font-medium text-white">
          ₦{currentRate.toFixed(2)}
        </p>

        {isShiftRemit ? (
          <p className="text-[16px] md:text-lg text-[#A8ACAB] line-through">
            &nbsp;&nbsp;₦{discount.toFixed(2)}&nbsp;&nbsp;
          </p>
        ) : (
          <p className="text-[16px] md:text-lg text-red-400">
            -₦{discount.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default function CompareRates({ isOpen, setIsOpen }: any) {
  const rates = [
    {
      icon: "/images/brands/vec-1.svg",
      name: "Shift Remit",
      currentRate: 1940.0,
      discount: 1920.0,
    },
    {
      icon: "/images/brands/vec-2.svg",
      name: "Monie Point",
      currentRate: 1907.0,
      discount: 37.0,
    },
    {
      icon: "/images/brands/vec-3.svg",
      name: "Tap Tap",
      currentRate: 1910.0,
      discount: 70.0,
    },
    {
      icon: "/images/brands/vec-4.svg",
      name: "Lem Fi",
      currentRate: 1900.0,
      discount: 43.0,
    },
    {
      icon: "/images/brands/vec-5.svg",
      name: "Send App",
      currentRate: 1850.0,
      discount: 90.0,
    },
    {
      icon: "/images/brands/vec-6.svg",
      name: "Nala",
      currentRate: 1850.0,
      discount: 90.0,
    },
  ];

  return (
    <div className="w-full  mx-auto p-0">
      <div className=" rounded-2xl overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-0 py-6 flex items-start gap-2"
        >
          <div className="text-left">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
              Compare rates
            </h2>
            <p className="text-xs md:text-sm text-gray-200">
              Get up to{" "}
              <span className="font-semibold text-[#01EF01]">₦69.19</span> more
              with us
            </p>
          </div>
          <ChevronDown
            className={`w-8 h-8 text-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-0 md:px-8 pb-2 md:pb-6 grid grid-cols-2 gap-4">
            {rates.map((rate, index) => (
              <RateCard key={index} {...rate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
