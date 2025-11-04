"use client";
import { TbPercentage } from "react-icons/tb";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginClient } from "@/api/authService";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="h-screen flex ">
      <div
        className="relative w-[40%] p-14 flex flex-col justify-between h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://transfermax.springsoftit.com/demo/files/image/classic/cms/673bbb7d868e7-1731967869.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative h-screen flex flex-col justify-between z-10">
          <div
            onClick={() => router.replace("/")}
            className="flex cursor-pointer items-center gap-1"
          >
            <Image
              src="/images/shiftremit-logo.png"
              width={100}
              height={100}
              alt="shiftremit-logo"
              className="w-10 h-10 object-cover"
            />
            <div>
              <h1 className="text-xl pt-3 font-bold font-poppins text-black">
                Shift<span className="text-main">Remit</span>
              </h1>
              <p className="text-[8px] italic text-black font-dm-sans">
                Unbeatable Transfer Rates
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-[#072032] text-4xl font-dm-sans font-bold leading-[1.3]">
              Get great rates in less than five minutes{" "}
            </h1>

            <div className="space-y-4 my-4">
              <div className="flex items-center gap-2">
                <span className="w-[45px] h-[45px] flex items-center justify-center bg-main/20 text-main-dark-II p-2 rounded-full">
                  <TbPercentage size={20} />
                </span>
                <p className="font-poppins text-[#454745] text-lg">
                  Better Exchange Rates
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[45px] h-[45px] flex items-center justify-center bg-main/20 text-main-dark-II p-2 rounded-full">
                  <GoGraph size={20} />
                </span>
                <p className="font-poppins text-[#454745] text-lg">
                  Low Transaction Fee
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[45px] h-[45px] flex items-center justify-center bg-main/20 text-main-dark-II p-2 rounded-full">
                  <FaHandHoldingDollar size={20} />
                </span>
                <p className="font-poppins text-[#454745] text-lg">
                  No Hidden Fees
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/trust.svg" alt="" />
            <div className="space-y-2">
              <p className="text-black font-semibold font-dm-sans">Excellent</p>
              <p className="text-gray-600 font-poppins text-sm">
                Based on 4,000 reviews
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] flex flex-col justify-center items-center bg-white">
        <form className="w-[60%] space-y-3">
          <div>
            <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
              Recover Password
            </h1>

            <p className="font-poppins max-w-lg py-4 text-gray-600">
              Reset your password by verifying your email or phone to regain
              account access
            </p>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="email"
              className="font-poppins font-semibold text-sm "
            >
              Email
            </label>
            <div className="relative">
              <CiMail size={20} className="absolute top-5 left-3" />
              <input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`
    text-base text-white w-full font-poppins py-2 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    
  `}
          >
            Send verification code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
