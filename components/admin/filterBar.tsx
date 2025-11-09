import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const FilterComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState("Newest");
  const [selectedPerPage, setSelectedPerPage] = useState("10");
  const [selectedCurrency, setSelectedCurrency] = useState("All Currencies");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const statuses = ["All Status", "Pending", "Completed", "Failed"];
  const orderOptions = ["Newest", "Oldest", "Amount High to Low", "Amount Low to High"];
  const perPageOptions = ["10", "20", "50", "100"];
  const currencies = [
    "All Currencies",
    "USD",
    "NGN",
    "CAD",
    "GBP",
    "EUR",
    "GHS",
    "KES",
    "TZS",
    "ZAR",
    "ZMW",
    "XAF",
    "XOF",
    "AUD",
    "NZD",
    "JPY",
    "MZN",
    "MWK",
    "SLE",
    "INR",
    "UGX",
    "XCD",
    "SEK",
    "RWF",
    "ETB",
  ];

  const handleReset = () => {
    setSearchValue("");
    setSelectedStatus("All Status");
    setSelectedOrder("Newest");
    setSelectedPerPage("10");
    setSelectedCurrency("All Currencies");
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const DropdownMenu = ({
    items,
    selected,
    onChange,
    dropdownName,
  }: {
    items: string[];
    selected: string;
    onChange: (value: string) => void;
    dropdownName: string;
  }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(dropdownName)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-40"
      >
        <span className="text-sm">{selected}</span>
        <ChevronDown size={18} className="ml-auto" />
      </button>

      {openDropdown === dropdownName && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 w-48 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                setOpenDropdown(null);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                selected === item
                  ? "bg-gray-100 font-semibold text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {selected === item && <span className="mr-2">✓</span>}
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-white p-2 rounded my-3">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 w-60"
        />

        {/* Status Dropdown */}
        <DropdownMenu
          items={statuses}
          selected={selectedStatus}
          onChange={setSelectedStatus}
          dropdownName="status"
        />

        {/* Order Dropdown */}
        <DropdownMenu
          items={orderOptions}
          selected={selectedOrder}
          onChange={setSelectedOrder}
          dropdownName="order"
        />

        {/* Per Page Dropdown */}
        <DropdownMenu
          items={perPageOptions}
          selected={selectedPerPage}
          onChange={setSelectedPerPage}
          dropdownName="perPage"
        />

        {/* Currency Dropdown */}
        <DropdownMenu
          items={currencies}
          selected={selectedCurrency}
          onChange={setSelectedCurrency}
          dropdownName="currency"
        />

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded transition-colors"
        >
          Reset
        </button>

        {/* Delete Button */}
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors">
          Delete
        </button>
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