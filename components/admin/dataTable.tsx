"use client";
import { BsCheckLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTrx } from "@/app/(authenticatedRoute)/user/transactions/useTrx";
import { toast } from "sonner";
import { FaChevronDown } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminDataTable({
  Trxs,
  isLoading,
  page,
  setPage,
  data,
}: any) {
  const [loadingStatus, setLoadingStatus] = useState<{
    id: string;
    status: string;
  } | null>(null);

  const { updateTrxStatus } = useTrx();
  const queryClient = useQueryClient();

  const formatAmount = (val: number | string) =>
    Number(val)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleStatusUpdate = (status: string, id: string) => {
    setLoadingStatus({ id, status });

    updateTrxStatus.mutate(
      { status, id },
      {
        onSuccess: () => {
          toast.success(`Status updated to ${status}`);
          queryClient.invalidateQueries({ queryKey: ["fetch-bank-tfs-admin"] });
        },
        onSettled: () => {
          setLoadingStatus(null);
        },
      }
    );
  };

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
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto" />
                </td>
              </tr>
            ) : Trxs?.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-sm font-poppins opacity-70"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              Trxs.map((row: any, index: any) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                  } border-b border-gray-100`}
                >
                  <td className="px-4 py-1 flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-900">
                    {row.user.fullName}
                    <LuArrowUpRight size={14} />
                  </td>
                  <td className="px-4 py-1 text-sm text-gray-700">
                    {row.transferReference}
                  </td>

                  <td className="px-4 text-sm py-1 font-poppins">
                    {row.fromCurrency === "NGN" ? "₦" : "£"}
                    {formatAmount(row.amount)}
                  </td>
                  <td className="px-4 flex flex-col py-1 text-sm text-gray-700">
                    <span className="font-medium">{row.recipientFullName}</span>
                    <span>{row.recipientAccountNumber}</span>
                    <span>{row.recipientBankName}</span>
                  </td>
                  <td className="px-4 py-1 text-sm text-gray-700">
                    {new Date(row.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-1 gap-1 flex flex-col text-sm text-gray-700">
                    <span
                      className={`p-1 text-center rounded-sm border uppercase ${
                        row.status === "COMPLETED"
                          ? "bg-green-500/20 text-green-500 border-green-500"
                          : row.status === "PENDING"
                          ? "bg-[#FFB90D]/20 text-[#FFB90D] border-[#FFB90D]"
                          : "bg-red-500/20 text-red-500 border-red-500"
                      }`}
                    >
                      {row.status === "COMPLETED"
                        ? "DELIVERED"
                        : row.status === "PENDING"
                        ? "IN REVIEW"
                        : row.status}
                    </span>
                    <span className="flex items-center gap-1">
                      {row.status !== "PENDING" ? (
                        new Date(row.updatedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      ) : (
                        <span className="text-gray-400 italic"></span>
                      )}
                      {row.status !== "PENDING" && (
                        <a target="_blank" href={row.pdfFile}>
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
                                clipRule="evenodd"
                              />
                              <path d="M11 7h5.5a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0z" />
                            </g>
                          </svg>
                        </a>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-1 text-sm text-gray-700">
                    <div className="text-white font-dm-sans *:font-medium *:cursor-pointer flex items-center *:p-2 text-sm">
                      <button
                        onClick={() => handleStatusUpdate("COMPLETED", row.id)}
                        disabled={row.status === "COMPLETED"}
                        className="flex disabled:bg-green-500/40 items-center gap-1 rounded-tl-md rounded-bl-md bg-green-500 shadow-sm cursor-pointer"
                      >
                        {loadingStatus?.id === row.id &&
                        loadingStatus?.status === "COMPLETED" ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <BsCheckLg size={14} />
                        )}
                        Successful
                      </button>
                      <button
                        onClick={() => handleStatusUpdate("REJECTED", row.id)}
                        disabled={row.status === "REJECTED"}
                        className="flex disabled:bg-red-500/40 items-center gap-1 rounded-tr-md rounded-br-md bg-red-500 shadow-sm cursor-pointer"
                      >
                        {loadingStatus?.id === row.id &&
                        loadingStatus?.status === "REJECTED" ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <IoCloseSharp size={14} />
                        )}{" "}
                        Failed
                      </button>{" "}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <div className="flex items-center justify-between mt-4 px-3 md:px-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          <p className="text-xs font-poppins text-main-dark">
            Page {data?.meta.currentPage}
          </p>

          <button
            onClick={() => setPage(page + 1)}
            className="p-2 disabled:opacity-40"
          >
            <ChevronRight size={20} className="text-main-dark-II" />
          </button>
        </div>
      )}
    </div>
  );
}
