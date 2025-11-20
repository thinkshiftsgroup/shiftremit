"use client";
import SideNav from "@/components/dashboard/sideNav";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import ChangePassword from "@/components/account/changePasswordModal";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useProfileStore, UserProfileData } from "@/stores/useProfileStore";
import { useProfile } from "./useProfile";
import { FaArrowRight } from "react-icons/fa";

const Account = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const photoUploadRef = useRef<{ openFileDialog: () => void }>(null);
  const { fetchProfile } = useProfile();

  const isLoading = fetchProfile.isLoading;
  const user = fetchProfile.data;
  console.log(fetchProfile, "user");
  const [openPassword, setOpenPassword] = useState(false);
  const router = useRouter();

  const { getKYCStatus } = useProfile();
  const { data: kycStatus, isLoading: kycStatusLoad } = getKYCStatus();
  const { data: kycStatusBuss, isLoading: kycStatusLoadBuss } =
    getKYCStatus("BUSINESS");

  if (isLoading) {
    return (
      <SideNav>
        <div className="flex font-poppins w-full h-screen items-center justify-center text-lg">
          <div className="flex items-center gap-1">
            <Loader2 size={30} className="text-main animate-spin" />
            Loading profile data...
          </div>
        </div>
      </SideNav>
    );
  }

  if (!user) {
    return (
      <SideNav>
        <div className="flex font-poppins w-full h-screen items-center justify-center text-lg">
          Failed to load admin profile.
        </div>
      </SideNav>
    );
  }

  const getInitials = (name?: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <SideNav>
      <div className="my-5">
        {openPassword && (
          <ChangePassword
            openPassword={openPassword}
            setOpenPassword={setOpenPassword}
          />
        )}
      </div>{" "}
      <div className="w-full bg-white rounded-[10px]">
        <div className="flex items-center p-3 w-full border-b justify-between flex-col md:flex-row gap-3 md:gap-0">
          {isLoading ? (
            <div className="flex items-center gap-2 w-full md:w-auto animate-pulse">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200" />
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="flex gap-3">
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col items-center gap-2 w-full md:w-auto">
              <div
                // onClick={openFilePicker}
                className="inline-block relative group w-20 h-20 flex-none md:w-24 md:h-24"
              >
                {fetchProfile?.data?.profilePhotoUrl ? (
                  <img
                    src={fetchProfile?.data?.profilePhotoUrl}
                    alt="profile"
                    className="w-full h-full  rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-700">
                    {getInitials(fetchProfile?.data?.fullName)}
                  </div>
                )}

                <div className="w-5 h-5 bg-main absolute bottom-1 right-1 border-2 border-white rounded-full" />
              </div>

              <div>
                <h1 className="font-dm-sans md:text-left text-center text-xl font-semibold text-[#071032]">
                  {fetchProfile?.data?.firstname} {fetchProfile?.data?.lastname}
                </h1>

                <div className="flex pt-2 md:items-center gap-2 flex-col md:flex-row">
                  <p className="font-dm-sans text-sm flex items-center gap-1">
                    <MdOutlineEmail size={16} />
                    {fetchProfile?.data?.email}
                  </p>

                  {fetchProfile?.data?.phoneNumber && (
                    <p className="font-dm-sans text-sm flex items-center gap-1">
                      <FiPhone size={16} />
                      {fetchProfile?.data?.phoneNumber || "-"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setOpenPassword(true)}
            className="p-1 rounded-md border border-gray-400 text-gray-400 font-medium cursor-pointer font-poppins text-xs sm:text-sm flex items-center gap-2"
          >
            Change password
            <RiEditLine className="sm:text-xl text-sm " />
          </button>
        </div>
        <div className="p-3">
          <div
            onClick={() => router.push("/account/individual-account")}
            className={`w-full px-1 sm:px-3 py-2 sm:py-4  border-[#f1f1f1] bg-[#f1f1f1] cursor-pointer rounded-md flex justify-between border  my-5 text-[#454745]`}
          >
            <div>
              <div className="flex gap-1 items-center">
                <h1 className="font-poppins font-semibold text-base md:text-lg">
                  Individual Account
                </h1>
                {kycStatus?.data?.status === "APPROVED" ? (
                  <span className=" text-[10px] sm:text-xs text-white p-1 rounded-sm bg-main hidden sm:inline-block font-poppins">
                    <p>verified</p>
                  </span>
                ) : kycStatus?.data?.status === "REJECTED" ? (
                  <span className=" text-[10px] sm:text-xs text-white p-1 rounded-sm bg-red-500 hidden sm:inline-block font-poppins">
                    <p>rejected</p>
                  </span>
                ) : (
                  <span className=" text-[10px] sm:text-xs text-white p-1 rounded-sm bg-orange-500 hidden sm:inline-block font-poppins">
                    <p>in review</p>
                  </span>
                )}
              </div>
              <p className="sm:text-sm text-xs font-poppins flex items-center gap-1">
                You can send and receive weekly up to £10,000 after you have
                your KYC approved.{" "}
                <FaArrowRight className="text-main flex-none " size={14} />
              </p>
            </div>
            {kycStatusLoad ? (
              " "
            ) : kycStatus?.data?.status === "APPROVED" ? (
              <FaCheckCircle className="sm:w-5 h-4 sm:h-5 w-4  flex-none text-main" />
            ) : (
              <div className="sm:w-5 h-4 sm:h-5 w-4 bg-white border border-[#e3e3e3] rounded-full shrink-0" />
            )}
          </div>
          <div
            onClick={() => router.push("/account/business-account")}
            className={`w-full px-1 sm:px-3 py-2 sm:py-4 bg-[#f1f1f1] cursor-pointer border-[#f1f1f1] rounded-md flex justify-between border  my-5 text-[#454745]`}
          >
            <div>
               <div className="flex gap-1 items-center">
                <h1 className="font-poppins font-semibold text-base md:text-lg">
                  Business Account
                </h1>
                {kycStatusBuss?.data?.status === "APPROVED" ? (
                  <span className="text-[10px] sm:text-xs text-white p-1 rounded-sm bg-main hidden sm:inline-block font-poppins">
                    <p>verified</p>
                  </span>
                ) : kycStatusBuss?.data?.status === "REJECTED" ? (
                  <span className="text-[10px] sm:text-xs text-white p-1 rounded-sm bg-red-500 hidden sm:inline-block font-poppins">
                    <p>rejected</p>
                  </span>
                ) : (
                  <span className="text-[10px] sm:text-xs text-white p-1 rounded-sm bg-orange-500 hidden sm:inline-block font-poppins">
                    <p>in review</p>
                  </span>
                )}
              </div>
              <p className="sm:text-sm text-xs font-poppins flex items-center gap-1">
                You can send and receive weekly up to £300,000 after you have
                your KYC approved.{" "}
                <FaArrowRight className="text-main flex-none" size={14} />
              </p>
            </div>
            {kycStatusLoadBuss ? (
              " "
            ) : kycStatusBuss?.data?.status === "APPROVED" ? (
              <FaCheckCircle className="sm:w-5 h-4 sm:h-5 w-4  flex-none text-main" />
            ) : (
              <div className="w-5 h-5 bg-white border border-[#e3e3e3] rounded-full shrink-0" />
            )}
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default Account;
