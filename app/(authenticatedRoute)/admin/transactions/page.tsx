import SideNav from "@/components/dashboard/sideNav";
import React from "react";

const AdminTrx = () => {
  return (
    <SideNav>
      <div className="my-6">
        <div className="py-3.5  bg-white rounded-md my-4">
          <h1 className="text-[#072032] px-6 text-lg font-semibold font-dm-sans mb-2">
            Transaction Logs
          </h1>
          <div className="">
            <table className="w-full">
              <thead className="bg-[#e2e8f0] w-full">
                <tr className="w-full">
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Trx
                  </th>
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Sending Amount
                  </th>
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Receiving Amount
                  </th>
                  <th className="font-poppins py-2 px-6 text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="72"
                        height="72"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path
                            strokeLinecap="round"
                            d="M11.5 21c-4.478 0-6.718 0-8.109-1.391S2 15.979 2 11.5c0-4.478 0-6.718 1.391-8.109S7.021 2 11.5 2c4.478 0 6.718 0 8.109 1.391S21 7.021 21 11.5"
                          />
                          <path strokeLinejoin="round" d="M2 7h19" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 16h1m-5 0h1m3-4h4m-8 0h1m13.4 8.4L22 22m-.8-4.4a3.6 3.6 0 1 0-7.2 0a3.6 3.6 0 0 0 7.2 0"
                          />
                        </g>
                      </svg>
                      <p className="font-poppins text-[#8094ae]">
                        Don't have data
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default AdminTrx;
