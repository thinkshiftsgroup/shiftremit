"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoWallet } from "react-icons/io5";
import { TbSmartHome } from "react-icons/tb";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown, FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineWallet } from "react-icons/hi2";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";

const SideNav = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const handleSignOut = () => {
    Cookies.remove("shiftremit_auth_token");
    Cookies.remove("shiftremit_auth_state");
    router.replace("/");
    logoutUser();
    toast.info("You have been signed out.");
  };

  const userDisplayName = user
    ? user.firstname || user.username || user.email
    : "Guest";

  const logoRedirectPath =
    user?.userType === "admin" || user?.userType === "partner"
      ? "/admin/dashboard"
      : "/send-money";

  const navItems = [
    {
      icon: <TbSmartHome size={18} />,
      title: "Dashboard",
      link: "/admin/dashboard",
      showFor: ["admin"],
    },
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
            strokeLinecap="round"
            strokeWidth="1.5"
          >
            {" "}
            <path
              strokeLinejoin="round"
              d="M17 12h-7m0 0l3 3m-3-3l3-3"
            ></path>{" "}
            <path d="M7 16V8m15 4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "Send Money",
      link: "/send-money",
      showFor: ["user"],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14.77 15.5h2.96q.213 0 .357-.144t.144-.356V9q0-.213-.144-.356t-.356-.144h-2.962q-.212 0-.356.144T14.269 9v6q0 .213.144.356t.356.144m.5-1v-5h1.962v5zm-6.23 1H12q.213 0 .356-.144T12.5 15V9q0-.213-.144-.356T12 8.5H9.039q-.213 0-.357.144T8.54 9v6q0 .213.143.356t.357.144m.5-1v-5h1.96v5zm-2.77.5V9q0-.213-.144-.356T6.27 8.5t-.356.144T5.769 9v6q0 .213.144.356q.144.144.357.144t.356-.144t.143-.356M3 17.384V6.616q0-.667.475-1.141T4.615 5h14.77q.666 0 1.14.475T21 6.615v10.77q0 .666-.475 1.14t-1.14.475H4.615q-.666 0-1.14-.475T3 17.386M4.616 18h14.769q.269 0 .442-.173t.173-.442V6.615q0-.269-.173-.442T19.385 6H4.615q-.269 0-.442.173T4 6.616v10.769q0 .269.173.442t.443.173M4 18V6z"
          />
        </svg>
      ),
      title: "FX Rates",
      link: "/admin/fxrates",
      showFor: ["admin"],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M6.5 15.402H22v15.5m0-15.5l-17.5 17.5m37-.304H26v-15.5m0 15.5l17.5-17.5"
            stroke-width="2"
          />
        </svg>
      ),
      title: "Transactions",
      link: "/admin/transactions",
      showFor: ["admin"],
    },
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
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M2 7h18m-4-5l5 5l-5 5m6 5H4m4-5l-5 5l5 5"
          />{" "}
        </svg>
      ),
      title: "Transactions",
      link: "/user/transactions",
      showFor: ["user"],
    },
    {
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
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            {" "}
            <path strokeLinecap="round" d="M17.5 17.5L22 22"></path>{" "}
            <path d="M20 11a9 9 0 1 0-18 0a9 9 0 0 0 18 0Z"></path>{" "}
            <path
              strokeLinecap="round"
              d="M13.253 9.311c.105-1.264-1.83-2.297-3.308-1.604c-1.847.865-1.686 3.052.595 3.168c1.015.052 1.903-.058 2.506.596c.604.654.865 2.32-.913 2.884c-1.78.565-3.633-.443-3.633-1.672M10.971 6.5v.978m0 7.242v.78"
            ></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "Track Transfer",
      link: "/track-transfer",
      showFor: ["user", "admin"],
    },
    {
      icon: <HiOutlineWallet size={18} />,
      title: "Wallets",
      link: "/admin/wallets",
      showFor: ["admin"],
    },
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
            fillRule="evenodd"
            d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z"
            clipRule="evenodd"
          ></path>{" "}
        </svg>
      ),
      title: "Request Money",
      link: "/request-money",
      subLinks: [
        { title: "Send Request", link: "/request-money/send-request" },
        { title: "Sent Request", link: "/request-money/sent-request" },
        { title: "Received Request", link: "/request-money/received-request" },
        { title: "Received Wallet", link: "/request-money/received-wallet" },
      ],
      showFor: ["user", "admin"],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          {" "}
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            {" "}
            <circle cx="9" cy="6" r="4"></circle>{" "}
            <path strokeLinecap="round" d="M15 9a3 3 0 1 0 0-6"></path>{" "}
            <ellipse cx="9" cy="17" rx="7" ry="4"></ellipse>{" "}
            <path
              strokeLinecap="round"
              d="M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37"
            ></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "Recipients",
      link: "/recipients",
      showFor: ["admin", "user"],
    },
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
            d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74c.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1c1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59zM20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7zm.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6"
          />{" "}
        </svg>
      ),
      title: "Partner Business",
      link: "/customer/partner-space",
      subLinks: [
        { title: "Partner Space", link: "/customer/partner-space" },
        { title: "Transaction Logs", link: "/partner/transactions" },
      ],
      showFor: ["user", "admin"],
    },
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
            d="M10 3.5C8.563 3.5 7.42 4.631 7.42 6S8.564 8.5 10 8.5s2.579-1.131 2.579-2.5s-1.143-2.5-2.58-2.5M6.42 6c0-1.945 1.615-3.5 3.58-3.5c1.964 0 3.579 1.555 3.579 3.5s-1.615 3.5-3.58 3.5C8.036 9.5 6.422 7.945 6.422 6m1.186 5.756c-.218-.14-.43-.18-.585-.138q-.22.06-.439.13l-.984.316a2.52 2.52 0 0 0-1.629 1.56c-.03.09-.05.194-.064.327l-.39 3.695l-.001.009c-.09.636.252 1.175.824 1.308c1.097.254 2.93.537 5.662.537a.5.5 0 0 1 0 1c-2.8 0-4.71-.29-5.888-.563c-1.147-.266-1.737-1.345-1.59-2.414l.389-3.677c.017-.164.046-.355.113-.549a3.52 3.52 0 0 1 2.269-2.185l.984-.316q.238-.076.478-.142c.52-.143 1.028.026 1.394.263c.394.254 1.045.569 1.85.569s1.457-.315 1.851-.57c.367-.236.874-.405 1.394-.262q.24.067.478.142l.985.316a.5.5 0 1 1-.305.952l-.985-.315q-.217-.07-.438-.13c-.156-.043-.367-.004-.586.137c-.489.317-1.329.73-2.393.73c-1.065 0-1.905-.413-2.394-.73"
            strokeWidth="0.5"
            stroke="currentColor"
          />{" "}
          <path
            fill="currentColor"
            d="M15.64 13.16a.73.73 0 0 1 .731-.66h1.257a.73.73 0 0 1 .732.66c.018.207.177.428.463.574q.084.043.167.09c.314.18.621.213.843.114a.74.74 0 0 1 .934.286l.628 1.032a.715.715 0 0 1-.221.971c-.18.118-.303.378-.299.725v.096c-.005.347.12.607.299.725a.715.715 0 0 1 .221.971l-.628 1.032a.74.74 0 0 1-.934.286c-.222-.099-.529-.066-.843.114q-.082.046-.167.09c-.286.146-.445.367-.463.574a.73.73 0 0 1-.732.66H16.37a.73.73 0 0 1-.731-.66c-.019-.207-.178-.428-.464-.574a4 4 0 0 1-.166-.09c-.315-.18-.622-.213-.844-.114a.74.74 0 0 1-.934-.286l-.628-1.032a.715.715 0 0 1 .222-.971c.18-.118.303-.378.298-.725v-.096c.005-.347-.119-.607-.298-.725a.715.715 0 0 1-.222-.971l.628-1.032a.74.74 0 0 1 .934-.286c.222.099.53.066.844-.114q.082-.046.166-.09c.286-.146.445-.367.464-.574m.952.34c-.138.526-.541.911-.962 1.125l-.124.067c-.424.243-.984.395-1.532.237l-.385.632c.401.382.541.934.535 1.404v.07c.006.47-.134 1.022-.535 1.404l.385.632c.548-.158 1.108-.006 1.532.237q.06.034.124.067c.42.214.824.6.962 1.125h.815c.138-.526.542-.911.962-1.125l.124-.067c.424-.243.985-.395 1.533-.237l.384-.632c-.401-.382-.541-.934-.535-1.404v-.07c-.006-.47.134-1.022.535-1.404l-.384-.632c-.549.158-1.109.006-1.533-.237l-.124-.067c-.42-.214-.824-.6-.962-1.125zm1.199 3.093c-.244-.4-.806-.555-1.255-.31c-.434.239-.56.74-.328 1.124c.244.4.806.555 1.255.31c.434-.239.56-.74.328-1.124m-1.735-1.186c.897-.491 2.055-.21 2.589.666c.544.893.209 2.022-.702 2.52c-.897.491-2.055.21-2.589-.666c-.543-.893-.209-2.022.702-2.52"
            strokeWidth="0.5"
            stroke="currentColor"
          />{" "}
        </svg>
      ),
      title: "Account",
      link: "/account",
      showFor: ["user", "admin"],
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
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            {" "}
            <path strokeWidth="15.992" d="M 32,48 V 207.9236"></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="M 224,96 V 208"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="m 64,16 h 80"
            ></path>{" "}
            <path strokeWidth="15.992" d="M 64,240 H 192"></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="m 224,208 c 0.0874,15.98169 -16,32 -32,32"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="m -32,208 c -10e-7,16 -16,32 -32,32"
              transform="scale(-1 1)"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="M -32,-47.976784 C -32,-32 -48,-16.356322 -63.999997,-16.000002"
              transform="scale(-1)"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="M 223.91257,96.071779 144,16"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="m -144,64 c -0.0492,15.912926 -16.06452,31.999995 -32,32"
              transform="scale(-1 1)"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="M 144,64 V 16"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="15.992"
              d="m 176,96 h 48"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="16"
              d="m 64,208 h 48"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="16"
              d="m 64,176 h 80"
            ></path>{" "}
            <path
              strokeLinejoin="round"
              strokeWidth="16"
              d="m 64,144 h 48"
            ></path>{" "}
          </g>{" "}
        </svg>
      ),
      title: "Logs",
      link: "/all-logs",
      showFor: ["user", "admin"],
    },
  ];

  const [openDrop, setOpenDrop] = useState(false);
  const router = useRouter();

  const filteredNavItems = navItems.filter((item) =>
    item.showFor.includes(user?.userType!)
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const SideContent = () => (
    <>
      <div>
        <div
          onClick={() => router.push(logoRedirectPath)}
          className="flex cursor-pointer items-center gap-1 p-3 z-50"
        >
          <Image
            src="/images/shiftremit-logo.png"
            width={40}
            height={40}
            alt="shiftremit-logo"
            className="w-10 h-10 object-cover"
          />
          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold font-poppins text-black">
                Shift<span className="text-main">Remit</span>
              </h1>
              <p className="text-[8px] italic text-black font-dm-sans">
                Unbeatable Transfer Rates
              </p>
            </div>

            <div className="p-4 pe-0 flex lg:hidden justify-end">
              <button
                onClick={closeSidebar}
                className="text-gray-500 hover:text-black rounded transition"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
                    strokeWidth={25.5}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
                    strokeWidth={25.5}
                    stroke="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 w-full h-px" />

        <div className="h-[68vh] overflow-y-auto no-scrollbar mt-2 px-2 space-y-1">
          {filteredNavItems.map((nav, i) => {
            const isActive =
              pathname.startsWith(nav.link) ||
              nav.subLinks?.some((s) => pathname.startsWith(s.link));

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
          <p className="text-[#072032] font-dm-sans font-semibold">0.00</p>
        </div>
        <IoWallet className="text-main" size={35} />
      </div>
    </>
  );

  return (
    <div className="flex gap-4 p-3 bg-[#f1f1f1]">
      {isOpen && <div className="fixed inset-0 z-100" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64  bg-white text-white z-100 rounded-tr-lg rounded-br-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideContent />
      </aside>
      <div className="w-[20%] hidden lg:flex rounded-3xl bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex-col justify-between">
        <SideContent />
      </div>

      <div className="w-full lg:w-[80%] h-screen overflow-y-auto scrollbar-hide">
        <div className="w-full flex items-center justify-between gap-2 rounded-2xl md:bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-3">
          <div onClick={toggleSidebar} className="lg:hidden">
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
          </div>
          <div className="relative ml-3 w-1/3 hidden md:block">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
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
              <div className="hidden md:block">
                <h1 className="text-sm font-poppins text-black">Hello </h1>
                <p className="text-xs font-poppins flex items-center gap-1 text-[#8094ae]">
                  {userDisplayName} <FaAngleDown size={12} />
                </p>
              </div>
              {openDrop && (
                <div className="rounded-md absolute top-12 right-0 z-10 w-40 bg-white border border-gray-200">
                  <div
                    onClick={() => router.push("/account")}
                    className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors"
                  >
                    <FaRegCircleUser size={14} /> Profile
                  </div>
                  <a href="mailto:support@shiftremit.com">
                    <div className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors cursor-pointer">
                      <MdOutlineSettings size={14} />
                      Support
                    </div>
                  </a>

                  <hr />
                  <div
                    onClick={handleSignOut}
                    className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
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
