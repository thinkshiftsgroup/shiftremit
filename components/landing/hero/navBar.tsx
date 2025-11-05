"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logoutUser = useAuthStore((state: any) => state.logout);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const commonButtonClasses = `
    text-sm text-white font-poppins border border-[#813FD6] py-2 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:shadow-lg hover:shadow-[#813FD6]/50
  `;

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M2 5.995c0-.55.446-.995.995-.995h8.01a.995.995 0 0 1 0 1.99h-8.01A.995.995 0 0 1 2 5.995M2 12c0-.55.446-.995.995-.995h18.01a.995.995 0 1 1 0 1.99H2.995A.995.995 0 0 1 2 12m.995 5.01a.995.995 0 0 0 0 1.99h12.01a.995.995 0 0 0 0-1.99z"
        strokeWidth={0.5}
        stroke="currentColor"
      ></path>
    </svg>
  );

  const AuthButtons = (isMobile = false) => {
    const classes = isMobile
      ? `${commonButtonClasses} w-full py-2 px-4`
      : commonButtonClasses;

    if (isLoggedIn) {
      return (
        <Link href="/dashboard" onClick={handleNavClick}>
          <button className={classes}>Account</button>
        </Link>
      );
    } else {
      return (
        <>
          <Link href="/login" onClick={handleNavClick}>
            <button className={classes}>Login</button>
          </Link>
          <Link href="/signup" onClick={handleNavClick}>
            <button className={classes}>Signup</button>
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <div className="flex container px-20 mx-auto items-center py-3 border-b border-b-[#ffffff1a] w-full justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" onClick={handleNavClick}>
            <Image
              src="/images/shiftremit-logo.png"
              width={100}
              height={100}
              alt="shiftremit-logo"
              className="w-10 h-10 object-cover cursor-pointer"
            />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-poppins text-white">
              Shift<span className="text-main">Remit</span>
            </h1>
            <p className="text-xs font-normal text-white font-dm-sans">
              Unbeatable Transfer Rates
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">{AuthButtons()}</div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline md:hidden text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <MenuIcon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-b-[#ffffff1a] bg-main-dark-II">
          <div className="flex flex-col gap-3 px-4 sm:px-6 py-4">
            {AuthButtons(true)}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
