import SideNav from "@/components/dashboard/sideNav";
import { FaMagnifyingGlass } from "react-icons/fa6";

const TrackMoney = () => {
  return (
    <SideNav>
      <div className="mx-20">
        <div className="my-10  p-5 container mx-auto rounded-sm w-full bg-white">
          <h1 className="text-[#072032] text-center text-lg font-semibold font-dm-sans mb-2">
            Track Transfer
          </h1>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Transaction Id"
              className="rounded-sm font-poppins w-full py-3 px-3.5 font-normal border border-[#d1d5db80]"
            />
            <button className="text-white bg-main rounded-sm font-poppins font-medium cursor-pointer flex items-center gap-2 p-3">
              <FaMagnifyingGlass /> Track
            </button>
          </div>

          <div className="rounded-sm mt-5 font-poppins w-full flex items-center justify-center p-5 min-h-[400px] font-normal border border-[#d1d5db80]">
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
                  fill-rule="evenodd"
                  d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill="currentColor"
                  d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4"
                ></path>
              </svg>
              <p className="font-poppins text-xs text-[#8094ae]">There is no result</p>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default TrackMoney;
