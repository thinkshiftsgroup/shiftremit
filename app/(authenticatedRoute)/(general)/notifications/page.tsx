"use client";
import SideNav from "@/components/dashboard/sideNav";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "../account/useProfile";
import { useAuthStore } from "@/stores/useAuthStore";

const Notifications = () => {
  const { updateProfile, fetchProfile } = useProfile();
  const queryClient = useQueryClient();

  const [checked, setChecked] = useState(false);
  const [rateNGN, setRateNGN] = useState(""); 
  const [benchmarkGBP, setBenchmarkGBP] = useState(""); 

  useEffect(() => {
    if (!fetchProfile.data) return;

    setBenchmarkGBP(
      fetchProfile.data.alertWhenGbpToNgnDropsBelow?.toString() || ""
    );

    setRateNGN(fetchProfile.data.alertWhenNgnToGbpDropsBelow?.toString() || "");

    setChecked(fetchProfile.data.sendMeNotifs ?? false);
  }, [fetchProfile.data]);

  const handleUpdate = () => {
    const newNGN = Number(rateNGN);
    const newGBP = Number(benchmarkGBP);

    updateProfile.mutate(
      {
        alertWhenNgnToGbpDropsBelow: newNGN,
        alertWhenGbpToNgnDropsBelow: newGBP,
        sendMeNotifs: checked,
      },
      {
        onSuccess: () => {
          toast.success("Notification updated!");
          queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
      }
    );
  };

  if (fetchProfile.isLoading) {
    return (
      <SideNav>
        <div className="flex items-center justify-center h-64">
          <Loader2 size={28} className="animate-spin text-main" />
        </div>
      </SideNav>
    );
  }

  return (
    <SideNav>
      <div className="py-5 font-poppins flex flex-col gap-5">
        <div className="w-full rounded-md bg-white shadow-md">
          <h1 className="text-[#072032] py-3 px-6 text-lg font-semibold mb-2">
            My Notifications
          </h1>

          <hr />

          <div className="px-4 md:px-6 py-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded bg-white shadow-sm">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  GBP to NGN{" "}
                  <span className="text-xs">
                    (Alert me when pounds to naira drops below)
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    €
                  </span>
                  <input
                    type="number"
                    placeholder="e.g 1950.00"
                    value={benchmarkGBP}
                    onChange={(e) => setBenchmarkGBP(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    // disabled={!checked}
                  />
                </div>
              </div>

              <div className="p-3 border rounded bg-white shadow-sm">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  NGN to GBP{" "}
                  <span className="text-xs">
                    (Alert me when naira to pounds goes above)
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    placeholder="e.g 2000.00"
                    value={rateNGN}
                    onChange={(e) => setRateNGN(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    // disabled={!checked}
                  />
                </div>
              </div>

              <div className="p-3 border rounded bg-white shadow-sm flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Send me other notifications from ShiftRemit
                </label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-5 h-5 accent-main cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full text-white mt-5 py-3 rounded-[6px] font-medium bg-linear-to-l from-[#813FD6] to-[#301342] border border-[#813FD6] hover:border-transparent flex justify-center"
            >
              {updateProfile.isPending ? (
                <Loader2 className="animate-spin text-white" size={20} />
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
