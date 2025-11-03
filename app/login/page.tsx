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

const LoginScrn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await loginClient(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown login error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="flex items-center gap-1">
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
                Money exchanger & transfer
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
        <form onSubmit={handleSubmit} className="w-[80%] space-y-3">
          <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
            Log in to your account
          </h1>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md font-poppins text-sm">
              {error}
            </div>
          )}

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
          <div>
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="font-poppins font-semibold text-sm "
              >
                Password
              </label>
              <div className="relative">
                <CiLock size={20} className="absolute top-5 left-3" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                />
                <IoEyeOutline
                  className="absolute top-4.5 cursor-pointer right-3"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <p className="text-main-dark-II font-medium mt-2 cursor-pointer text-right text-sm font-poppins">
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
    text-base text-white w-full font-poppins py-2 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="font-poppins mt-2 text-center">
            Don't have an account?{" "}
            <span
              className="text-main cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScrn;
