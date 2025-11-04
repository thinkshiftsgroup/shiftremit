"use client";

import React, { useRef, useEffect, useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.children[index] as HTMLElement;
    if (!card) return;

    const leftPos = card.offsetLeft;
    container.scrollTo({
      left: leftPos,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1 < cards.length ? prev + 1 : 0;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : cards.length - 1;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const scrollRight = () => {
    const nextIndex = currentIndex + 1 < cards.length ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h1 className="text-[#072032] text-lg font-semibold font-dm-sans">
          {title}
        </h1>
        <div className="flex items-center gap-2 cursor-pointer">
          <MdOutlineChevronLeft
            size={20}
            onClick={scrollLeft}
            className="hover:text-main transition-colors"
          />
          <MdOutlineChevronRight
            size={20}
            onClick={scrollRight}
            className="hover:text-main transition-colors"
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex items-center gap-3 overflow-x-scroll scrollbar-hide"
      >
        {cards.map((card: any, index: any) => (
          <div
            key={index}
            className="p-4 flex-none shrink-0 w-[400px] bg-cover bg-center border border-gray-200 rounded-lg"
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
                <p className="text-[#072032] font-semibold text-sm font-dm-sans">
                 {card.name}
                </p>
              </div>
            </div>

            <h1 className="text-[#072032] font-medium font-dm-sans text-lg py-1">
              {card.amount}.00
            </h1>
            <p className="text-xs font-poppins text-[#454745]">
              Last transaction{" "}
              <span className="font-medium">{card.lastTxs}.00</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
