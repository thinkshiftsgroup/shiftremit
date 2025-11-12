import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const FilterComponent = ({
  selectedStatus,
  setSelectedStatus,
  selectedOrder,
  setSelectedOrder,
  selectedPerPage,
  setSelectedPerPage,
  selectedCurrency,
  setSelectedCurrency,
  searchValue,
  setSearchValue,
  handleReset,
  setSenderName,
  setRecipientName,
  recipientName,
  senderName,
  // sortBy,
  setSortBy,
  selectedOrderLabel,
  setSelectedOrderLabel,
}: // sortOrder,
// setSortOrder
any) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);

  const statuses = ["Approved", "Not Approved", "Rejected"];
  const orderOptions = [
    { label: "Newest", sortBy: "", sortOrder: "desc" },
    { label: "Oldest", sortBy: "", sortOrder: "asc" },
    { label: "Amount High to Low", sortBy: "amount", sortOrder: "desc" },
    { label: "Amount Low to High", sortBy: "amount", sortOrder: "asc" },
  ];

  const perPageOptions = ["10", "15", "25"];
  const currencies = ["NGN", "GBP"];

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const [date, setDate] = useState("");
  return (
    <div className="w-full font-poppins bg-white p-2 rounded my-3">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="px-4 text-sm w-full py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex gap-3 items-center">
          <select
            className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
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
                  {stat}
                </option>
              );
            })}
          </select>

          <select
            value={selectedOrderLabel}
            className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
            onChange={(e) => {
              const selected = orderOptions.find(
                (o) => o.label === e.target.value
              );
              setSelectedOrder(selected?.sortOrder || "");
              setSortBy(selected?.sortBy || "");
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
            {/* <label className="text-sm font-medium text-gray-700 mb-1">
                            Filter by Date
                        </label> */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
          {/* Reset Button */}
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
