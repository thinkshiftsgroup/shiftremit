"use client";
import SideNav from "@/components/dashboard/sideNav";
import { Calendar, Check, Filter, Search } from "lucide-react";
import React, { useState } from "react";
import AdminDataTable from "@/components/admin/dataTable";
import FilterComponent from "@/components/admin/filterBar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTrx } from "@/app/(authenticatedRoute)/user/transactions/useTrx";
import AdminUserTable from "./userTable";
import { useParams } from "next/navigation";

const UserTrx = () => {
  const [page, setPage] = useState(1);
  const params = useParams<{ id: string }>();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedPerPage, setSelectedPerPage] = useState("10");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [searchValue, setSearchValue] = useState("");

  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedOrderLabel, setSelectedOrderLabel] = useState("Newest");

  const [appliedDates, setAppliedDates] = useState({
    startDate: "",
    endDate: "",
  });

  const { getBankTrfsUserbyAdmin } = useTrx();
  const { data, isLoading } = getBankTrfsUserbyAdmin({
    page,
    limit: parseInt(selectedPerPage) || 10,
    status: selectedStatus.toUpperCase(),
    // transactionReference: searchValue,
    // startDate: appliedDates.startDate || "",
    // endDate: appliedDates.endDate || "",
    // recipientName: recipientName,
    // senderName: senderName,
    userId: params?.id,
    sortOrder: selectedOrder,
    // sortBy,
  });
  const Trxs = data?.data || [];

  const handleReset = () => {
    setSelectedStatus("");
    setSelectedOrder("");
    setSelectedOrderLabel("Newest");
    setSortBy("");
  };

  const statuses = ["Pending", "Completed", "Rejected"];
  const orderOptions = [
    // { label: "Newest", sortBy: "", sortOrder: "desc" },
    // { label: "Oldest", sortBy: "", sortOrder: "asc" },
    { label: "Amount High to Low", sortBy: "amount", sortOrder: "desc" },
    { label: "Amount Low to High", sortBy: "amount", sortOrder: "asc" },
  ];
  return (
    <div className="font-poppins">
      <div className="w-full font-poppins flex sm:flex-row flex-col items-center gap-4 bg-white p-2 rounded my-3">
        <select
          className="flex items-center gap-2 px-2 py-1.5 w-full sm:text-base text-sm bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option
            className="w-full text-gray-700 hover:bg-gray-50 text-left px-4 py-2.5 text-sm transition-colors "
            value=""
          >
            All Status
          </option>
          {statuses.map((stat, index) => {
            return (
              <option
                key={index}
                className="w-full text-gray-700 hover:bg-gray-50 text-left px-4 py-2.5 text-sm transition-colors "
                value={stat}
              >
                {stat === "Completed"
                  ? "Delivered"
                  : stat === "Pending"
                  ? "In Review"
                  : stat === "Rejected"
                  ? "Rejected"
                  : stat}
              </option>
            );
          })}
        </select>

        <select
          value={selectedOrderLabel}
          className="flex items-center gap-2 px-2 sm:text-base text-sm py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-full"
          onChange={(e) => {
            const selected = orderOptions.find(
              (o) => o.label === e.target.value
            );
            setSelectedOrder(selected?.sortOrder || "");
            setSortBy(selected?.sortBy || "");
            setSelectedOrderLabel(selected?.label || "Newest");
          }}
        >
          <option value="">Amount</option>
          {orderOptions.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleReset}
          // className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded transition-colors"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="py-3.5 bg-white rounded-md my-4 overflow-hidden">
        <AdminUserTable
          Trxs={Trxs}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          data={data}
        />
      </div>
    </div>
  );
};

export default UserTrx;
