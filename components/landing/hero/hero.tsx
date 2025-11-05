"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import SideHero from "./sideHero";
import { useRouter } from "next/navigation";
import Navbar from "./navBar";

const Hero = () => {
  const router = useRouter();
  return (
    <div className=" h-auto min-h-screen relative overflow-hidden w-full bg-main-dark-II">
      <Image
        src="https://transfermax.springsoftit.com/demo/files/image/classic/cms/6756efd1b087f-1733750737.png"
        width={100}
        height={100}
        alt="shiftremit-back"
        className="absolute top-0 left-0 w-full h-screen opacity-[0.2]  object-cover"
      />

      {/* <div className="rt-banner " />
      <div className="rt-banner-2 " /> */}
      <div className="mx-auto relative">
        <Navbar />
        <div className="h-auto min-h-[90vh] flex items-center justify-center">
          <div className="
            md:max-w-[720px] 
            lg:max-w-[960px] 
            xl:max-w-[1140px] 
            2xl:max-w-[1320px] mx-auto flex items-start flex-col md:flex-row justify-between gap-8">
            <div className="w-full md:w-[45%] md:h-screen mt-10 md:mt-0  flex  justify-content items-center">
              <div className="flex md:block flex-col items-center jusitfy-center">

                <p className="text-lg text-white font-poppins">
                  Highest Security
                </p>
                <h1 className="capitalize text-center text-[1.725rem] md:text-[4rem] font-dm-sans mb-2 text-white font-bold tracking-tighter leading-snug">
                  Send Money. <br /> No Fees.
                </h1>
                <p className="text-white text-[16px] mt-5 mb-4 font-poppins text-center md:text-left">
                  ✨ ShiftRemit gives you more for your money! Send from the UK to
                  any bank in Nigeria — Unbeatable rates and speed.
                </p>
                <a href="/signup">
                  <button
                    className="
    text-base text-white font-poppins border border-[#813FD6] py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent flex items-center gap-2
  "
                  >
                    Get Started <FaArrowRight />
                  </button>
                </a>
              </div>
            </div>
            <SideHero />
          </div>
          {/* <SendMoney /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
