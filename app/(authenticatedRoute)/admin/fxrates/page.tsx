"use client";
import SideNav from "@/components/dashboard/sideNav";
import { useRatesStore } from "@/stores/useRatesStore";
import { useEffect, useState } from "react";
import { useFxRate } from "./useFxRates";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminRateData } from "@/api/rateService";
import { useQueryClient } from "@tanstack/react-query";

const FXRates = () => {
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
  console.log(data, "jis");

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

  return (
    <SideNav>
      <div className="py-10 flex items-start justify-between gap-5">
        <div className="w-1/2  rounded-md bg-white py-3.5 px-6 shadow-md">
          <h1 className="text-[#072032]  text-xl font-semibold font-dm-sans mb-2">
            Rate History
          </h1>

          <div className="border-b border-gray-300 flex items-center gap-6">
            <div
              onClick={() => setTab("naira")}
              className={`flex items-center gap-2 py-2 px-4 cursor-pointer ${
                tab === "naira" ? " border-b-2 border-b-main " : ""
              } `}
            >
              <p className="font-poppins text-sm">Naira (₦)</p>
            </div>

            <div
              onClick={() => setTab("pounds")}
              className={`flex items-center gap-2 py-2 px-4 cursor-pointer ${
                tab === "pounds" ? " border-b-2 border-b-main " : ""
              } `}
            >
              <p className="font-poppins text-sm">Pounds (£)</p>
            </div>
          </div>

          {tab === "naira" && (
            <div className="">
              {loadHistory ? (
                <div className="flex justify-center my-10">
                  <Loader2 className="animate-spin text-main" size={30} />
                </div>
              ) : history.length > 0 ? (
                history.map((historyItem: AdminRateData) => (
                  <div
                    key={historyItem.id}
                    className="flex items-center justify-between px-2 border-b border-b-gray-200 py-2 text-sm"
                  >
                    <div>
                      <p className="text-main font-poppins font-medium">
                        ₦{historyItem.rateNGN.toLocaleString()}
                      </p>
                      <p className="text-xs font-poppins text-main-dark">
                        Benchmark: £{historyItem.benchmarkGBP}
                      </p>
                    </div>

                    <p className="text-xs font-dm-sans text-main-dark">
                      {new Date(historyItem.recordedAt!).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-10">
                  <p className="font-poppins text-sm text-[#8094ae]">
                    No rate history found.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="p-2 disabled:opacity-40"
                >
                  <ChevronLeft />
                </button>

                <p className="text-xs font-poppins text-main-dark">
                  Page {data.meta.page} of {data.meta.totalPages}
                </p>

                <button
                  disabled={page === data.meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 disabled:opacity-40"
                >
                  <ChevronRight size={20} className="text-main-dark-II" />
                </button>
              </div>
            </div>
          )}
          {tab === "pounds" && (
            <div className="">
              {loadHistory ? (
                <div className="flex justify-center my-10">
                  <Loader2 className="animate-spin text-main" size={30} />
                </div>
              ) : history.length > 0 ? (
                history.map((historyItem: AdminRateData) => (
                  <div
                    key={historyItem.id}
                    className="flex items-center justify-between px-2 border-b border-b-gray-200 py-2 text-sm"
                  >
                    <div>
                      <p className="text-main font-poppins font-medium">
                        Benchmark: £{historyItem.benchmarkGBP}
                      </p>
                      <p className="text-xs font-poppins text-main-dark">
                        ₦{historyItem.rateNGN.toLocaleString()}
                      </p>
                    </div>

                    <p className="text-xs font-dm-sans text-main-dark">
                      {new Date(historyItem.recordedAt!).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-10">
                  <p className="font-poppins text-sm text-[#8094ae]">
                    No rate history found.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="p-2 disabled:opacity-40"
                >
                  <ChevronLeft />
                </button>

                <p className="text-xs font-poppins text-main-dark">
                  Page {data.meta.page} of {data.meta.totalPages}
                </p>

                <button
                  disabled={page === data.meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 disabled:opacity-40"
                >
                  <ChevronRight size={20} className="text-main-dark-II" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-1/2 rounded-md bg-white  shadow-md">
          <h1 className="text-[#072032] py-3 px-6 text-lg font-semibold font-dm-sans mb-2">
            Manage Live Rates
          </h1>
          <hr />
          <div className="px-6 py-3">
            <div className="space-y-2">
              <div>
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
                "Go Live"
              )}
            </button>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default FXRates;
