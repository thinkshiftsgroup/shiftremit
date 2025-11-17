"use client";
import SideNav from "@/components/dashboard/sideNav";
import { Camera, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useProfileStore, UserProfileData } from "@/stores/useProfileStore";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import IndividualDoc from "@/components/account/individualAcc/docUpload";
import { countriesWithCodes } from "@/data/data";
import { useProfile } from "../../(general)/account/useProfile";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { usePassword } from "@/hooks/usePassword";

interface FormDataState {
  firstname: string;
  lastname: string;
  gender: string;
  phoneNumber: string;
  country: string;
}

const AdminAccount = () => {
  const photoUploadRef = useRef<{ openFileDialog: () => void }>(null);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
    oldPassword: false,
  });

  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { updatePassword } = usePassword();
  
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { fetchProfile, updateProfile, updateProfilePhoto, getKYCStatus } =
    useProfile();

  const { data: kycStatus, isLoading: kycStatusLoad } = getKYCStatus("");

  const { user: localUser, setUser } = useProfileStore();
  const [formData, setFormData] = useState<FormDataState>({
    firstname: "",
    lastname: "",
    gender: "male",
    country: "",
    phoneNumber: "",
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const user = fetchProfile.data || localUser;
  const isLoading = fetchProfile.isLoading || fetchProfile.isFetching;

  useEffect(() => {
    if (user && user.id) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        gender: user.gender || "male",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
      });
      if (
        fetchProfile.isFetched &&
        fetchProfile.data &&
        fetchProfile.data.id !== localUser?.id
      ) {
        setUser(fetchProfile.data);
      }
    }
  }, [user, fetchProfile.isFetched]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoChange = async (urls: string[]) => {
    if (urls.length > 0) {
      const newUrl = urls[0];
      try {
        await updateProfilePhoto.mutateAsync(newUrl);
        setUser({ profilePhotoUrl: newUrl });
      } catch (error) {}
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    const payload = {
      ...formData,
    };

    try {
      const updatedUser = await updateProfile.mutateAsync(payload);
      toast.success("Profile updated successfully!");
      setUser(updatedUser);
    } catch (error) {
    } finally {
      setIsFormSubmitting(false);
    }
  };

  if (isLoading || kycStatusLoad) {
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

  const getInitials = (user: UserProfileData) => {
    const fn = user.firstname?.[0] || "";
    const ln = user.lastname?.[0] || "";
    return (fn + ln).toUpperCase() || (user.fullName?.[0] || "").toUpperCase();
  };

  const isUpdating =
    isFormSubmitting || updateProfile.isPending || updateProfilePhoto.isPending;

  return (
    <SideNav>
      <div className="w-full bg-white shadow-md my-10 rounded-md p-3">
        <form className=" relative" onSubmit={handleFormSubmit}>
          <div className="w-full bg-white mb-5 rounded-md p-3">
            <div className="flex pb-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => photoUploadRef.current?.openFileDialog()}
                  className="inline-block relative group cursor-pointer w-24 h-24"
                >
                  {user.profilePhotoUrl ? (
                    <img
                      src={user.profilePhotoUrl}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-700">
                      {getInitials(user)}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-6 h-6" />
                  </div>

                  <div className="w-5 h-5 bg-main absolute bottom-1 right-1 border-2 border-white rounded-full" />

                  <ImageUpload
                    ref={photoUploadRef}
                    onChange={handleProfilePhotoChange}
                    multiple={false}
                    className="hidden"
                    maxFiles={1}
                  />
                </div>
                <div>
                  <div className="flex items-start md:items-center gap-2 flex-col md:flex-row">
                    <h1 className="font-poppins md:text-2xl font-semibold">
                      {user.fullName ||
                        `${user.firstname || ""} ${user.lastname || ""}`}
                    </h1>
                  </div>
                  <div className="flex pt-2 md:items-center gap-2 flex-col md:flex-row">
                    <p className="font-dm-sans text-sm flex items-center gap-1">
                      <MdOutlineEmail size={16} />
                      {user.email}
                    </p>
                    {user?.phoneNumber && (
                      <p className="font-dm-sans text-sm flex items-center gap-1">
                        <FiPhone size={16} />
                        {user?.phoneNumber || ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid mb-2 md:grid-cols-3 gap-3">
              <div className="space-y-3">
                <label
                  htmlFor="firstname"
                  className="font-poppins font-semibold text-sm text-[#454745] "
                >
                  First Name*
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="lastname"
                  className="font-poppins font-semibold text-sm text-[#454745] "
                >
                  Last Name*
                </label>

                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="font-poppins font-semibold text-sm text-[#454745] ">
                  Gender*
                </label>
                <div className="relative w-full">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="
      font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm
      border border-[#d1d5db80] text-[#454745]
      focus:border-main focus:outline-none transition-colors
      appearance-none pr-8 
    "
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>

                  <svg
                    className="absolute right-3 top-8 -translate-y-1/2 pointer-events-none text-[#7A7A7A]"
                    width="25"
                    height="25"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="phoneNumber"
                  className="font-poppins font-semibold text-sm text-[#454745] "
                >
                  Mobile Number*
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  inputMode="tel"
                  pattern="^\+?[0-9]{7,15}$"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors"
                  placeholder="e.g. +448012345678"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-3 gap-5 flex-col md:flex-row">
                <div className="space-y-3 w-full">
                  <label
                    htmlFor="country"
                    className="font-poppins font-semibold text-sm text-[#454745] "
                  >
                    Country of Residency*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="font-poppins text-sm w-full indent-2 mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745]
              focus:border-main focus:outline-none transition-colors bg-white"
                    required
                  >
                    <option value="">Select a Country</option>

                    {countriesWithCodes.map((c) => (
                      <option key={c.code} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-start md:items-center gap-2 justify-between flex-col md:flex-row">
              <button
                type="submit"
                disabled={isUpdating}
                className=" text-white text-sm font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="font-poppins p-3">
          <h1 className="font-poppins text-lg font-semibold">
            Update Password
          </h1>
          <div className="space-y-3 my-5 text-sm font-poppins">
            <div className="space-y-3">
              <label
                htmlFor="oldPassword"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  name="oldPassword"
                  type={show.oldPassword ? "text" : "password"}
                  value={form.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter Old password"
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                  required
                />
                {show.oldPassword ? (
                  <IoEyeOffOutline
                    onClick={() =>
                      setShow((prev) => ({ ...prev, oldPassword: false }))
                    }
                    className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() =>
                      setShow((prev) => ({ ...prev, oldPassword: true }))
                    }
                    className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                  />
                )}
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={show.password ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                  required
                />
                {show.password ? (
                  <IoEyeOffOutline
                    onClick={() =>
                      setShow((prev) => ({ ...prev, password: false }))
                    }
                    className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() =>
                      setShow((prev) => ({ ...prev, password: true }))
                    }
                    className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                  />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="confirmPassword"
                className="font-poppins font-semibold text-sm text-[#454745] "
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={show.confirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter Confirm Password"
                  className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
                  required
                />
                {show.confirmPassword ? (
                  <IoEyeOffOutline
                    onClick={() =>
                      setShow((prev) => ({ ...prev, confirmPassword: false }))
                    }
                    className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() =>
                      setShow((prev) => ({ ...prev, confirmPassword: true }))
                    }
                    className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-start md:items-center gap-2 justify-between flex-col md:flex-row">
            <button
              onClick={() =>
                updatePassword.mutate(
                  {
                    oldPassword: form.oldPassword,
                    newPassword: form.password,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Password updated successfully!");
                    },
                  }
                )
              }
              disabled={
                updatePassword.isPending ||
                !form.oldPassword ||
                !form.password ||
                !form.confirmPassword ||
                form.password !== form.confirmPassword
              }
              className=" text-white text-sm font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default AdminAccount;
