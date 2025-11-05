"use client";
import { TbPercentage } from "react-icons/tb";
import Image from "next/image";
import { CiMail, CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  forgetPasswordClient,
  resetPasswordClient,
  resendCodeClient,
} from "@/api/authService";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const commonButtonClass = (isDisabled: boolean) => `
    text-base text-white w-full font-poppins py-3 px-6 font-medium rounded-[6px] cursor-pointer
    transition-all duration-300 ease-in-out
    ${
      isDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-linear-to-l from-[#813FD6] to-[#301342] hover:shadow-lg hover:shadow-[#813FD6]/50"
    }
  `;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email address.");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await forgetPasswordClient(email);
      setSuccess(response.message || "Verification code sent successfully!");
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await resendCodeClient(email);
      setSuccess(response.message || "Verification code re-sent successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to re-send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6)
      return setError("Please enter the full 6-digit code.");

    setError("");
    setSuccess("");
    setStep(3);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8)
      return setError("Password must be at least 8 characters long.");
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await resetPasswordClient(email, code, newPassword);
      setSuccess(
        response.message ||
          "Password successfully reset! Redirecting to login..."
      );

      router.replace("/login");
    } catch (err: any) {
      setError(
        err.message || "Failed to reset password. Please check your code."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <form className="w-[60%] space-y-3" onSubmit={handleSendCode}>
            <div>
              <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
                Recover Password
              </h1>
              <p className="font-poppins max-w-lg py-4 text-gray-600">
                Reset your password by entering your email address below.
              </p>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="font-poppins font-semibold text-sm"
              >
                Email
              </label>
              <div className="relative">
                <CiMail
                  size={20}
                  className="absolute top-5 left-3 text-gray-500"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm focus:border-main focus:outline-none"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm font-poppins">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm font-poppins">{success}</p>
            )}
            <button
              type="submit"
              disabled={loading || !email}
              className={commonButtonClass(loading || !email)}
            >
              {loading ? "Sending..." : "Send verification code"}
            </button>
            <p className="text-center pt-2 text-sm text-gray-500">
              <span
                className="cursor-pointer font-semibold text-main-dark-II hover:underline"
                onClick={() => router.push("/login")}
              >
                Back to Login
              </span>
            </p>
          </form>
        );

      case 2:
        return (
          <form className="w-[60%] space-y-5" onSubmit={handleVerifyCode}>
            <div>
              <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
                Verify Code
              </h1>
              <p className="font-poppins max-w-lg py-4 text-gray-600">
                A 6-digit verification code has been sent to **{email}**. Please
                enter it below.
              </p>
            </div>

            <div className="flex justify-between space-x-2">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={code[index] || ""}
                  onChange={(e) => {
                    const newCode = code.split("");
                    newCode[index] = e.target.value.slice(-1);
                    setCode(newCode.join(""));

                    if (e.target.value && index < 5) {
                      const nextSibling = e.currentTarget
                        .nextElementSibling as HTMLInputElement;
                      if (nextSibling) nextSibling.focus();
                    } else if (!e.target.value && index > 0) {
                      const prevSibling = e.currentTarget
                        .previousElementSibling as HTMLInputElement;
                      if (prevSibling) prevSibling.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      !e.currentTarget.value &&
                      index > 0
                    ) {
                      const prevSibling = e.currentTarget
                        .previousElementSibling as HTMLInputElement;
                      if (prevSibling) prevSibling.focus();
                    }
                  }}
                  className="w-1/6 h-12 text-center text-lg font-bold border border-gray-300 rounded-md focus:border-main focus:ring-main focus:outline-none"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm font-poppins">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm font-poppins">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className={commonButtonClass(loading || code.length !== 6)}
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
            <p className="text-center pt-2 text-sm text-gray-500">
              Didn't receive code?{" "}
              <span
                className="cursor-pointer font-semibold text-main-dark-II hover:underline"
                onClick={handleResendCode}
              >
                {loading ? "Sending..." : "Resend Code"}
              </span>
            </p>
          </form>
        );

      case 3:
        return (
          <form className="w-[60%] space-y-3" onSubmit={handleResetPassword}>
            <div>
              <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
                Set New Password
              </h1>
              <p className="font-poppins max-w-lg py-4 text-gray-600">
                Please enter and confirm your new password below.
              </p>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="newPassword"
                className="font-poppins font-semibold text-sm"
              >
                New Password
              </label>
              <div className="relative">
                <CiLock
                  size={20}
                  className="absolute top-5 left-3 text-gray-500"
                />
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password (min 8 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm focus:border-main focus:outline-none"
                />
                <IoEyeOutline
                  size={20}
                  className="absolute top-5 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="confirmPassword"
                className="font-poppins font-semibold text-sm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <CiLock
                  size={20}
                  className="absolute top-5 left-3 text-gray-500"
                />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm focus:border-main focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-poppins">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm font-poppins">{success}</p>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                newPassword !== confirmPassword ||
                newPassword.length < 8
              }
              className={commonButtonClass(
                loading ||
                  newPassword !== confirmPassword ||
                  newPassword.length < 8
              )}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        );

      default:
        return null;
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
        {renderFormContent()}
      </div>
    </div>
  );
};

export default ForgotPassword;
