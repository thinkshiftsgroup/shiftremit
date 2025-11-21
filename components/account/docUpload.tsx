"use client";
import React, { useRef, useState } from "react";
import { Eye } from "lucide-react";
import { HiTrash } from "react-icons/hi";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import ConfirmModal from "./modal/deleteModal";

const statusColors: Record<string, string> = {
  PENDING_UPLOAD: "text-gray-500",
  PENDING: "text-orange-500",
  APPROVED: "text-green-500",
  IN_REVIEW: "text-main",
  REJECTED: "text-red-500",
};

const BusinessDocUpload = ({ fetchBusinessProfile }: any) => {
  const { deleteDocForBusiness, updateBusinessDoc, getKYCStatus } =
    useProfile();
  const { data: kycStatus, isLoading: kycStatusLoad } =
    getKYCStatus("BUSINESS");
  const docData = fetchBusinessProfile?.data?.businessAccountDocs || [];
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteKey, setPendingDeleteKey] = useState<string | null>(null);

  const confirmDelete = (docType: string) => {
    setPendingDeleteKey(docType);
    setShowConfirm(true);
  };
  const handleCancelDelete = () => {
    setShowConfirm(false);
    setPendingDeleteKey(null);
  };

  const queryClient = useQueryClient();

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

  const validTypes = ["image/png", "image/jpeg", "application/pdf"];

  const handleFileChange = (e: any, setName: (name: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only .png, .jpg, or .pdf allowed.");
      return (e.target.value = "");
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max size is 50MB.");
      return (e.target.value = "");
    }

    setName(file.name);
  };

  const handlePreview = (url: string) => {
    if (!url) return toast.info("Nothing to preview");
    window.open(url, "_blank");
  };

  const handleConfirmedDelete = () => {
    if (!pendingDeleteKey) return;

    deleteDocForBusiness.mutate(
      { docType: pendingDeleteKey },
      {
        onSuccess: () => {
          toast.success("File deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
        },
      }
    );

    setShowConfirm(false);
    setPendingDeleteKey(null);
  };

  const renderFileField = (
    label: string,
    inputRef: React.RefObject<HTMLInputElement | null>,
    stateName: string,
    setName: (n: string) => void,
    backendUrlKey: string,
    backendStatusKey: string,
    docType: string,
    placeholder: string
  ) => {
    const fileUrl = docData?.[backendUrlKey];
    const status = docData?.[backendStatusKey];

    const displayedName =
      stateName || (fileUrl ? fileUrl.split("/").pop() : "");

    return (
      <div>
        <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
          {label}
        </label>

        <label
          htmlFor={docType}
          className="w-full mt-1 py-3 px-3 rounded-sm gap-1 overflow-x-scroll scrollbar-hide border border-dashed border-[#d1d5db80] text-[#666] text-xs sm:text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
        >
          <span className="opacity-80">{displayedName || placeholder}</span>

          <div className="flex whitespace-nowrap items-center gap-2">
            {status && status !== "PENDING" && (
              <span
                className={`text-xs font-poppins ${
                  statusColors[status] || "text-gray-500"
                }`}
              >
                {status.replace(/_/g, " ")}
              </span>
            )}

            {fileUrl && (
              <Eye
                size={16}
                className="text-main cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePreview(fileUrl);
                }}
              />
            )}

            {fileUrl &&
              (kycStatus.data.status === "NOT_STARTED" ||
                kycStatus.data.status === "REJECTED") && (
                <HiTrash
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    confirmDelete(docType);
                  }}
                />
              )}
          </div>
        </label>

        <input
          id={docType}
          type="file"
          ref={inputRef}
          className="hidden"
          accept=".png, .jpg, .pdf"
          onChange={(e) => handleFileChange(e, setName)}
        />
      </div>
    );
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (regRef.current?.files?.[0])
      formData.append(
        "businessRegistrationIncorporationCertificate",
        regRef.current.files[0],
        regRef.current.files[0].name
      );

    if (articleRef.current?.files?.[0])
      formData.append(
        "articleOfAssociation",
        articleRef.current.files[0],
        articleRef.current.files[0].name
      );

    if (utilityRef.current?.files?.[0])
      formData.append(
        "operatingBusinessUtilityBill",
        utilityRef.current.files[0],
        utilityRef.current.files[0].name
      );

    if (taxRef.current?.files?.[0])
      formData.append(
        "companyStatusReports",
        taxRef.current.files[0],
        taxRef.current.files[0].name
      );

    if (additionalRef.current?.files?.[0])
      formData.append(
        "additionalDocument",
        additionalRef.current.files[0],
        additionalRef.current.files[0].name
      );

    updateBusinessDoc.mutate(formData, {
      onSuccess: () => {
        toast.success("Documents uploaded!");
        queryClient.invalidateQueries({ queryKey: ["businessProfile"] });

        setRegName("");
        setArticleName("");
        setUtilityName("");
        setTaxName("");
        setAdditionalName("");

        if (regRef.current) regRef.current.value = "";
        if (articleRef.current) articleRef.current.value = "";
        if (utilityRef.current) utilityRef.current.value = "";
        if (taxRef.current) taxRef.current.value = "";
        if (additionalRef.current) additionalRef.current.value = "";
      },
    });
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md p-3 mb-10">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main">
          Business Document Upload
        </h1>
        <p className="text-xs sm:text-sm text-[#454745]">
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

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={
            updateBusinessDoc.isPending ||
            kycStatus.data.status === "APPROVED" ||
            kycStatusLoad
          }
          className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateBusinessDoc.isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <ConfirmModal
        open={showConfirm}
        message="Do you really want to delete this document?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmedDelete}
        onCancel={handleCancelDelete}
        loading={deleteDocForBusiness.isPending}
      />
    </div>
  );
};

export default BusinessDocUpload;
