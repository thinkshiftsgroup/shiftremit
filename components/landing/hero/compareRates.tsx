"use client";

import { useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useRatesStore } from "@/stores/useRatesStore";
import { FxRateData, AdminRateData } from "@/api/rateService";
import { reorderRates } from "@/helper/utils";

interface Rate {
  icon: string;
  name: string;
  currentRate: number;
  discount: number;
}

const PROVIDER_MAP: { [key: string]: { name: string; icon: string } } = {
  "Shift Remit": { name: "Shift Remit", icon: "/images/brands/vec-1.svg" },
  // moniepoint: { name: "Moniepoint", icon: "/images/brands/vec-2.svg" },
  nala: { name: "Nala", icon: "/images/brands/vec-6.svg" },
  lemfi: { name: "LemFi", icon: "/images/brands/vec-4.svg" },
  sendApp: { name: "Send App", icon: "/images/brands/vec-5.svg" },
  "Tap Tap": { name: "Tap Tap", icon: "/images/brands/vec-3.svg" },
};

const RateCard = ({ icon, name, currentRate, discount }: Rate) => {
  const isShiftRemit = name === "Shift Remit";

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl">
          <img
            src={icon}
            alt={name}
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
  const ratesData = useRatesStore(
    (state) => state.ratesData as FxRateData | null
  );
  const isLoading = useRatesStore((state) => state.isLoading);
  const error = useRatesStore((state) => state.error);
  const adminRateData = useRatesStore(
    (state) => state.adminRateData as AdminRateData | null
  );

  const rates: Rate[] = useMemo(() => {
    if (!ratesData) {
      return [];
    }

    const benchmarkGBP = adminRateData?.benchmarkGBP || 8;

    const lemfiRate = ratesData?.lemfi?.rate || 1903;

    const shiftRemitCurrentRate = lemfiRate + benchmarkGBP;

    const baseComparisonRate = shiftRemitCurrentRate;

    const rawRates: (Rate & { sortRate: number })[] = [
      {
        ...PROVIDER_MAP["Shift Remit"],
        currentRate: shiftRemitCurrentRate,
        discount: lemfiRate,
        sortRate: shiftRemitCurrentRate,
      },
      // {
      //   ...PROVIDER_MAP["Tap Tap"],
      //   currentRate: tapTapCurrentRate,
      //   discount: baseComparisonRate - tapTapCurrentRate,
      //   sortRate: tapTapCurrentRate,
      // },
      // {
      //   ...PROVIDER_MAP["moniepoint"],
      //   currentRate: moniepointRate,
      //   discount: baseComparisonRate - moniepointRate,
      //   sortRate: moniepointRate,
      // },
      {
        ...PROVIDER_MAP["nala"],
        currentRate: ratesData?.nala?.rate || 1895,
        discount: baseComparisonRate - ratesData?.nala?.rate || 1895,
        sortRate: ratesData?.nala?.rate || 1895,
      },
      {
        ...PROVIDER_MAP["lemfi"],
        currentRate: ratesData?.lemfi?.rate || 1903,
        discount: baseComparisonRate - ratesData?.lemfi?.rate || 1903,
        sortRate: ratesData?.lemfi?.rate || 1903,
      },
      {
        ...PROVIDER_MAP["sendApp"],
        currentRate: ratesData?.sendApp?.rate || 1885,
        discount: baseComparisonRate - ratesData?.sendApp?.rate || 1885,
        sortRate: ratesData?.sendApp?.rate || 1885,
      },
    ];

    const sortedRates = rawRates
      .sort((a, b) => b.sortRate - a.sortRate)
      .map(({ sortRate, ...rest }) => rest);

    return reorderRates(sortedRates);
  }, [ratesData, adminRateData]);

  const shiftRemitRate =
    rates.find((r) => r.name === "Shift Remit")?.currentRate || 0;
  const lowestRate = rates.length > 0 ? rates[rates.length - 1].currentRate : 0;
  const rateDifference = Math.max(0, shiftRemitRate - lowestRate);

  return (
    <div className="w-full  mx-auto p-0">
      <div className=" rounded-2xl overflow-hidden">
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
              <span className="font-semibold text-[#01EF01]">
                ₦{rateDifference.toFixed(2)}
              </span>{" "}
              more with us
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
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-0 md:px-8 pb-2 md:pb-6 grid grid-cols-2 gap-4">
            {isLoading ? (
              <p className="text-white col-span-2">
                Loading comparison rates...
              </p>
            ) : error ? (
              <p className="text-red-400 col-span-2">Error: {error}</p>
            ) : (
              rates.map((rate) => <RateCard key={rate.name} {...rate} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
