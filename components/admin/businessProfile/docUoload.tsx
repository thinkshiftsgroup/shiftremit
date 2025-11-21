"use client";
import React, { useRef, useState } from "react";
import { Eye } from "lucide-react";
import { HiTrash } from "react-icons/hi";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import ActionDropDown from "../action";
import { useAdmin } from "@/hooks/useAdmin";
import { useParams } from "next/navigation";

const statusColors: Record<string, string> = {
  PENDING_UPLOAD: "text-gray-500",
  PENDING: "text-orange-500",
  APPROVED: "text-green-500",
  IN_REVIEW: "text-main",
  REJECTED: "text-red-500",
};

const BusinessDocUpload = ({ userDeets, updateBussProfile }: any) => {
  const docData = userDeets?.businessAccountDocs || [];
  const { changeBussFileStatus } = useAdmin();
  const params = useParams<{ id: string }>();

  const [regName, setRegName] = useState("");
  const [articleName, setArticleName] = useState("");
  const [utilityName, setUtilityName] = useState("");
  const [taxName, setTaxName] = useState("");
  const [additionalName, setAdditionalName] = useState("");

  const regRef = useRef<HTMLInputElement>(null);
  const articleRef = useRef<HTMLInputElement>(null);
  const utilityRef = useRef<HTMLInputElement>(null);
  const taxRef = useRef<HTMLInputElement>(null);
  const additionalRef = useRef<HTMLInputElement>(null);

  const handlePreview = (file: File | null, fileUrl?: string) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);

      const newTab = window.open(objectUrl, "_blank");

      if (newTab) {
        newTab.onload = () => URL.revokeObjectURL(objectUrl);
      }

      return;
    }

    if (fileUrl) {
      window.open(fileUrl, "_blank");
      return;
    }

    toast.info("No file selected or uploaded to preview.");
  };

  const renderFileField = (
    label: string,
    ref: React.RefObject<HTMLInputElement | null>,
    fileName: string,
    setFileName: React.Dispatch<React.SetStateAction<string>>,
    docType: string,
    statusKey: string,
    fileUrlKey: string,
    placeholder: string
  ) => {
    const prefillName =
      fileName || (docData[fileUrlKey]?.split("/").pop() ?? "");
    const status = docData[statusKey];
    const fileUrl = docData[fileUrlKey];
    const newFile = ref.current?.files?.[0];

    const hasFile = prefillName || fileUrl;

    return (
      <div className="whitespace-nowrap overflow-x-scroll scrollbar-hide">
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          {label}
        </label>
        <div className="relative">
          <label
            htmlFor={docType}
            className="w-full mt-1 gap-2  pl-2 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">{prefillName || placeholder}</span>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-poppins ${
                  statusColors[status] || "text-gray-500"
                }`}
              >
                {status?.replace(/_/g, " ")}
              </span>
              {hasFile && (
                <ActionDropDown
                  onPreview={() => handlePreview(newFile || null, fileUrl)}
                  onStatusChange={(status) => {
                    changeBussFileStatus.mutate({
                      userId: userDeets?.id,
                      docType,
                      status,
                    });
                  }}
                  disableApprove={status === "APPROVED"}
                  disableReject={status === "REJECTED"}
                />
              )}
            </div>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md p-3 mb-10">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main">
          Business Document Upload
        </h1>
        <p className="text-sm text-[#454745]">
          Provide required business documents
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {renderFileField(
          "Business Registration/Incorporation Certificate",
          regRef,
          regName,
          setRegName,
          "businessRegistrationIncorporationCertificate",
          "registrationCertificateStatus",
          "businessRegistrationIncorporationCertificate",
          "Upload certificate (required)"
        )}

        {renderFileField(
          "Article of Association",
          articleRef,
          articleName,
          setArticleName,
          "articleOfAssociation",
          "articleOfAssociationStatus",
          "articleOfAssociation",
          "Upload article (required)"
        )}

        {renderFileField(
          "Operating Utility Bill",
          utilityRef,
          utilityName,
          setUtilityName,
          "operatingBusinessUtilityBill",
          "utilityBillStatus",
          "operatingBusinessUtilityBill",
          "Upload utility bill (required)"
        )}

        {renderFileField(
          "Company Status Report",
          taxRef,
          taxName,
          setTaxName,
          "companyStatusReports",
          "companyStatusReportsStatus",
          "companyStatusReports",
          "Upload Status Reports"
        )}

        {renderFileField(
          "Additional Documents",
          additionalRef,
          additionalName,
          setAdditionalName,
          "additionalDocument",
          "additionalDocumentStatus",
          "additionalDocument",
          "Upload any additional docs (optional)"
        )}
      </div>

      <div className="space-y-1 my-3">
        <p className="text-[#454745] text-xs font-poppins">
          Minimum 1, Maximum 5 documents
        </p>
        <p className="text-[#454745] text-xs font-poppins">
          Files should be in .png, .jpg or .pdf format
        </p>
        <p className="text-[#454745] text-xs font-poppins">Max size is 50mb</p>
      </div>
    </div>
  );
};

export default BusinessDocUpload;
