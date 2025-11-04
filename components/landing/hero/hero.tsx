"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import SideHero from "./sideHero";
import { useRouter } from "next/navigation";

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

      <div className="rt-banner " />
      <div className="rt-banner-2 " />
      <div className="mx-auto relative">
        <div className="flex px-20 container items-center py-3 border-b border-b-[#ffffff1a] w-full justify-between">
          <div className="flex items-center gap-1">
            <Image
              src="/images/shiftremit-logo.png"
              width={100}
              height={100}
              alt="shiftremit-logo"
              className="w-10 h-10 object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold font-poppins text-white">
                Shift<span className="text-main">Remit</span>
              </h1>
              <p className="text-[8px] italic font-semibold text-white font-dm-sans">
                Unbeatable Transfer Rates
              </p>
            </div>
          </div>

          {/* <ul className="text-white *:py-3 *:px-4 font-medium font-poppins flex items-center *:cursor-pointer">
            <li>Home</li>
            <li>About Us</li>
            <li>Track</li>
            <li>Blog</li>
            <li>Contact us</li>
          </ul> */}

          <div className="flex items-center gap-3">
            {/* <div className="flex items-center gap-1 cursor-pointer">
              <Image
                alt="country"
                src="https://transfermax.springsoftit.com/demo/files/image/classic/constant_image/en.png"
                width={100}
                height={100}
                className="w-6 h-6 rounded-full"
              />
              <p className="text-white text-lg font-poppins">en</p>
            </div> */}
            <a href="/login">
              <button
                onClick={() => router.push("/login")}
                className="
    text-sm text-white font-poppins border border-[#813FD6] py-2 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent
  "
              >
                Login
              </button>
            </a>
            <a href="/signup">
              <button
                onClick={() => router.push("/signup")}
                className="
    text-sm text-white font-poppins border border-[#813FD6] py-2 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent
  "
              >
                Signup
              </button>
            </a>
          </div>
        </div>

        <div className="h-auto min-h-[90vh] flex items-center justify-center">
          <div className="
            md:max-w-[720px] 
            lg:max-w-[960px] 
            xl:max-w-[1140px] 
            2xl:max-w-[1320px] mx-auto flex items-start justify-between gap-8">
            <div className="w-[45%] h-screen  flex  justify-content items-center">
              <div>

                <p className="text-lg text-white font-poppins">
                  Highest Security
                </p>
                <h1 className="capitalize text-[4rem] font-dm-sans mb-2 text-white font-bold tracking-tighter leading-snug">
                  Send Money. <br /> No Fees.
                </h1>
                <p className="text-white text-[16px] mt-5 mb-4 font-poppins">
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
