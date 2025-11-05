"use client";

import { useRef} from "react";

export const WalletSection = ({
  title,
  // currency,
  cards,
}: {
  title: string;
  // currency: string;
  cards: any;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h1 className="text-[#072032] text-xl font-semibold font-dm-sans">
          {title}
        </h1>
      
      </div>

      <div
        ref={containerRef}
        className="grid grid-cols-5 gap-5"
      >
        {cards.map((card: any, index: any) => (
          <div
            key={index}
            className="p-4 flex-none shrink-0 bg-cover bg-center border border-gray-200 rounded-lg"
            style={{
              backgroundImage:
                "url('https://transfermax.springsoftit.com/demo/files/image/classic/constant_image/wallet-bg2.jpg')",
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-1">
                <img
                  src={card.country}
                  alt=""
                  className="w-11 h-11 rounded-fill object-cover"
                />
                <p className="text-[#072032] font-semibold text-base font-dm-sans">
                 {card.name}
                </p>
              </div>
            </div>

            <h1 className="text-[#072032] font-medium font-dm-sans text-xl py-1">
              {card.amount}.00
            </h1>
            <p className="text-xs font-poppins text-red-500">
              <span className="font-medium">-₦{card.lastTxs}.00</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
