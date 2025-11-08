"use client";
import { Filter } from "lucide-react";
import React, { useState } from "react";

export default function DataTable() {
    const sampleData = [
        {
            no: 1,
            customer: "Felix Hohno",
            email: "felixhorn36748@gmail.com",
            totalTrx: "65",
            lastTrx: "£400",
            status: "Completed",
            date: "12/04/26",
            id: "gdh239",
        },
        {
            no: 2,
            customer: "Jane Smith",
            email: "janesmith@example.com",
            totalTrx: "65",
            lastTrx: "£400",
            status: "Completed",
            date: "12/04/26",
            id: "gdh239",
        },
        {
            no: 3,
            customer: "Michael Johnson",
            email: "michaeljohnson@example.com",
            totalTrx: "65",
            lastTrx: "£400",
            status: "Completed",
            date: "12/04/26",
            id: "gdh239",
        },
        {
            no: 4,
            customer: "Sarah Williams",
            email: "sarahwilliams@example.com",
            totalTrx: "65",
            lastTrx: "£400",
            status: "Completed",
            date: "12/04/26",
            id: "gdh239",
        },
    ];

    const [showAPT, setShowAPT] = useState(false);
    return (
        <div className=" ">
            {/* <div className="flex sm:hidden justify-end">
                <Filter
                    className="flex justify-end sm:hidden w-6 h-6 my-2"
                    onClick={() => setShowAPT((prev) => !prev)}
                    size={20}
                />
            </div>
            <div className="text-black my-2 p-2 sm:p-0 whitespace-nowrap border bg-[#F9F9FB] text-xs font-medium justify-around border-[#D5D5D5] hidden sm:flex sm:flex-row flex-col items-center rounded-md">
                <span className="flex gap-2 pl-1 w-1/3 cursor-pointer">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 91 91"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M62.1609 56.8028L82.3762 77.0181C83.0867 77.7292 83.4857 78.6933 83.4853 79.6985C83.485 80.7038 83.0853 81.6676 82.3743 82.3782C81.6633 83.0887 80.6991 83.4877 79.6939 83.4874C78.6887 83.487 77.7248 83.0873 77.0142 82.3763L56.7989 62.161C50.7558 66.8416 43.1565 69.0443 35.547 68.3209C27.9376 67.5974 20.8895 64.0023 15.8366 58.2668C10.7837 52.5313 8.10559 45.0863 8.34705 37.4463C8.58851 29.8063 11.7314 22.5453 17.1364 17.1403C22.5414 11.7353 29.8024 8.59242 37.4424 8.35095C45.0824 8.10949 52.5274 10.7876 58.2629 15.8405C63.9984 20.8934 67.5935 27.9415 68.317 35.551C69.0404 43.1604 66.8377 50.7597 62.1571 56.8028M38.3947 60.9398C44.374 60.9398 50.1084 58.5646 54.3364 54.3366C58.5644 50.1086 60.9397 44.3742 60.9397 38.3949C60.9397 32.4156 58.5644 26.6812 54.3364 22.4532C50.1084 18.2252 44.374 15.85 38.3947 15.85C32.4155 15.85 26.6811 18.2252 22.4531 22.4532C18.2251 26.6812 15.8498 32.4156 15.8498 38.3949C15.8498 44.3742 18.2251 50.1086 22.4531 54.3366C26.6811 58.5646 32.4155 60.9398 38.3947 60.9398Z"
                            fill="#041827"
                        />
                    </svg>
                </span>

                <div className="self-stretch w-px bg-[#D5D5D5]" />

                <span className="flex items-center py-3 ">
                    <select
                        className="bg-transparent outline-none cursor-pointer w-full text-[#041827] appearance-none"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Date
                        </option>
                        <option value="today">Today</option>
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                    </select>
                </span>

                <div className="self-stretch w-px bg-[#D5D5D5]" />

                <span className="flex items-center py-3 w-[180px]">
                    <select
                        className="bg-transparent outline-none cursor-pointer w-full text-[#041827] appearance-none"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Transaction Status
                        </option>
                        <option value="success">Successful</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </span>

                <div className="self-stretch w-px bg-[#D5D5D5]" />

                <span className="flex cursor-pointer items-center gap-2 py-3 px-2 text-[#EA0234]">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 50 49"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24.6619 10.3563V2.23438L14.5094 12.3868L24.6619 22.5393V14.4173C31.3828 14.4173 36.8448 19.8793 36.8448 26.6002C36.8448 33.3211 31.3828 38.7832 24.6619 38.7832C17.941 38.7832 12.4789 33.3211 12.4789 26.6002H8.41797C8.41797 35.575 15.6871 42.8441 24.6619 42.8441C33.6366 42.8441 40.9058 35.575 40.9058 26.6002C40.9058 17.6255 33.6366 10.3563 24.6619 10.3563Z"
                            fill="#EA0234"
                        />
                    </svg>
                    <p>Reset filter</p>
                </span>
            </div>

            {showAPT && (
                <div className="text-black my-2 p-2 sm:p-0 whitespace-nowrap border bg-[#F9F9FB] text-xs font-medium justify-around border-[#D5D5D5] sm:hidden flex sm:flex-row flex-col items-center rounded-md">
                    <span className="flex gap-2 pl-0 sm:pl-1 w-full sm:w-1/3 cursor-pointer">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 91 91"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M62.1609 56.8028L82.3762 77.0181C83.0867 77.7292 83.4857 78.6933 83.4853 79.6985C83.485 80.7038 83.0853 81.6676 82.3743 82.3782C81.6633 83.0887 80.6991 83.4877 79.6939 83.4874C78.6887 83.487 77.7248 83.0873 77.0142 82.3763L56.7989 62.161C50.7558 66.8416 43.1565 69.0443 35.547 68.3209C27.9376 67.5974 20.8895 64.0023 15.8366 58.2668C10.7837 52.5313 8.10559 45.0863 8.34705 37.4463C8.58851 29.8063 11.7314 22.5453 17.1364 17.1403C22.5414 11.7353 29.8024 8.59242 37.4424 8.35095C45.0824 8.10949 52.5274 10.7876 58.2629 15.8405C63.9984 20.8934 67.5935 27.9415 68.317 35.551C69.0404 43.1604 66.8377 50.7597 62.1571 56.8028M38.3947 60.9398C44.374 60.9398 50.1084 58.5646 54.3364 54.3366C58.5644 50.1086 60.9397 44.3742 60.9397 38.3949C60.9397 32.4156 58.5644 26.6812 54.3364 22.4532C50.1084 18.2252 44.374 15.85 38.3947 15.85C32.4155 15.85 26.6811 18.2252 22.4531 22.4532C18.2251 26.6812 15.8498 32.4156 15.8498 38.3949C15.8498 44.3742 18.2251 50.1086 22.4531 54.3366C26.6811 58.5646 32.4155 60.9398 38.3947 60.9398Z"
                                fill="#041827"
                            />
                        </svg>
                    </span>

                    <div className="self-stretch w-px bg-[#D5D5D5]" />

                    <span className="flex items-center sm:w-auto w-full py-3 ">
                        <select
                            className="bg-transparent outline-none cursor-pointer w-full text-[#041827] "
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Date
                            </option>
                            <option value="today">Today</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                        </select>
                    </span>

                    <div className="self-stretch w-px bg-[#D5D5D5]" />

                    <span className="flex items-center py-3 w-full sm:w-[180px]">
                        <select
                            className="bg-transparent outline-none cursor-pointer w-full text-[#041827] "
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Transaction Status
                            </option>
                            <option value="success">Successful</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </span>

                    <div className="self-stretch w-px bg-[#D5D5D5]" />

                    <span className="flex cursor-pointer items-center gap-2 py-3 px-2 text-[#EA0234]">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 50 49"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24.6619 10.3563V2.23438L14.5094 12.3868L24.6619 22.5393V14.4173C31.3828 14.4173 36.8448 19.8793 36.8448 26.6002C36.8448 33.3211 31.3828 38.7832 24.6619 38.7832C17.941 38.7832 12.4789 33.3211 12.4789 26.6002H8.41797C8.41797 35.575 15.6871 42.8441 24.6619 42.8441C33.6366 42.8441 40.9058 35.575 40.9058 26.6002C40.9058 17.6255 33.6366 10.3563 24.6619 10.3563Z"
                                fill="#EA0234"
                            />
                        </svg>
                        <p>Reset filter</p>
                    </span>
                </div>
            )} */}

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-max border-collapse">
                    <thead>
                        <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                            <th className="px-4 py-2 whitespace-nowrap">Customer</th>
                            <th className="px-4 py-2 whitespace-nowrap">Email</th>
                            <th className="px-4 py-2 whitespace-nowrap">Total Trx</th>
                            <th className="px-4 py-2 whitespace-nowrap">Last Trx</th>
                            <th className="px-4 py-2 whitespace-nowrap">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sampleData.map((row, index) => (
                            <tr
                                key={row.no}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                                    } border-b border-gray-100`}
                            >
                                <td className="px-4 py-1 text-sm font-medium text-gray-900">
                                    {row.customer}
                                </td>
                                <td className="px-4 py-1 text-sm text-gray-700">
                                    {row.email}
                                </td>
                                <td className="px-4 py-1 text-sm text-gray-700">
                                    {row.totalTrx}
                                </td>
                                <td className="px-4 py-1 text-sm text-gray-700">
                                    <span className="font-bold">{row.lastTrx}</span> (id: {row.id})
                                </td>
                                <td className="px-4 py-1 text-sm text-gray-700">
                                    <span className="p-1 m-1 rounded-xs flex bg-[#e8f7eb]">
                                        {row.status} ({row.date})
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
