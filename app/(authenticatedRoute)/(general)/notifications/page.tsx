"use client";
import SideNav from "@/components/dashboard/sideNav";
import { useRatesStore } from "@/stores/useRatesStore";
import { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminRateData } from "@/api/rateService";
import { useQueryClient } from "@tanstack/react-query";
import { useFxRate } from "../../admin/fxrates/useFxRates";

const Notifications = () => {
  const [tab, setTab] = useState("naira");
  const [rateNGN, setRateNGN] = useState("");
  const [benchmarkGBP, setBenchmarkGBP] = useState("");
  const [page, setPage] = useState(1);

  const { fetchAdminRate, adminRateData, isLoading, error } = useRatesStore();
  const { updateAdminRate, getRateHistory } = useFxRate();
  const { data, isLoading: loadHistory } = getRateHistory({
    page,
    pageSize: 5,
  });
  const history = data?.data || [];

  useEffect(() => {
    if (!adminRateData && !isLoading) {
      fetchAdminRate();
      return;
    }
    if (adminRateData) {
      setRateNGN(String(adminRateData.rateNGN || ""));
      setBenchmarkGBP(String(adminRateData.benchmarkGBP || ""));
    }
  }, [isLoading, adminRateData, fetchAdminRate]);

  const queryClient = useQueryClient();

  const handleUpdate = () => {
    const newNGN = parseInt(rateNGN);
    const newGBP = parseInt(benchmarkGBP);

    updateAdminRate.mutate(
      { rateNGN: newNGN, benchmarkGBP: newGBP },
      {
        onSuccess: () => {
          toast.success("Rates updated successfully!");
          setRateNGN(String(newNGN));
          setBenchmarkGBP(String(newGBP));
          fetchAdminRate();
          queryClient.invalidateQueries({ queryKey: ["fetch-rate-history"] });
        },
      }
    );
  };

  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <SideNav>
      <div className="py-5 md:py-7 lg:py-10 flex items-start justify-between gap-5 flex-col md:flex-row">
        <div className="w-full rounded-md bg-white  shadow-md">
          <h1 className="text-[#072032] py-3 px-6 text-lg font-semibold font-dm-sans mb-2">
            My Notifications
          </h1>
          <hr />
          <div className="px-4 md:px-6 py-3">
            <div className=" grid grid-cols-3 gap-4">
              {/* <div>
                <label className="font-poppins font-semibold text-sm text-[#454745]">
                  NGN (Actual Daily Rates)
                </label>
                <input
                  type="text"
                  value={rateNGN}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[0-9]*\.?[0-9]*$/.test(val)) setRateNGN(val);
                  }}
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
        rounded-sm border border-[#d1d5db80] text-[#454745]
        focus:border-main focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-poppins font-semibold text-sm text-[#454745]">
                  GBP (Benchmark Daily Rates)
                </label>
                <input
                  type="text"
                  value={benchmarkGBP}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[0-9]*\.?[0-9]*$/.test(val)) setBenchmarkGBP(val);
                  }}
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
        rounded-sm border border-[#d1d5db80] text-[#454745]
        focus:border-main focus:outline-none transition-colors"
                />
              </div> */}
              <div className="flex items-center gap-3 p-3 border rounded bg-white shadow-sm">
                {/* Checkbox */}
                {/* <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                /> */}

                {/* Label + Input */}
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    GBP to NGN <span className="text-xs">(Alert me when pounds to naira drops below)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                    <input
                      type="number"
                      placeholder="e.g 1950.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      disabled={!checked}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded bg-white shadow-sm">
                {/* Checkbox */}
                {/* <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                /> */}

                {/* Label + Input */}
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    NGN to GBP <span className="text-xs">(Alert me when naira to pounds goes above)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                    <input
                      type="number"
                      placeholder="e.g 2000.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      disabled={!checked}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded bg-white shadow-sm">
                {/* Checkbox */}
                {/* <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                /> */}

                {/* Label + Input */}
                <div className="flex flex-row gap-3 w-full">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Send me other notifications from Shiftremit
                  </label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                  {/* <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                    <input
                      type="number"
                      placeholder="e.g 2000.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      disabled={!checked}
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="
         text-white flex justify-center w-full font-poppins border border-[#813FD6] text-base py-3 px-6 font-medium rounded-[6px] cursor-pointer
         bg-linear-to-l from-[#813FD6] to-[#301342]
         transition-all duration-300 ease-in-out
         hover:border-transparent my-5 text-center 
       "
            >
              {updateAdminRate.isPending ? (
                <Loader2 className="animate-spin text-main" size={20} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default Notifications;
