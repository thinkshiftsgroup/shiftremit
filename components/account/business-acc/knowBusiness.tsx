import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { countriesWithCodes } from "@/data/data";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";

interface FormDataState {
  businessName: string;
  companyType: string;
  incorporationNumber: string;
  dateOfIncorporation: string;
  countryOfIncorporation: string;
  taxNumber: string;
  companyAddress: string;
  zipCodePostcode: string;
  city: string;
  stateProvince: string;
  whatDoesTheBusinessDo: string;
  companyWebsite: string;
}

interface KnowBusinessProps {
  fetchBusinessProfile: UseQueryResult<any>;
  updateBusinessProfile: any;
}

const KnowBusiness: React.FC<KnowBusinessProps> = ({
  fetchBusinessProfile,
  updateBusinessProfile,
}) => {
  const [formData, setFormData] = useState<FormDataState>({
    businessName: "",
    companyType: "",
    incorporationNumber: "",
    dateOfIncorporation: "",
    countryOfIncorporation: "",
    taxNumber: "",
    companyAddress: "",
    zipCodePostcode: "",
    city: "",
    stateProvince: "",
    whatDoesTheBusinessDo: "",
    companyWebsite: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!fetchBusinessProfile.data) return;

    const b = fetchBusinessProfile.data;

    setFormData({
      businessName: b.businessName || "",
      companyType: b.companyType || "",
      incorporationNumber: b.incorporationNumber || "",
      dateOfIncorporation: b.dateOfIncorporation
        ? new Date(b.dateOfIncorporation).toISOString().split("T")[0]
        : "",
      countryOfIncorporation: b.countryOfIncorporation || "",
      taxNumber: b.taxNumber || "",
      companyAddress: b.companyAddress || "",
      zipCodePostcode: b.zipCodePostcode || "",
      city: b.city || "",
      stateProvince: b.stateProvince || "",
      whatDoesTheBusinessDo: b.whatDoesTheBusinessDo || "",
      companyWebsite: b.companyWebsite || "",
    });
  }, [fetchBusinessProfile.data]);

  const { getKYCStatus } = useProfile();

  const handleBusinessForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      dateOfIncorporation: formData.dateOfIncorporation
        ? new Date(formData.dateOfIncorporation).toISOString()
        : undefined,
    };

    updateBusinessProfile.mutate(payload);
  };

  const { data: kycStatus, isLoading: kycStatusLoad } =
    getKYCStatus("BUSINESS");

  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
          Let's Know Your Business
          <FaCircleQuestion size={16} className="text-[#454745]" />
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          Tell us a bit about you & your business
        </p>
      </div>

      <form className="relative" onSubmit={handleBusinessForm}>
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Business Name*
            </label>
            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Company Type*
            </label>
            <select
              name="companyType"
              value={formData.companyType}
              onChange={handleInputChange}
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors bg-white"
            >
              <option value="">Select Company Type</option>
              <option value="Private Limited Company">
                Private Limited Company
              </option>
              <option value="Limited Liability Company">
                Limited Liability Company
              </option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
            </select>
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Incorporation Number*
            </label>
            <input
              name="incorporationNumber"
              value={formData.incorporationNumber}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 px-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors bg-white"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Date of Incorporation*
            </label>
            <input
              name="dateOfIncorporation"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              required
              value={formData.dateOfIncorporation}
              onChange={handleInputChange}
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Country of Incorporation*
            </label>
            <select
              name="countryOfIncorporation"
              value={formData.countryOfIncorporation}
              onChange={handleInputChange}
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745]
  focus:border-main focus:outline-none transition-colors bg-white"
            >
              <option value="">Select Country</option>
              {countriesWithCodes.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Tax Number*
            </label>
            <input
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Company Address*
            </label>
            <input
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              Zip Code / Postcode*
            </label>
            <input
              name="zipCodePostcode"
              value={formData.zipCodePostcode}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              State / Province*
            </label>
            <input
              name="stateProvince"
              value={formData.stateProvince}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
              City*
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] flex gap-1">
              What does your business do?*
              <FaCircleQuestion size={16} />
            </label>
            <input
              name="whatDoesTheBusinessDo"
              value={formData.whatDoesTheBusinessDo}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745] flex gap-1">
              Company Website
            </label>
            <input
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              type="text"
              required
              className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex my-4 justify-end">
          <button
            type="submit"
            disabled={
              updateBusinessProfile.isPending ||
              kycStatus.data.status === "APPROVED" ||
              kycStatusLoad
            }
            className="text-white font-poppins text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed py-1.5 px-4 rounded-[6px] bg-linear-to-l from-[#813FD6] to-[#301342]"
          >
            {updateBusinessProfile.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KnowBusiness;
