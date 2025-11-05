import KeyFeatures from "@/components/landing/features/keyFeatures";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero/hero";
import PaymentSwiper from "@/components/landing/hero/paymentSwiper";
import HowToWork from "@/components/landing/howToWork";
import { IoCheckmarkDone } from "react-icons/io5";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="bg-linear-to-l flex items-center justify-between w-full from-[#813FD6] px-0 md:px-26 to-[#301342] py-4 md:py-6 flex-col md:flex-row gap-5 md:gap-0">
        <PaymentSwiper />
        <div className="flex items-center gap-4 md:gap-3 flex-wrap px-3 md:px-0">
          <div className="flex items-center gap-1.5">
            <span className="bg-main text-white shadow-md rounded-full inline-flex items-center justify-center w-3.5 h-3.5">
              <IoCheckmarkDone size={20} />
            </span>
            <p className=" text-white font-poppins">Over 1,000 customers</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-main text-white shadow-md rounded-full inline-flex items-center justify-center w-3.5 h-3.5">
              <IoCheckmarkDone size={20} />
            </span>
            <p className=" text-white font-poppins">24/7 Support</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-main text-white shadow-md rounded-full inline-flex items-center justify-center w-3.5 h-3.5">
              <IoCheckmarkDone size={20} />
            </span>
            <p className=" text-white font-poppins">Great exchange rates</p>
          </div>
        </div>
      </div>
      <KeyFeatures />
      <HowToWork />
      <div className="border-b-2 border-b-main" />
      <Footer />
      <div className="border-t py-5 ">
        <p className="font-poppins text-center text-[#454745]">
          Copyright © 2025 ShiftRemit. All rights reserved.
        </p>
      </div>
    </div>
  );
}
