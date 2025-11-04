"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoWallet } from "react-icons/io5";
import { TbSmartHome } from "react-icons/tb";
import { HiOutlineWallet } from "react-icons/hi2";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const SideNav = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const navItems = [
    // { icon: <TbSmartHome size={18} />, title: "Dashboard", link: "/dashboard/customer" },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
        >
          {" "}
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
          >
            {" "}
            <path
              stroke-linejoin="round"
              d="M17 12h-7m0 0l3 3m-3-3l3-3"
            ></path>{" "}
            <path d="M7 16V8m15 4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "Send Money",
      link: "/send-money",
    },{
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          {" "}
          <g
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            {" "}
            <path stroke-linecap="round" d="M17.5 17.5L22 22"></path>{" "}
            <path d="M20 11a9 9 0 1 0-18 0a9 9 0 0 0 18 0Z"></path>{" "}
            <path
              stroke-linecap="round"
              d="M13.253 9.311c.105-1.264-1.83-2.297-3.308-1.604c-1.847.865-1.686 3.052.595 3.168c1.015.052 1.903-.058 2.506.596c.604.654.865 2.32-.913 2.884c-1.78.565-3.633-.443-3.633-1.672M10.971 6.5v.978m0 7.242v.78"
            ></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "Track Money",
      link: "/track-money",
    },
    { icon: <TbSmartHome size={18} />, title: "Transactions", link: "/dashboard/customer" },
    // { icon: <HiOutlineWallet size={18} />, title: "Wallets", link: "/wallets" },
    
    // {
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="18"
    //       height="18"
    //       viewBox="0 0 24 24"
    //     >
    //       {" "}
    //       <g fill="none" stroke="currentColor" stroke-width="1.5">
    //         {" "}
    //         <circle cx="9" cy="6" r="4"></circle>{" "}
    //         <path stroke-linecap="round" d="M15 9a3 3 0 1 0 0-6"></path>{" "}
    //         <ellipse cx="9" cy="17" rx="7" ry="4"></ellipse>{" "}
    //         <path
    //           stroke-linecap="round"
    //           d="M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37"
    //         ></path>{" "}
    //       </g>{" "}
    //     </svg>
    //   ),
    //   title: "Recipients",
    //   link: "/recipients",
    // },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          {" "}
          <path
            fill="currentColor"
            d="M19 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
          ></path>{" "}
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z"
            clip-rule="evenodd"
          ></path>{" "}
        </svg>
      ),
      title: "Request Money",
      link: "/request-money",
      subLinks: [
        { title: "Sent Request", link: "/sent-request" },
        { title: "Received Request", link: "/receive-request" },
        { title: "Received Wallet", link: "/receive-wallet" },
      ],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 256 256"
        >
          {" "}
          <g fill="none" stroke="currentColor" stroke-linecap="round">
            {" "}
            <path stroke-width="15.992" d="M 32,48 V 207.9236"></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="M 224,96 V 208"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="m 64,16 h 80"
            ></path>{" "}
            <path stroke-width="15.992" d="M 64,240 H 192"></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="m 224,208 c 0.0874,15.98169 -16,32 -32,32"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="m -32,208 c -10e-7,16 -16,32 -32,32"
              transform="scale(-1 1)"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="M -32,-47.976784 C -32,-32 -48,-16.356322 -63.999997,-16.000002"
              transform="scale(-1)"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="M 223.91257,96.071779 144,16"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="m -144,64 c -0.0492,15.912926 -16.06452,31.999995 -32,32"
              transform="scale(-1 1)"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="M 144,64 V 16"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="15.992"
              d="m 176,96 h 48"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="16"
              d="m 64,208 h 48"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="16"
              d="m 64,176 h 80"
            ></path>{" "}
            <path
              stroke-linejoin="round"
              stroke-width="16"
              d="m 64,144 h 48"
            ></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "All Logs",
      link: "/all-logs",
      // subLinks: [
      //   { title: "Send Money Logs", link: "/send-money-logs" },
      //   { title: "Request Money Logs", link: "/request-money-logs" },
      //   { title: "Exchange Logs", link: "/exchange-logs" },
      //   { title: "Deposit Logs", link: "/deposit-logs" },
      //   { title: "Withdraw Logs", link: "/withdraw-logs" },
      //   { title: "Wallet transactions", link: "/wallet-transactions" },
      //   { title: "Transaction Logs", link: "/transaction-logs" },
      //   { title: "Commission Logs", link: "/commission-logs" },
      // ],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 256 256"
        >
          {" "}
          <path
            fill="currentColor"
            d="M240 88.23a54.43 54.43 0 0 1-16 37L189.25 160a54.27 54.27 0 0 1-38.63 16h-.05A54.63 54.63 0 0 1 96 119.84a8 8 0 0 1 16 .45A38.62 38.62 0 0 0 150.58 160a38.4 38.4 0 0 0 27.31-11.31l34.75-34.75a38.63 38.63 0 0 0-54.63-54.63l-11 11A8 8 0 0 1 135.7 59l11-11a54.65 54.65 0 0 1 77.3 0a54.86 54.86 0 0 1 16 40.23m-131 97.43l-11 11A38.4 38.4 0 0 1 70.6 208a38.63 38.63 0 0 1-27.29-65.94L78 107.31a38.63 38.63 0 0 1 66 28.4a8 8 0 0 0 16 .45A54.86 54.86 0 0 0 144 96a54.65 54.65 0 0 0-77.27 0L32 130.75A54.62 54.62 0 0 0 70.56 224a54.28 54.28 0 0 0 38.64-16l11-11a8 8 0 0 0-11.2-11.34"
          ></path>{" "}
        </svg>
      ),
      title: "Partner",
      link: "/partner",
    },
  ];

  const [openDrop, setOpenDrop] = useState(false);

  return (
    <div className="flex gap-4 p-3 bg-[#f1f1f1]">
      <div className="w-[20%] rounded-3xl bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 p-3">
            <Image
              src="/images/shiftremit-logo.png"
              width={40}
              height={40}
              alt="shiftremit-logo"
              className="w-10 h-10 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold font-poppins text-black">
                Shift<span className="text-main">Remit</span>
              </h1>
              <p className="text-[8px] italic text-black font-dm-sans">
                 Unbeatable Transfer Rates
              </p>
            </div>
          </div>
          <div className="bg-gray-200 w-full h-px" />

          <div className="h-[68vh] overflow-y-auto no-scrollbar mt-2 px-2 space-y-1">
            {navItems.map((nav, i) => {
              const isActive =
                pathname === nav.link ||
                nav.subLinks?.some((s) => pathname === s.link);
              const isOpen = openDropdown === nav.title;

              return (
                <div key={i}>
                  {nav.subLinks ? (
                    <button
                      onClick={() => toggleDropdown(nav.title)}
                      className={`w-full flex items-center font-medium justify-between py-2.5 px-3 rounded-xl text-sm font-poppins transition-all ${
                        isActive
                          ? "bg-[#f1f1f1] text-[#301342]"
                          : "text-[#454745] hover:bg-[#f9f9f9] hover:text-[#301342]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {nav.icon}
                        <p>{nav.title}</p>
                      </div>
                      {isOpen ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={nav.link || "#"}
                      className={`flex items-center justify-between font-medium py-2.5 px-3 rounded-md text-sm font-poppins transition-all ${
                        isActive
                          ? "bg-[#f1f1f1] text-[#301342]"
                          : "text-[#454745] hover:bg-[#f9f9f9] hover:text-[#301342]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {nav.icon}
                        <p>{nav.title}</p>
                      </div>
                    </Link>
                  )}

                  {nav.subLinks && isOpen && (
                    <div className="ml-8 mt-1 space-y-1 transition-all">
                      {nav.subLinks.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.link}
                          className={`block py-1.5 font-poppins px-3 rounded-lg text-sm font-medium ${
                            pathname === sub.link
                              ? "bg-[#f1f1f1] text-[#301342]"
                              : "text-[#6b6b6b] hover:text-[#301342]"
                          }`}
                        >
                          - {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#f1f1f1] mx-4 mb-4 flex items-center justify-between gap-2 rounded-xl p-4 shadow-[0_2px_5px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-[#454745] text-xs pt-1 font-poppins">
              Partnership Wallet
            </p>
            <p className="text-[#072032] font-dm-sans font-semibold">10.50</p>
          </div>
          <IoWallet className="text-main" size={35} />
        </div>
      </div>

      <div className="w-[80%] h-screen overflow-y-auto scrollbar-hide">
        <div className="w-full flex items-center justify-between gap-2 rounded-2xl bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-3">
          <div className="relative ml-3 w-1/3">
            <input
              type="text"
              className="border w-full border-[#d1d5db80] text-[#072032] bg-white font-normal font-poppins text-sm rounded-md py-2 px-4 "
              placeholder="Search here"
            />
            <CiSearch size={18} className="text-black absolute right-2 top-2" />
          </div>
          <div className="flex items-center gap-2">
            <div className="border-r flex items-center gap-2 border-r-gray-200 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M18 8.4c0-1.697-.632-3.325-1.757-4.525S13.59 2 12 2s-3.117.674-4.243 1.875C6.632 5.075 6 6.703 6 8.4C6 15.867 3 18 3 18h18s-3-2.133-3-9.6M13.73 21a2 2 0 0 1-3.46 0"
                ></path>
              </svg>
              <Image
                alt="country"
                src="https://transfermax.springsoftit.com/demo/files/image/classic/constant_image/en.png"
                width={100}
                height={100}
                className="w-6 h-5 rounded-full"
              />
            </div>
            <div
              onClick={() => setOpenDrop((prev) => !prev)}
              className="cursor-pointer relative flex items-center gap-1"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div>
                <h1 className="text-sm font-poppins text-black">Hello </h1>
                <p className="text-xs font-poppins flex items-center gap-1 text-[#8094ae]">
                  remtony <FaAngleDown size={12} />
                </p>
              </div>
              {openDrop && (
                <div className="rounded-md absolute top-12 bg-white border border-gray-200">
                  <div className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5">
                    <FaRegCircleUser size={14} /> Profile
                  </div>
                  <div className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5">
                    <MdOutlineSettings size={14} />
                    Support
                  </div>
                  <hr />
                  <div className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5">
                    <IoMdLogOut size={14} /> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SideNav;
