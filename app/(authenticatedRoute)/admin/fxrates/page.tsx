"use client";
import SideNav from "@/components/dashboard/sideNav";
import { useRatesStore } from "@/stores/useRatesStore";
import { useEffect, useState } from "react";
import { useFxRate } from "./useFxRates";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminRateData, FxRateData } from "@/api/rateService";
import { useQueryClient } from "@tanstack/react-query";

const FXRates = () => {
  const [tab, setTab] = useState("naira");
  const [rateNGN, setRateNGN] = useState("");
  const [benchmarkGBP, setBenchmarkGBP] = useState("");
  const [page, setPage] = useState(1);
  const [tradeNGNBought, setTradeNGNBought] = useState(1944.13);
  const [tradeNGNSold, setTradeNGNSold] = useState(1970.54);

  const [tradeGBP, setTradeGBP] = useState(1915.54);
  const { fetchAdminRate, fetchRates, adminRateData, isLoading, error } =
    useRatesStore();
  const { updateAdminRate, getRateHistory } = useFxRate();
  const { data, isLoading: loadHistory } = getRateHistory({
    page,
    pageSize: 5,
  });
  const history = data?.data || [];

  useEffect(() => {
    if (!adminRateData && !isLoading) {
      fetchAdminRate();
      fetchRates();
      return;
    }
    if (adminRateData) {
      setRateNGN(String(adminRateData.rateNGN || ""));
      setBenchmarkGBP(String(adminRateData.benchmarkGBP || ""));
    }
  }, [isLoading, adminRateData, fetchAdminRate]);

  const ratesData = useRatesStore(
    (state) => state.ratesData as FxRateData | null
  );
  const lemfi = ratesData?.lemfi?.rate || 0;
  console.log(lemfi);
  const liveRate = lemfi + (adminRateData?.benchmarkGBP || 0) + 1;

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
      <div className="py-5 md:py-7 lg:py-10 flex items-start justify-between gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2  rounded-md bg-white py-3.5 px-3 md:px-6 shadow-md">
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

            <div
              onClick={() => setTab("trade")}
              className={`flex items-center gap-2 py-2 px-4 cursor-pointer ${
                tab === "trade" ? " border-b-2 border-b-main " : ""
              } `}
            >
              <p className="font-poppins text-sm">Trade</p>
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

              {loadHistory ? (
                ""
              ) : (
                <div className="flex items-center justify-between mt-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="p-2 disabled:opacity-40"
                  >
                    <ChevronLeft />
                  </button>

                  <p className="text-xs font-poppins text-main-dark">
                    Page {data?.meta.page} of {data?.meta.totalPages}
                  </p>

                  <button
                    disabled={page === data?.meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-2 disabled:opacity-40"
                  >
                    <ChevronRight size={20} className="text-main-dark-II" />
                  </button>
                </div>
              )}
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

              {loadHistory ? (
                ""
              ) : (
                <div className="flex items-center justify-between mt-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="p-2 disabled:opacity-40"
                  >
                    <ChevronLeft />
                  </button>

                  <p className="text-xs font-poppins text-main-dark">
                    Page {data?.meta.page} of {data?.meta.totalPages}
                  </p>

                  <button
                    disabled={page === data?.meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-2 disabled:opacity-40"
                  >
                    <ChevronRight size={20} className="text-main-dark-II" />
                  </button>
                </div>
              )}
            </div>
          )}

          {tab === "trade" && (
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
                        {/* Benchmark: £{historyItem.benchmarkGBP} */}
                        <p>
                          Bought @N1915 Sold @N1925 : N10 x £1000 = N
                          <span className="text-main">10,000</span>
                        </p>
                      </p>
                      <p className="text-xs font-poppins text-main-dark">
                        {/* ₦{historyItem.rateNGN.toLocaleString()} */}
                        <p>
                          Bought @N1915 Sold @N1925 : N10 x £1000 = N
                          <span className="text-main">10,000</span>
                        </p>
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

              {!loadHistory && (
                <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm font-semibold text-gray-800">
                  <></>
                </div>
              )}

              {loadHistory ? (
                ""
              ) : (
                <div className="flex items-center justify-between mt-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="p-2 disabled:opacity-40"
                  >
                    <ChevronLeft />
                  </button>

                  <p className="text-xs font-poppins text-main-dark">
                    Page {data?.meta.page} of {data?.meta.totalPages}
                  </p>

                  <button
                    disabled={page === data?.meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-2 disabled:opacity-40"
                  >
                    <ChevronRight size={20} className="text-main-dark-II" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="rounded-md bg-white  shadow-md">
            <h1 className="text-[#072032] py-3 px-6 text-lg font-semibold font-dm-sans mb-2">
              Manage Live Rates
            </h1>
            <hr />
            <div className="px-4 md:px-6 py-3">
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
                    GBP (Benchmark Daily Rates - TapTap Send)
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
          <div className="rounded-md bg-white  shadow-md my-2">
            <h1 className="text-[#072032] py-3 px-6 text-lg font-semibold font-dm-sans mb-2">
              Manage Trade
            </h1>
            <hr />
            <div className="px-4 md:px-6 py-3">
              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-poppins font-semibold text-sm text-[#454745]">
                      NGN (Bought)
                    </label>
                    <input
                      type="text"
                      value={tradeNGNBought}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9]*\.?[0-9]*$/.test(val))
                          setTradeNGNBought(parseFloat(val));
                      }}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
            rounded-sm border border-[#d1d5db80] text-[#454745]
            focus:border-main focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="font-poppins font-semibold text-sm text-[#454745]">
                      NGN (Selling)
                    </label>
                    <input
                      type="text"
                      value={tradeNGNSold}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9]*\.?[0-9]*$/.test(val))
                          setTradeNGNSold(parseFloat(val));
                      }}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
            rounded-sm border border-[#d1d5db80] text-[#454745]
            focus:border-main focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-poppins font-semibold text-sm text-[#454745]">
                      Profit (NGN)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={(tradeNGNSold - tradeNGNBought).toFixed(2)}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
            rounded-sm border border-[#d1d5db80] text-[#454745]
            focus:border-main focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-poppins font-semibold text-sm text-[#454745]">
                      GBP (Bought)
                    </label>
                    <input
                      type="text"
                      value={tradeGBP}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9]*\.?[0-9]*$/.test(val))
                          setTradeGBP(parseFloat(val));
                      }}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
            rounded-sm border border-[#d1d5db80] text-[#454745]
            focus:border-main focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="font-poppins font-semibold text-sm text-[#454745]">
                      GBP (Selling)
                    </label>
                    <input
                      type="text"
                      value={liveRate}
                      readOnly
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
            rounded-sm border border-[#d1d5db80] text-[#454745]
            focus:border-main focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-poppins font-semibold text-sm text-[#454745]">
                      Profit (GBP)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={liveRate ? (liveRate - tradeGBP).toFixed(2) : ""}
                      className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 
            rounded-sm border border-[#d1d5db80] text-[#454745]
            focus:border-main focus:outline-none transition-colors"
                    />
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
                  "Go Live"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default FXRates;
