"use client";
import SendMoneyUI from "@/components/dashboard/send-money/sendMoney";
import SendSteps from "@/components/dashboard/send-money/sendSteps";
import SideNav from "@/components/dashboard/sideNav";
import { WalletSection } from "@/components/dashboard/wallets";
import { useEffect, useMemo } from "react";
import { useRatesStore } from "@/stores/useRatesStore";
import { AdminRateData, FxRateData } from "@/api/rateService";

interface RateCard {
  country: string;
  name: string;
  amount: number;
  lastTxs: number;
}

interface Rate {
  icon: string;
  name: string;
  currentRate: number;
  discount: number;
}

const PROVIDER_MAP: {
  [key: string]: { name: string; icon: string; lastTxs: number };
} = {
  "Shift Remit": {
    name: "Shift Remit",
    icon: "/images/brands/vec-1.svg",
    lastTxs: 0,
  },
  // MonieWorld: {
  //   name: "MonieWorld",
  //   icon: "/images/brands/vec-2.svg",
  //   lastTxs: 30,
  // },
  Nala: { name: "Nala", icon: "/images/brands/vec-6.svg", lastTxs: 0.0 },
  LemFi: { name: "LemFi", icon: "/images/brands/vec-4.svg", lastTxs: 37 },
  FlutterSend: {
    name: "FlutterSend",
    icon: "/images/brands/vec-5.svg",
    lastTxs: 0.0,
  },
  "TapTap Send": {
    name: "TapTap Send",
    icon: "/images/brands/vec-3.svg",
    lastTxs: 0.0,
  },
};

const SendMoney = () => {
  const { fetchRates } = useRatesStore();
  

  const ratesData = useRatesStore(
    (state) => state.ratesData as FxRateData | null
  );
  const adminRateData = useRatesStore(
    (state) => state.adminRateData as AdminRateData | null
  );
  const isLoading = useRatesStore((state) => state.isLoading);

  useEffect(() => {
    if (!ratesData && !adminRateData && !isLoading) {
      fetchRates();
    }
  }, [ratesData, isLoading, fetchRates]);

  const benchmarkGBP = adminRateData?.benchmarkGBP || 8;

  const { dynamicFiatData, rateDifference } = useMemo(() => {
    if (!ratesData) {
      return { dynamicFiatData: [], rateDifference: 0 };
    }

    const lemfiRate = ratesData?.lemfi?.rate || 1903;

    const shiftRemitCurrentRate = lemfiRate + benchmarkGBP;

    const allRates: Rate[] = [
      {
        ...PROVIDER_MAP["Shift Remit"],
        currentRate: shiftRemitCurrentRate,
        discount: 0,
      },
      // {
      //   ...PROVIDER_MAP["MonieWorld"],
      //   currentRate: moniepointRate,
      //   discount: 0,
      // },
      {
        ...PROVIDER_MAP["LemFi"],
        currentRate: ratesData?.lemfi?.rate || 1903,
        discount: 0,
      },
      // {
      //   ...PROVIDER_MAP["TapTap Send"],
      //   currentRate: tapTapCurrentRate,
      //   discount: 0,
      // },
      {
        ...PROVIDER_MAP["Nala"],
        currentRate: ratesData?.nala?.rate || 1895,
        discount: 0,
      },

      {
        ...PROVIDER_MAP["FlutterSend"],
        currentRate: ratesData?.sendApp?.rate || 1885,
        discount: 0,
      },
    ];

    const shiftRemitRate =
      allRates.find((r) => r.name === "Shift Remit")?.currentRate || 0;

    const competitorRates = allRates.filter((r) => r.name !== "Shift Remit");

    const lowestCompetitorRate =
      competitorRates.length > 0
        ? Math.min(...competitorRates.map((r) => r.currentRate))
        : 0;

    const calculatedRateDifference = Math.max(
      0,
      shiftRemitRate - lowestCompetitorRate
    );

    const highestRate = shiftRemitRate;

    const competitorCards: RateCard[] = allRates
      // .filter((rate) => rate.name !== "Shift Remit")
      .map((rate) => {
        const discount = Math.max(0, highestRate - rate.currentRate);

        return {
          country: rate.icon,
          name: rate.name,
          amount: rate.currentRate,
          lastTxs: parseFloat(discount.toFixed(2)),
        };
      });

    return {
      dynamicFiatData: competitorCards,
      rateDifference: calculatedRateDifference,
    };
  }, [ratesData]);

  const difference = isLoading
    ? ""
    : rateDifference > 0
    ? rateDifference.toFixed(2)
    : "";

  return (
    <SideNav>
      <div className="my-4 md:my-7 bg-white rounded-lg mx-auto ">
        <SendSteps step={1} />

        <div className="mt-5 md:my-10">
          <h1 className="text-3xl md:text-4xl text-[#072032] font-dm-sans text-center mb-3 font-semibold">
            Send Money
          </h1>
          <p className="font-poppins md:text-lg text-[#454745] mb-3 text-center">
            Fast and reliable international money transfer app.
          </p>
        </div>

        <SendMoneyUI />
      </div>
      <div className="px-3 py-4 md:py-3.5 md:px-6 bg-white font-poppins font-semibold rounded-md my-4 space-y-3">
        <WalletSection cards={dynamicFiatData} rateDifference={difference} />
      </div>
    </SideNav>
  );
};

export default SendMoney;
