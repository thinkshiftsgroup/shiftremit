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

  const statuses = ["Pending", "Completed", "Rejected"];
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

  // const DropdownMenu = ({
  //   items,
  //   selected,
  //   onChange,
  //   dropdownName,
  // }: {
  //   items: string[];
  //   selected: string;
  //   onChange: (value: string) => void;
  //   dropdownName: string;
  // }) => (
  //   <div className="relative">
  //     <button
  //       onClick={() => toggleDropdown(dropdownName)}
  //       className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
  //     >
  //       <span className="text-sm">{selected}</span>
  //       <ChevronDown size={18} className="ml-auto" />
  //     </button>

  //     {openDropdown === dropdownName && (
  //       <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 w-48 max-h-60 overflow-y-auto">
  //         {items.map((item) => (
  //           <button
  //             key={item}
  //             onClick={() => {
  //               onChange(item);
  //               setOpenDropdown(null);
  //             }}
  //             className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
  //               selected === item
  //                 ? "bg-gray-100 font-semibold text-gray-900"
  //                 : "text-gray-700 hover:bg-gray-50"
  //             }`}
  //           >
  //             {selected === item && <span className="mr-2">✓</span>}
  //             {item}
  //           </button>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="w-full font-poppins bg-white p-2 rounded my-3">
      {/* Filter Bar */}
      <div className="flex flex-col gap-2 items-center">
        {/* Search Input */}
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search by Trx ID"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-4 w-full text-sm py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />

          <input
            type="text"
            placeholder="Search by Sender Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="px-4 w-full text-sm py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />

          {user?.userType === "admin" && (
            <input
              type="text"
              placeholder="Search by Recipient Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="px-4 w-full text-sm py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Status Dropdown */}
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
          {/* <DropdownMenu
          items={statuses}
          selected={selectedStatus}
          onChange={setSelectedStatus}
          dropdownName="status"
        /> */}

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

          {/* Order Dropdown */}
          {/* <DropdownMenu
          items={orderOptions}
          selected={selectedOrder}
          onChange={setSelectedOrder}
          dropdownName="order"
        /> */}

          <select
            value={selectedPerPage}
            className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
            id=""
            onChange={(e) => setSelectedPerPage(e.target.value)}
          >
            {perPageOptions.map((per, index) => {
              return (
                <option
                  key={index}
                  className="w-full text-gray-700 hover:bg-gray-50 text-left px-4 py-2.5 text-sm transition-colors "
                  value={per}
                >
                  {per}
                </option>
              );
            })}
          </select>
          {/* Per Page Dropdown */}
          {/* <DropdownMenu
          items={perPageOptions}
          selected={selectedPerPage}
          onChange={setSelectedPerPage}
          dropdownName="perPage"
        /> */}

          {/* <select
          name=""
          className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {currencies.map((currency, index) => {
            return (
              <option
                key={index}
                className="w-full text-gray-700 hover:bg-gray-50 text-left px-4 py-2.5 text-sm transition-colors "
                value={currency}
              >
                {currency}
              </option>
            );
          })}
        </select> */}
          {/* Currency Dropdown */}
          {/* <DropdownMenu
          items={currencies}
          selected={selectedCurrency}
          onChange={setSelectedCurrency}
          dropdownName="currency"
        /> */}

          {/* Reset Button */}
          <button
            onClick={handleReset}
            // className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded transition-colors"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
          >
            Reset
          </button>

          {/* Delete Button */}
          {/* <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors">
          Delete
        </button> */}
        </div>
      </div>

      {/* Display Selected Filters (Optional) */}
      {/* <div className="mt-6 p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Active Filters:</strong> Status: {selectedStatus} | Order: {selectedOrder} | Per Page: {selectedPerPage} | Currency: {selectedCurrency}
        </p>
      </div> */}
    </div>
  );
};

export default FilterComponent;
