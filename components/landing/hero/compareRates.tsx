"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Rate {
  icon: string;
  // name: string;
  currentRate: number;
  // oldRate: number | null;
  discount: number;
}

const RateCard = ({ icon, currentRate, discount }: Rate) => (
  <div className="flex items-center gap-3 py-4">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl">
        <img
          src={icon}
          alt={"image"}
          width="64"
          height="64"
          className="w-16 h-16 rounded-lg object-cover"
        />
      </div>
    </div>
    <div className="text-right">
      <p className="text-xl font-medium text-white">
        ₦{currentRate.toFixed(2)}
      </p>
      <p className="text-sm text-red-400">-₦{discount.toFixed(2)}</p>
    </div>
  </div>
);

export default function CompareRates() {
  const [isOpen, setIsOpen] = useState(true);

  const rates = [
    {
      icon: "/images/brands/vec-1.svg",
      name: "Provider A",
      currentRate: 1940.0,
      discount: 69.19,
    },
    {
      icon: "/images/brands/vec-2.svg",
      name: "Provider M",
      currentRate: 1907.0,
      discount: 37.0,
    },
    {
      icon: "/images/brands/vec-3.svg",
      name: "Provider B",
      currentRate: 1910.0,
      discount: 70.0,
    },
    {
      icon: "/images/brands/vec-4.svg",
      name: "Provider C",
      currentRate: 1900.0,
      discount: 43.0,
    },
    {
      icon: "/images/brands/vec-5.svg",
      name: "Provider D",
      currentRate: 1850.0,
      discount: 90.0,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-0">
      <div className=" rounded-2xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-0 py-6 flex items-start gap-2"
        >
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Compare rates
            </h2>
            <p className="text-sm text-gray-200">
              Get up to ₦69.19 more with us
            </p>
          </div>
          <ChevronDown
            className={`w-8 h-8 text-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-8 pb-6 grid grid-cols-2 gap-4">
            {rates.map((rate, index) => (
              <RateCard key={index} {...rate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
