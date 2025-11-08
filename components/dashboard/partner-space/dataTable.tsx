"use client";
import { Filter } from "lucide-react";
import { LuArrowUpRight } from "react-icons/lu";
import React, { useState } from "react";

export default function DataTable() {
  const sampleData = [
    {
      no: 1,
      customer: "Felix Hohno",
      email: "felixhorn36748@gmail.com",
      totalTrx: "sr324564",
      lastTrx: "£400",
      status: "Completed",
      date: "12/04/26 18:00",
      id: "gdh239",
    },
    {
      no: 2,
      customer: "Jane Smith",
      email: "janesmith@example.com",
      totalTrx: "sr324564",
      lastTrx: "£400",
      status: "Pending",
      date: "",
      id: "gdh239",
    },
    {
      no: 3,
      customer: "Michael Johnson",
      email: "michaeljohnson@example.com",
      totalTrx: "sr324564",
      lastTrx: "£400",
      status: "Abandoned",
      date: "12/04/26 18:00",
      id: "gdh239",
    },
    {
      no: 4,
      customer: "Sarah Williams",
      email: "sarahwilliams@example.com",
      totalTrx: "sr324564",
      lastTrx: "£400",
      status: "Rejected",
      date: "12/04/26 18:00",
      id: "gdh239",
    },
  ];

  const [showAPT, setShowAPT] = useState(false);
  return (
    <div className=" ">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
              <th className="px-4 py-2 whitespace-nowrap">Customer</th>
              <th className="px-4 py-2 whitespace-nowrap">Trx ID</th>
              <th className="px-4 py-2 whitespace-nowrap">Sending Trx</th>
              <th className="px-4 py-2 whitespace-nowrap">Recipient</th>
              <th className="px-4 py-2 whitespace-nowrap">Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Status</th>
              <th className="px-4 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {sampleData.map((row, index) => (
              <tr
                key={row.no}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                } border-b border-gray-100`}
              >
                <td className="px-4 py-1 flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-900">
                  {row.customer}
                  <LuArrowUpRight size={14} />
                </td>
                <td className="px-4 py-1 text-sm text-gray-700">
                  {row.totalTrx}
                </td>
                <td className="px-4 py-1 text-sm text-gray-700">
                  <span className="font-bold">{row.lastTrx}</span> (ref:{" "}
                  {row.id})
                </td>{" "}
                <td className="px-4 flex flex-col py-1 text-sm text-gray-700">
                  <span>Account Name</span>
                  <span>1234532234</span>
                  <span>Bank Name</span>
                </td>
                <td className="px-4 py-1 text-sm text-gray-700">{row.date}</td>
                <td className="px-4 py-1 flex flex-col text-sm text-gray-700">
                  <span className="p-1 m-1 rounded-xs flex bg-[#e8f7eb]">
                    {row.status}
                  </span>
                  <span className="flex items-center gap-1">
                    {row.date}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="text-black"
                    >
                      <g fill="">
                        <path d="M6.5 12a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1z" />
                        <path
                          fill-rule="evenodd"
                          d="M11.185 1H4.5A1.5 1.5 0 0 0 3 2.5v15A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5V7.202a1.5 1.5 0 0 0-.395-1.014l-4.314-4.702A1.5 1.5 0 0 0 11.185 1M4 2.5a.5.5 0 0 1 .5-.5h6.685a.5.5 0 0 1 .369.162l4.314 4.702a.5.5 0 0 1 .132.338V17.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z"
                          clip-rule="evenodd"
                        />
                        <path d="M11 7h5.5a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0z" />
                      </g>
                    </svg>
                  </span>
                </td>
                <td className="px-4  py-1 text-sm text-gray-700">
                  <div className="text-white font-poppins *:cursor-pointer flex items-center *:p-3 text-sm">
                    <span className="flex items-center gap-1 ">Accept</span>
                    <span className="flex items-center gap-1 ">Decline</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
