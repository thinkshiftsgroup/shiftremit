"use client";
import SideNav from "@/components/dashboard/sideNav";
import React, { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { useKyc } from "./usekyc";
import { countriesWithCodes } from "@/data/data";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

export const NOTIF_LABELS: Record<string, string> = {
  KYC_INDIVIDUAL_SUBMITTED: "Individual KYC Submitted",
  KYC_BUSINESS_SUBMITTED: "Business KYC Submitted",
  INDIVIDUAL_DOC_UPDATED: "Individual Document Updated",
  BUSINESS_DOC_UPDATED: "Business Document Updated",
  BUSINESS_PROFILE_UPDATED: "Business Profile Updated",
  USER_PROFILE_UPDATED: "User Profile Updated",
  TRANSFER: "Transfer",
  NEW_USER_REGISTERED: "New User Registered",
  USER_BANNED: "User Banned",
  USER_UNBANNED: "User Unbanned",
  TRANSFER_FAILED: "Transfer Failed",
};

const KYC = () => {
  const { getVerifications, resolveNotification, markAsRead } = useKyc();
  const resolveNotif = resolveNotification();
  const markRead = markAsRead();

  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 20,
    usernameFilter: "",
    isDismissed: undefined as boolean | undefined,
    countryFilter: "",
    notificationTypeFilter: "",
  });

  const handleReset = () => {
    setFilterData({
      page: 1,
      pageSize: 20,
      usernameFilter: "",
      isDismissed: undefined,
      countryFilter: "",
      notificationTypeFilter: "",
    });
  };

  const notifQuery = getVerifications(filterData);
  const router = useRouter();

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    notifId?: string;
  }>({ open: false });

  const handleOpenModal = (notifId: string) => {
    setConfirmModal({ open: true, notifId });
  };

  const handleCloseModal = () => {
    setConfirmModal({ open: false, notifId: undefined });
  };

  const handleConfirmResolve = () => {
    if (!confirmModal.notifId) return;
    resolveNotif.mutate(confirmModal.notifId, {
      onSuccess: () => {
        toast.success("Task Resolved");
        handleCloseModal();
      },
    });
  };

  return (
    <SideNav>
      <div className="sm:p-5 p-3 bg-white rounded-md my-4 overflow-hidden">
        <div className=" ">
          <div className="w-full font-poppins bg-white p-2 rounded my-3">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Search by Customer Name"
                  value={filterData.usernameFilter}
                  onChange={(e) =>
                    setFilterData((p) => ({
                      ...p,
                      usernameFilter: e.target.value,
                    }))
                  }
                  className="px-4 text-sm w-full py-2 border border-gray-200 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex sm:flex-row flex-col gap-3 w-full items-center">
                <select
                  value={filterData.countryFilter}
                  onChange={(e) =>
                    setFilterData((p) => ({
                      ...p,
                      countryFilter: e.target.value,
                    }))
                  }
                  className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-full sm:text-base text-sm"
                >
                  <option value="">Country</option>

                  {countriesWithCodes.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>

                <select
                  value={filterData.notificationTypeFilter}
                  onChange={(e) =>
                    setFilterData((p) => ({
                      ...p,
                      notificationTypeFilter: e.target.value,
                    }))
                  }
                  className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-full sm:text-base text-sm"
                >
                  <option value="">Select Notification Type</option>
                  {Object.entries(NOTIF_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>

                <select
                  value={
                    filterData.isDismissed === undefined
                      ? ""
                      : filterData.isDismissed
                      ? "true"
                      : "false"
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    setFilterData((prev) => ({
                      ...prev,
                      isDismissed: value === "" ? undefined : value === "true", // <-- boolean conversion
                    }));
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors w-full sm:text-base text-sm"
                >
                  <option value="">Status</option>
                  <option value="true">Resolved</option>
                  <option value="false">Pending</option>
                </select>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="w-full font-poppins scrollbar-hide overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                  <th className="px-4 py-2 whitespace-nowrap">S/N</th>
                  <th className="px-4 py-2 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Email</th>
                  <th className="px-4 py-2 whitespace-nowrap">Country</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">Module</th>
                  <th className="px-4 py-2 whitespace-nowrap">
                    Date Submitted
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifQuery.isLoading && (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      Loading notifications...
                    </td>
                  </tr>
                )}
                {!notifQuery.isLoading &&
                  notifQuery.data?.data?.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-400"
                      >
                        No notifications found.
                      </td>
                    </tr>
                  )}
                {!notifQuery.isLoading &&
                  notifQuery.data?.data?.map((notif: any, index: number) => (
                    <tr
                      key={notif.id}
                      className={`text-sm text-gray-700 transition ${
                        index % 2 === 1
                          ? "bg-gray-50 hover:bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-4">{index + 1}</td>
                      <td className="px-4 py-4">{notif.user?.fullName}</td>
                      <td className="px-4 py-4">{notif.user?.email}</td>
                      <td className="px-4 py-4">{notif.user?.country}</td>

                      <td className="px-4 py-4">
                        <span
                          className={`p-1 text-center rounded-sm border uppercase ${
                            notif.isDismissed
                              ? "bg-green-500/20 text-green-500 border-green-500"
                              : "bg-red-500/20 text-red-500 border-red-500"
                          }`}
                        >
                          {notif.isDismissed ? "DELIVERED" : "PENDING"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {NOTIF_LABELS[notif.type] ?? notif.type}
                      </td>
                      <td className="px-4 py-4">
                        {new Date(notif.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-4 flex gap-3 items-center">
                        <button
                          disabled={markRead.isPending}
                          onClick={() => {
                            router.push(notif.linkToResource);
                            markRead.mutate(notif.id);
                          }}
                          className="text-main hover:opacity-70"
                        >
                          {!notif.isRead ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} className="text-gray-500" />
                          )}
                        </button>

                        {!notif.isDismissed && (
                          <button
                            disabled={resolveNotif.isPending}
                            onClick={() => handleOpenModal(notif.id)}
                            className="text-green-600 hover:opacity-70 text-xs underline"
                          >
                            {resolveNotif.isPending ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Resolve"
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {confirmModal.open && (
          <div className="fixed inset-0 bg-black/20 font-poppins bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
              <p className="mb-6">
                Are you sure you want to resolve this notification?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmResolve}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {resolveNotif.isPending ? <Loader2 className="animate-spin" /> :"Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SideNav>
  );
};

export default KYC;
