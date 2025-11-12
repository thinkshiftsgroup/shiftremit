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

const Account = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const photoUploadRef = useRef<{ openFileDialog: () => void }>(null);

  const { user: localUser } = useProfileStore();
  const { fetchProfile, updateProfilePhoto, fetchIndividualDocs } =
    useProfile();
  const isLoading = fetchProfile.isLoading;
  const user = fetchProfile.data || localUser;

  const handleImageSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const openFilePicker = () => fileRef.current?.click();

  const [openPassword, setOpenPassword] = useState(false);

  const [individualAcc, setIndividualAcc] = useState("");
  const router = useRouter();

  const getInitials = (name?: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const { getKYCStatus } = useProfile();

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
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div
                onClick={openFilePicker}
                className="inline-block relative group cursor-pointer w-20 h-20 md:w-24 md:h-24"
              >
                {user?.profilePhotoUrl ? (
                  <img
                    src={user?.profilePhotoUrl}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-700">
                    {getInitials(user?.fullName)}
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-6 h-6" />
                </div>

                <div className="w-5 h-5 bg-main absolute bottom-1 right-1 border-2 border-white rounded-full" />

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>

              <div>
                <h1 className="font-dm-sans text-xl font-semibold text-[#071032]">
                  {localUser?.fullName}
                </h1>

                <div className="flex pt-2 md:items-center gap-2 flex-col md:flex-row">
                  <p className="font-dm-sans text-sm flex items-center gap-1">
                    <MdOutlineEmail size={16} />
                    {localUser?.email}
                  </p>

                  {localUser?.phoneNumber && (
                    <p className="font-dm-sans text-sm flex items-center gap-1">
                      <FiPhone size={16} />
                      {localUser?.phoneNumber || "-"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setOpenPassword(true)}
            className="p-1 rounded-md border border-gray-400 text-gray-400 font-medium cursor-pointer font-poppins text-sm flex items-center gap-2"
          >
            Change password
            <RiEditLine className="" size={20} />
          </button>
        </div>
        <div className="p-3">
          <div
            onClick={() => router.push("/account/individual-account")}
            className={`w-full px-3 py-4 border-[#f1f1f1] bg-[#f1f1f1] cursor-pointer rounded-md flex justify-between border  my-5 text-[#454745]`}
          >
            <div>
              <h1 className="font-poppins font-semibold text-lg">
                Individual Account
              </h1>
              <p className="text-sm font-poppins">
                You can send and receive weekly up to £10,000 after you have
                your KYC approved.{" "}
              </p>
            </div>
            {getKYCStatus.isLoading ? (
              " "
            ) : getKYCStatus?.data?.data?.status === "APPROVED" ? (
              <FaCheckCircle className="w-5 h-5 text-main" />
            ) : (
              <div className="w-5 h-5 bg-white border border-[#e3e3e3] rounded-full shrink-0" />
            )}
          </div>
          <div
            onClick={() => router.push("/account/business-account")}
            className={`w-full px-3 py-4 bg-[#f1f1f1] cursor-pointer border-[#f1f1f1] rounded-md flex justify-between border  my-5 text-[#454745]`}
          >
            <div>
              <h1 className="font-poppins font-semibold text-lg">
                Business Account
              </h1>
              <p className="text-sm font-poppins">
                You can send and receive weekly up to £10,000 after you have
                your KYC approved.{" "}
              </p>
            </div>
            {individualAcc === "business" ? (
              <FaCheckCircle className="w-5 h-5 text-main" />
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
