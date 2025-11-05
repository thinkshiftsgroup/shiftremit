"use client";
import SideNav from "@/components/dashboard/sideNav";
import { useState } from "react";

const Recipients = () => {
  const [tab, setTab] = useState("all-account");
  return (
    <SideNav>
      <div className="py-10 flex items-start justify-between gap-5">
        <div className="w-1/2 rounded-md bg-white py-3.5 px-6 shadow-md">
          <h1 className="text-[#072032]  text-xl font-semibold font-dm-sans mb-2">
            All Recipients
          </h1>

          <div className="border-b flex items-center gap-2">
            <div
              onClick={() => setTab("all-account")}
              className={`font-poppins text-sm ${
                tab === "all-account"
                  ? "text-main border-b-2 border-b-main"
                  : "text-black"
              } cursor-pointer flex items-center gap-2 py-2 px-4`}
            >
              <p>All Account</p>
              <p
                className={`${
                  tab === "all-account" ? "bg-main" : "bg-black"
                } rounded-full p-1 text-white w-4.5 h-4.5 flex items-center justify-center`}
              >
                0
              </p>
            </div>
            <div
              onClick={() => setTab("my-account")}
              className={`font-poppins text-sm ${
                tab === "my-account"
                  ? "text-main border-b-2 border-b-main"
                  : "text-black"
              } cursor-pointer flex items-center gap-2 py-2 px-4`}
            >
              <p>My Account</p>
              <p
                className={`${
                  tab === "my-account" ? "bg-main" : "bg-black"
                } rounded-full p-1 text-white w-4.5 h-4.5 flex items-center justify-center`}
              >
                0
              </p>
            </div>
          </div>

          <div className="h-[50vh] flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
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
            </div>
          </div>
        </div>
        <div className="w-1/2 rounded-md bg-white  shadow-md">
          <h1 className="text-[#072032] py-3.5 px-6 text-lg font-semibold font-dm-sans mb-2">
            Add New Recipients
          </h1>
          <hr />
          <div className="px-6 py-3">
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
      </div>
    </SideNav>
  );
};

export default Recipients;
