"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Menu } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex px-4 sm:px-6 md:px-12 lg:px-20 items-center py-3 border-b border-b-[#ffffff1a] w-full justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/shiftremit-logo.png"
            width={100}
            height={100}
            alt="shiftremit-logo"
            className="w-10 h-10 object-cover"
          />
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold font-poppins text-white">
              Shift<span className="text-main">Remit</span>
            </h1>
            <p className="text-[7px] sm:text-[8px] italic font-semibold text-white font-dm-sans">
              Unbeatable Transfer Rates
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick("/login")}
            className="
                            text-sm text-white font-poppins border border-[#813FD6] py-2 px-6 font-medium rounded-[6px] cursor-pointer
                            bg-linear-to-l from-[#813FD6] to-[#301342]
                            transition-all duration-300 ease-in-out
                            hover:shadow-lg hover:shadow-[#813FD6]/50
                        "
          >
            Login
          </button>
          <button
            onClick={() => handleNavClick("/signup")}
            className="
                            text-sm text-white font-poppins border border-[#813FD6] py-2 px-6 font-medium rounded-[6px] cursor-pointer
                            bg-linear-to-l from-[#813FD6] to-[#301342]
                            transition-all duration-300 ease-in-out
                            hover:shadow-lg hover:shadow-[#813FD6]/50
                        "
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline md:hidden text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={28} />
          ) : (
            // <Menu size={28} />
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
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-b-[#ffffff1a] bg-white backdrop-blur-sm">
          <div className="flex flex-col gap-3 px-4 sm:px-6 py-4">
            <button
              onClick={() => handleNavClick("/login")}
              className="
                                text-sm text-white font-poppins border border-[#813FD6] py-2 px-4 font-medium rounded-[6px] cursor-pointer
                                bg-linear-to-l from-[#813FD6] to-[#301342]
                                transition-all duration-300 ease-in-out
                                hover:shadow-lg hover:shadow-[#813FD6]/50
                                w-full
                            "
            >
              Login
            </button>
            <button
              onClick={() => handleNavClick("/signup")}
              className="
                                text-sm text-white font-poppins border border-[#813FD6] py-2 px-4 font-medium rounded-[6px] cursor-pointer
                                bg-linear-to-l from-[#813FD6] to-[#301342]
                                transition-all duration-300 ease-in-out
                                hover:shadow-lg hover:shadow-[#813FD6]/50
                                w-full
                            "
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
