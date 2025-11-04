"use client";
import React, { useState, useCallback, useMemo } from "react";
import { TbPercentage } from "react-icons/tb";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { CiLock, CiPhone } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";

import {
  registerUserClient,
  verifyEmailClient,
  resendCodeClient,
} from "@/api/authService";

interface VerificationInputProps {
  onVerify: (code: string) => void;
  isLoading: boolean;
}

const VerificationInput: React.FC<VerificationInputProps> = ({
  onVerify,
  isLoading,
}) => {
  const [codes, setCodes] = useState(new Array(6).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newCodes = [...codes];
    newCodes[index] = element.value.slice(-1);
    setCodes(newCodes);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCodes.every((code) => code !== "")) {
      onVerify(newCodes.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && codes[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-gray-600 font-poppins text-sm">
        Enter the 6-digit code sent to your email.
      </p>
      <div className="flex gap-3">
        {codes.map((data, index) => (
          <input
            key={index}
            ref={(el: any) => (inputRefs.current[index] = el)}
            className="w-10 h-10 text-center text-xl font-bold border border-gray-300 rounded-lg focus:border-main focus:ring-main outline-none transition-all"
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={isLoading}
          />
        ))}
      </div>
      <button
        onClick={() => onVerify(codes.join(""))}
        disabled={isLoading || codes.some((code) => code === "")}
        className="
          text-base text-white w-full font-poppins py-3 px-6 font-medium rounded-[6px] cursor-pointer
          bg-linear-to-l from-[#813FD6] to-[#301342]
          transition-all duration-300 ease-in-out disabled:opacity-50
        "
      >
        {isLoading ? "Verifying..." : "Verify Email"}
      </button>
    </div>
  );
};

const Register = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(null);
    setResendMessage(null);
  };

  const handleSignUp = useCallback(async () => {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
      agreedToTerms,
    } = form;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreedToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResendMessage(null);

    try {
      const result = await registerUserClient(
        firstname,
        lastname,
        email,
        password,
        phone
      );

      if (result.success) {
        setUnverifiedEmail(email);
        setShowVerification(true);
        setResendMessage("Verification code sent to your email.");
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [form, setUnverifiedEmail]);

  const handleVerify = useCallback(
    async (code: string) => {
      if (!unverifiedEmail) {
        setError("No email found for verification. Please sign up again.");
        return;
      }
      if (code.length !== 6) {
        setError("Please enter the full 6-digit code.");
        return;
      }

      setIsLoading(true);
      setError(null);
      setResendMessage(null);

      try {
        await verifyEmailClient(unverifiedEmail, code);

        router.push("/dashboard");
      } catch (err: any) {
        setError(
          err.message || "Verification failed. Check your code or try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [unverifiedEmail, router]
  );

  const handleResendCode = useCallback(async () => {
    if (!unverifiedEmail) {
      setError("Cannot resend code. No email is set for verification.");
      return;
    }

    setIsResending(true);
    setResendMessage(null);
    setError(null);

    try {
      await resendCodeClient(unverifiedEmail);
      setResendMessage("A new verification code has been successfully sent.");
    } catch (err: any) {
      setResendMessage(
        err.message || "Failed to resend code. Please try again."
      );
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  }, [unverifiedEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showVerification) {
      handleSignUp();
    }
  };

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const RegisterForm = useMemo(
    () => (
      <form onSubmit={handleSubmit} className="w-[80%] space-y-3">
        <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
          Create an account
        </h1>
        {error && (
          <div className="p-3 text-sm font-dm-sans font-semibold text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <label
              htmlFor="firstname"
              className="font-poppins font-semibold text-sm "
            >
              First Name
            </label>
            <div className="relative">
              <FaRegUser
                size={16}
                className="absolute top-6 left-3 text-[#858484]"
              />
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="lastname"
              className="font-poppins font-semibold text-sm "
            >
              Last Name
            </label>
            <div className="relative">
              <FaRegUser
                size={16}
                className="absolute top-6 left-3 text-[#858484]"
              />
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="email"
              className="font-poppins font-semibold text-sm "
            >
              Email
            </label>
            <div className="relative">
              <CiMail
                size={16}
                className="absolute top-6 left-3 text-[#858484]"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="phone"
              className="font-poppins font-semibold text-sm "
            >
              Mobile
            </label>
            <div className="relative">
              <CiPhone
                size={16}
                className="absolute top-6 left-3 text-[#858484]"
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+44 700 000 0000"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="password"
              className="font-poppins font-semibold text-sm "
            >
              Password
            </label>
            <div className="relative">
              <CiLock
                size={16}
                className="absolute top-6 left-3 text-[#858484]"
              />
              <input
                id="password"
                name="password"
                type={show.password ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
              {show.password ? (
                <IoEyeOffOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, password: false }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              ) : (
                <IoEyeOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, password: true }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="confirmPassword"
              className="font-poppins font-semibold text-sm "
            >
              Confirm Password
            </label>
            <div className="relative">
              <CiLock
                size={16}
                className="absolute top-6 left-3 text-[#858484]"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={show.confirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-7 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
              {show.confirmPassword ? (
                <IoEyeOffOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, confirmPassword: false }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              ) : (
                <IoEyeOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, confirmPassword: true }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              )}
            </div>
          </div>
        </div>

        <div className="my-5 flex items-center gap-1">
          <input
            id="agreedToTerms"
            name="agreedToTerms"
            type="checkbox"
            checked={form.agreedToTerms}
            onChange={handleChange}
            className="w-4 h-4 accent-main-dark"
          />
          <label
            htmlFor="agreedToTerms"
            className="font-poppins text-sm cursor-pointer"
          >
            I agree with
            <span className="text-main cursor-pointer">
              {" "}
              Terms & Conditions, Privacy Policy
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="
            text-base text-white w-full font-poppins py-2 px-6 font-medium rounded-[6px] cursor-pointer
            bg-linear-to-l from-[#813FD6] to-[#301342]
            transition-all duration-300 ease-in-out disabled:opacity-50
          "
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="font-poppins mt-2 text-center">
          Already have an account?{" "}
          <span
            className="text-main cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    ),
    [form, error, isLoading, handleSubmit]
  );

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
                  <TbPercentage size={16} />
                </span>
                <p className="font-poppins text-[#454745] text-lg">
                  Better Exchange Rates
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[45px] h-[45px] flex items-center justify-center bg-main/20 text-main-dark-II p-2 rounded-full">
                  <GoGraph size={16} />
                </span>
                <p className="font-poppins text-[#454745] text-lg">
                  Low Transaction Fee
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[45px] h-[45px] flex items-center justify-center bg-main/20 text-main-dark-II p-2 rounded-full">
                  <FaHandHoldingDollar size={16} />
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
        {showVerification ? (
          <div className="w-[80%] space-y-3 flex flex-col items-center">
            <h1 className="text-[#073032] font-semibold font-dm-sans text-2xl">
              Verify Your Email
            </h1>
            {error && (
              <div className="p-3 text-sm font-semibold font-dm-sans text-red-700 bg-red-100 rounded-md w-full text-center">
                {error}
              </div>
            )}
            {resendMessage && (
              <div
                className={`p-3 text-sm font-semibold rounded-md w-full text-center ${
                  error
                    ? "text-red-700 bg-red-100"
                    : "text-green-700 bg-green-100"
                }`}
              >
                {resendMessage}
              </div>
            )}
            <VerificationInput onVerify={handleVerify} isLoading={isLoading} />
            <p className="font-poppins text-center text-sm pt-4">
              Didn't receive the code?
              <span
                className={`cursor-pointer font-bold ${
                  isResending ? "text-gray-500" : "text-main"
                }`}
                onClick={isResending ? undefined : handleResendCode}
                role="button"
                aria-disabled={isResending}
              >
                {isResending ? " Resending..." : " Resend Code"}
              </span>
            </p>
          </div>
        ) : (
          RegisterForm
        )}
      </div>
    </div>
  );
};

export default Register;
