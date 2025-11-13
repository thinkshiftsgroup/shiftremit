import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const FilterComponent = ({
  selectedStatus,
  setSelectedStatus,
  selectedOrder,
  setSelectedOrder,
  searchValue,
  setSearchValue,
  handleReset,
  setSortBy,
  selectedOrderLabel,
  setSelectedOrderLabel,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: any) => {
  const statuses = [true, false];

  const orderOptions = [
    { label: "Newest", sortBy: "createdAt", sortOrder: "desc" },
    { label: "Oldest", sortBy: "createdAt", sortOrder: "asc" },
    { label: "Amount High to Low", sortBy: "amount", sortOrder: "desc" },
    { label: "Amount Low to High", sortBy: "amount", sortOrder: "asc" },
  ];

  return (
    <div className="w-full font-poppins bg-white p-2 rounded my-3">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-4 text-sm w-full py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex gap-3 items-center">
          <select
            className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
            value={String(selectedStatus)}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "All") {
                setSelectedStatus("All"); // Keep it as "All"
              } else {
                setSelectedStatus(val === "true"); // Convert to boolean
              }
            }}
          >
            <option value="All" className="text-gray-700 px-4 py-2.5 text-sm">
              All Status
            </option>

            {statuses.map((stat, index) => (
              <option
                key={index}
                className="text-gray-700 px-4 py-2.5 text-sm"
                value={String(stat)}
              >
                {stat ? "Approved" : "Not Approved"}
              </option>
            ))}
          </select>

          <select
            value={selectedOrderLabel}
            className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
            onChange={(e) => {
              const selected = orderOptions.find(
                (o) => o.label === e.target.value
              );
              setSortBy(selected?.sortBy || "createdAt"); 
              setSelectedOrder(selected?.sortOrder || "desc"); 
              setSelectedOrderLabel(selected?.label || "Newest");
            }}
          >
            {orderOptions.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex flex-col items-center gap-2 transition-colors w-40">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="
          w-full
          px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          focus:border-blue-400
          duration-200
        "
            />
          </div>
          <span>To</span>

          <div className="flex flex-col items-center gap-2 transition-colors w-40">
            {/* <label className="text-sm font-medium text-gray-700 mb-1">
                            Filter by Date
                        </label> */}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="
          w-full
          px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          focus:border-blue-400
          duration-200
        "
            />
          </div>
          <button
            onClick={handleReset}
            // className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded transition-colors"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
