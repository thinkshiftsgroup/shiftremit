"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface Currency {
  code: string;
  name: string;
  flag: { url?: string; file?: File };
  popular: boolean;
}

interface DropdownComponentProps {
  defaultCurrency?: string;
}

export default function DropdownComponent({
  defaultCurrency = "GBP",
}: DropdownComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );

  // Stable currencies data
  const currencies = useMemo<Currency[]>(
    () => [
      {
        code: "GBP",
        name: "British Pound sterling",
        flag: {
          url: "https://transfermax.springsoftit.com/demo/files/image/currency/67344a3a6f5ee-1731480122.jpg",
        },
        popular: true,
      },
      {
        code: "NGN",
        name: "Nigeria Naira",
        flag: { url: "https://flagcdn.com/ng.svg" },
        popular: true,
      },
    ],
    []
  );

  useEffect(() => {
    const found = currencies.find((c) => c.code === defaultCurrency);
    if (found) setSelectedCurrency(found);
  }, [defaultCurrency, currencies]);

  const filteredCurrencies = useMemo(
    () =>
      currencies.filter(
        (c) =>
          c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, currencies]
  );

  const popularCurrencies = filteredCurrencies.filter((c) => c.popular);
  const otherCurrencies = filteredCurrencies.filter((c) => !c.popular);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    setSearchTerm("");
  };

  const getFlagSrc = (flag: { url?: string; file?: File }) => {
    if (flag.file) return URL.createObjectURL(flag.file);
    return flag.url || "";
  };

  return (
    <div className="relative w-full z-50">
      {/* Button */}
      <button
        type="button"
        className="flex items-center justify-between transition-all duration-200 gap-2 w-full"
        onClick={toggleDropdown}
      >
        {selectedCurrency && (
          <img
            src={getFlagSrc(selectedCurrency.flag)}
            alt={selectedCurrency.code}
            className="rounded-full object-cover w-6.5 h-6.5"
          />
        )}
        <span className="font-semibold">
          {selectedCurrency ? selectedCurrency.code : ""}
        </span>
        {isOpen ? (
          <ChevronUp size={24} className="text-white me-2" />
        ) : (
          <ChevronDown size={24} className="text-white me-2" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-[350px] max-h-[380px] h-auto pb-2 top-full -left-[265%] mt-5 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          {/* Search box */}
          <div className="p-2.5">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-700"
              />
              <input
                type="text"
                placeholder="Currency Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 text-black border-[#d1d5db80] rounded-[8.5px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCurrencies.length === 0 ? (
              <div className="p-2.5 text-center text-gray-500">
                No currencies found
              </div>
            ) : (
              <>
                {popularCurrencies.length > 0 && (
                  <div className="p-2.5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 text-start">
                      Available Currencies
                    </h3>
                    {popularCurrencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleSelect(currency)}
                        className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 transition-colors duration-150 ${
                          selectedCurrency?.code === currency.code
                            ? "bg-[#f1f5f9]"
                            : "hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <img
                          src={getFlagSrc(currency.flag)}
                          alt={currency.code}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="flex gap-2 items-center">
                          <p className="font-semibold text-gray-800">
                            {currency.code}
                          </p>
                          <p className="text-xs text-gray-600">
                            {currency.name}
                          </p>
                        </div>
                        {selectedCurrency?.code === currency.code && (
                          <span className="ml-auto text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47"
                                strokeWidth={0.5}
                                stroke="currentColor"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {otherCurrencies.length > 0 && (
                  <div className="p-2.5">
                    {!searchTerm && (
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 text-start">
                        All Currencies
                      </h3>
                    )}
                    {otherCurrencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleSelect(currency)}
                        className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 transition-colors duration-150 ${
                          selectedCurrency?.code === currency.code
                            ? "bg-[#f1f5f9]"
                            : "hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <img
                          src={getFlagSrc(currency.flag)}
                          alt={currency.code}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="flex gap-2 items-center">
                          <p className="font-semibold text-gray-800">
                            {currency.code}
                          </p>
                          <p className="text-xs text-gray-600">
                            {currency.name}
                          </p>
                        </div>
                        {selectedCurrency?.code === currency.code && (
                          <span className="ml-auto text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47"
                                strokeWidth={0.5}
                                stroke="currentColor"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
