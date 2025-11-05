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
      <div className="mx-auto relative">
        <Navbar />
        <div className="h-auto container px-3 md:px-7 lg:px-20 mx-auto min-h-[90vh] flex items-center justify-center">
          <div
            className=" flex items-center flex-col lg:flex-row gap-20 justify-between"
          >
            <div className="w-full lg:w-1/2 lg:h-screen mt-10 md:mt-20 lg:mt-0  flex  justify-content items-center">
              <div className="flex lg:block flex-col items-center jusitfy-center">
                <p className="text-lg text-white font-poppins">
                  Great Value
                </p>
                <h1 className="capitalize text-center lg:text-left text-[1.725rem] md:text-[4rem] font-dm-sans mb-2 text-white font-bold tracking-tighter leading-snug">
                  Send Money. <br className="hidden md:inline" /> No Fees.
                </h1>
                <p className="text-white text-[16px] mt-5 mb-4 font-poppins text-center lg:text-left">
                  ✨ ShiftRemit gives you more for your money! Send from the UK
                  to any bank in Nigeria — Unbeatable rates and speed.
                </p>
                <a href="/signup">
                  <button
                    className="hidden md:flex
    text-base text-white font-poppins border border-[#813FD6] py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent items-center gap-2
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
