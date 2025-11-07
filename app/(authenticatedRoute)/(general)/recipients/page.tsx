"use client";
import SideNav from "@/components/dashboard/sideNav";
import PurposeModal from "@/components/general/recipientPurposeModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";

const Recipients = () => {
  const [tab, setTab] = useState("all-account");
  const [openPurpose, setOpenPurpose] = useState(false);
  const router = useRouter();
  return (
    <SideNav>
      <div className="py-5 md:py-7 lg:py-10 flex items-start justify-between gap-5 flex-col md:flex-row">
        <div className="w-full md:w-[50%] lg:w-[60%] rounded-md bg-white py-3.5 px-4 lg:px-6 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-[#072032]  text-lg md:text-xl font-semibold font-dm-sans mb-2">
              All Recipients
            </h1>
            <button onClick={() => router.push("/send-money")} className="text-[13px] text-white font-poppins py-1.5 px-2 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]">
              Send Money <FaArrowRight />
            </button>
          </div>

          <div className="border-b border-gray-300 flex items-center gap-6">
            <div
              onClick={() => setTab("all-account")}
              className="relative flex items-center gap-2 py-2 px-4 cursor-pointer justify-start"
            >
              <p className="font-poppins text-sm">Created Recipients</p>

              <div className="relative flex items-center justify-center">
                <div className="w-5 font-poppins h-5 rounded-full bg-main text-white text-xs flex items-center justify-center">
                  2
                </div>

                {/* {tab === "all-account" && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-main rounded-full"></div>
                )} */}
              </div>
              {tab === "all-account" && (
                <div className="absolute -bottom-0.5 left-4/9 -translate-x-1/2 w-[80%] h-[3px] bg-main rounded-full"></div>
              )}
            </div>

            <div
              onClick={() => setTab("my-account")}
              className="relative flex items-center gap-2 py-2 px-4 cursor-pointer"
            >
              <p className="font-poppins text-sm">Discovered Recipients</p>

              <div className="relative flex items-center justify-center">
                <div className="w-5 font-poppins h-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  0
                </div>

                {/* {tab === "my-account" && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-main rounded-full"></div>
                )} */}
              </div>
              {tab === "my-account" && (
                <div className="absolute -bottom-0.5 left-4/9 -translate-x-1/2 w-[80%] h-[3px] bg-main rounded-full"></div>
              )}
            </div>
          </div>

          {tab === "all-account" && (
            <div className="my-3">
              <div className="rounded-lg flex items-center justify-between w-full cursor-pointer p-1.5 lg:p-3  bg-gray-100 flex-col lg:flex-row gap-2 lg:gap-0">
                <div className="flex items-center gap-2 w-full lg:w-auto border-b lg:border-0 pb-4 lg:pb-0">
                  <div className="inline-block relative">
                    <div className="font-poppins border-gray-400 border w-12 h-12 md:w-16 md:h-16 p-2 rounded-full flex justify-center items-center font-bold text-2xl">
                      JI
                    </div>
                    <div className="w-3 h-3 md:w-4 md:h-4 absolute bottom-0 -right-1 border border-white rounded-full">
                      <img
                        src="/images/shiftremit-logo.png"
                        className="object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-1">
                      <h1 className="font-poppins text-base font-semibold text-black">
                        Joshua Israel
                      </h1>
                      <p className="text-black font-dm-sans text-xs lg:hidden">
                        @joshisr23
                      </p>
                    </div>
                    <p className="text-base font-dm-sans text-black">
                      joshisr@gmail.com
                    </p>
                    <p className="text-black font-dm-sans text-sm hidden lg:block">
                      @joshisr23
                    </p>
                  </div>
                </div>
                <div className="flex lg:block w-full lg:w-auto justify-between items-start pt-2 lg:pt-0">
                  <div className="font-medium px-2 lg:px-0">
                    <p className="text-base font-dm-sans text-black">Wema Bank</p>
                    <p className="text-base font-dm-sans text-black">
                      0367829034
                    </p>
                    <p className="text-base font-dm-sans text-black">
                      Business Account
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      className="cursor-pointer"
                      onClick={() => setOpenPurpose(true)}
                      width="20"
                      height="20"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5833 14.0861V11.5468C20.5833 10.6606 20.5833 10.2176 20.4187 9.8189C20.254 9.42023 19.9409 9.10715 19.3137 8.48098L14.183 3.34706C13.6424 2.80648 13.3727 2.53673 13.0368 2.3764C12.9673 2.34301 12.8961 2.31335 12.8234 2.28756C12.4735 2.16406 12.0911 2.16406 11.3273 2.16406C7.81192 2.16406 6.05367 2.16406 4.86308 3.1239C4.62262 3.31809 4.40362 3.53745 4.20983 3.77823C3.25 4.9699 3.25 6.72815 3.25 10.2457V15.1695C3.25 19.2569 3.25 21.3011 4.51967 22.5708C5.54125 23.5924 7.06333 23.7917 9.75 23.8307M13 2.70573V3.2474C13 6.31323 13 7.84614 13.9523 8.79839C14.9034 9.75064 16.4363 9.75065 19.5 9.75065H20.0417"
                        stroke="#4F4F4F"
                        strokeWidth="1.875"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.3307 23.8281C20.3218 23.8281 22.7474 20.5781 22.7474 20.5781C22.7474 20.5781 20.3218 17.3281 17.3307 17.3281C14.3396 17.3281 11.9141 20.5781 11.9141 20.5781C11.9141 20.5781 14.3396 23.8281 17.3307 23.8281Z"
                        stroke="#4F4F4F"
                        strokeWidth="1.875"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.3203 20.5781H17.3311"
                        stroke="#4F4F4F"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      className="cursor-pointer"
                      width="20"
                      height="20"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0625 9.375V16.875M7.5 0.9375H15M0 4.6875H22.5M19.6875 4.6875V21.5625H2.8125V4.6875M8.4375 9.375V16.875"
                        stroke="#813FD6"
                        strokeWidth="1.875"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "my-account" && (
            <div className=" my-3">
              {/* <div className="flex flex-col items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 20h3.627a5.25 5.25 0 1 1 8.369-6.34Q22 12.9 22 12c0-.442 0-1.608-.002-2H2.002C2 10.392 2 11.558 2 12c0 3.771 0 5.657 1.172 6.828S6.229 20 10 20"
                  opacity=".5"
                ></path>
                <path
                  fill="currentColor"
                  d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75"
                ></path>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="currentColor"
                  d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4"
                ></path>
              </svg>
              <p className="font-poppins text-sm text-[#8094ae]">
                Don't have any data
              </p>
            </div> */}
              {/* if empty; use for both tabs */}
              <div className=" relative my-5 md:my-7 lg:my-10">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full flex items-center justify-center">
                    <img src="/images/shiftremit-logo.png" alt="" />
                  </div>
                  <div className="text-center my-5">
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-[#072032] font-dm-sans text-center font-semibold">
                      Find People and businesses on ShiftRemit
                    </h1>
                    <p className="font-poppins text-sm md:text-base text-[#454745] text-center">
                      Enter Shiftremittag, email or mobile number
                    </p>
                  </div>

                  <div className="relative">
                    <FiSearch
                      size={20}
                      className="text-[#072032] absolute top-2.5 left-2"
                    />
                    <input
                      type="text"
                      className="rounded-[10px] indent-5 w-full p-2 border-2 text-base border-main-dark-II"
                    />
                    <IoIosCloseCircle
                      size={20}
                      className="text-[#072032] absolute top-2.5 right-2"
                    />
                  </div>

                  <div className="">
                    <p className="text-base mt-10 font-dm-sans pb-2 text-gray-500 font-medium">
                      Personal account
                    </p>

                    <hr className="py-2" />

                    <div className="pb-3 md:pb-5">
                      <div className="rounded-lg w-full cursor-pointer p-3 flex justify-between items-center gap-2 bg-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="inline-block relative">
                            <div className="font-poppins border-gray-400 border w-16 h-16 p-2 rounded-full flex justify-center items-center font-bold text-2xl">
                              JI
                            </div>
                            <div className="w-4 h-4 absolute bottom-0 -right-1 border border-white rounded-full">
                              <img
                                src="/images/shiftremit-logo.png"
                                className="object-cover"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="">
                            <h1 className="font-poppins text-base font-semibold text-black">
                              Joshua Israel
                            </h1>
                            <p className="text-base py-0.5 font-dm-sans text-gray-500">
                              joshisr@gmail.com
                            </p>
                            <span className="bg-gray-50 inline-block text-gray-500 font-dm-sans rounded-full p-1 text-sm">
                              <p>@joshisr23</p>
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-base mt-10 font-dm-sans pb-2 text-gray-500 font-medium">
                        Added
                      </p>
                      <hr className="mb-5" />

                      <div className="my-5">
                        <div className="rounded-lg w-full cursor-pointer p-3 flex justify-between items-center gap-2 bg-main/20">
                          <div className="flex items-center gap-2">
                            <div className="inline-block relative">
                              <div className="font-poppins bg-white border-gray-400 border w-16 h-16 p-2 rounded-full flex justify-center items-center font-bold text-2xl">
                                JI
                              </div>
                              <div className="w-4 h-4 absolute bottom-0 -right-1 border border-white rounded-full">
                                <img
                                  src="/images/shiftremit-logo.png"
                                  className="object-cover"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="">
                              <h1 className="font-poppins text-base font-semibold text-black">
                                Joshua Israel
                              </h1>
                              <p className="text-base py-0.5 font-dm-sans text-gray-500">
                                joshisr@gmail.com
                              </p>
                              <span className="bg-gray-50 inline-block text-gray-500 font-dm-sans rounded-full p-1 text-sm">
                                <p>@joshisr23</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-[50%] lg:w-[40%] rounded-md bg-white  shadow-md">
          <h1 className="text-[#072032] py-2 px-4 md:py-4 md:px-6 text-lg font-semibold font-dm-sans">
            Add New Recipients
          </h1>
          <hr />
          <div className="px-3 md:px-4 lg:px-6 py-3">
            <div className="space-y-2">
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Bank name
                </label>
                <select
                  name=""
                  id=""
                  className="rounded-md text-base border-[#072032] font-poppins p-2 border w-full mt-1"
                >
                  <option value="">Please choose recipient's bank</option>
                </select>
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Account number
                </label>
                <input
                  type="text"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>{" "}
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Fullname of the account holder
                </label>
                <input
                  type="text"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Their email (optional)
                </label>
                <input
                  type="email"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Their mobile number (optional)
                </label>
                <input
                  type="email"
                  className="rounded-md border-[#072032] p-2 border w-full mt-1 text-base font-poppins active:border-[#072032]"
                />
              </div>
              <div>
                <label
                  className="text-base font-semibold text-[#072032] font-poppins"
                  htmlFor=""
                >
                  Purpose
                </label>
                <textarea
                  placeholder="Purpose"
                  className="rounded-md font-poppins text-base h-[100px] border-[#072032] p-2 border w-full mt-1"
                />
              </div>
              <div className="flex justify-end">
                <div className="flex items-center gap-1">
                  <p className="font-poppins text-sm">
                    Is this a business bank account
                  </p>
                  <input type="checkbox" className="accent-main w-3.5 h-3.5" />
                </div>
              </div>
            </div>
            <button
              // onClick={() => router.push("/send-money/fund")}
              className="
    text-white w-full font-poppins border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
    bg-linear-to-l from-[#813FD6] to-[#301342]
    transition-all duration-300 ease-in-out
    hover:border-transparent my-5 text-center 
  "
            >
              Add
            </button>
          </div>
        </div>

        {openPurpose && (
          <PurposeModal
            openPurpose={openPurpose}
            setOpenPurpose={setOpenPurpose}
          />
        )}
      </div>
    </SideNav>
  );
};

export default Recipients;
