"use client";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { VscDeviceCamera } from "react-icons/vsc";
import { HiTrash } from "react-icons/hi";
import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import ConfirmModal from "../modal/deleteModal";

const statusColors: Record<string, string> = {
  PENDING_UPLOAD: "text-gray-500",
  PENDING: "text-orange-500",
  APPROVED: "text-green-500",
  IN_REVIEW: "text-main",
  REJECTED: "text-red-500",
};

const IndividualDoc = () => {
  const {
    fetchIndividualDocs,
    updateIndividualDocs,
    deleteDoc,
    submitKyc,
    getKYCStatus,
  } = useProfile();

  const { data: kycStatus, isLoading: kycStatusLoad } = getKYCStatus();
  const router = useRouter();
  const queryClient = useQueryClient();
  const validTypes = ["image/png", "image/jpeg", "application/pdf"];

  const [proofOfAddressName, setProofOfAddressName] = useState("");
  const [selfieName, setSelfieName] = useState("");
  const [bankStatementName, setBankStatementName] = useState("");
  const [additionalDocsName, setAdditionalDocsName] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const proofOfAddressRef = useRef<HTMLInputElement>(null);
  const validIDFront = useRef<HTMLInputElement>(null);
  const validIDBack = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);
  const bankStatementRef = useRef<HTMLInputElement>(null);
  const additionalDocsRef = useRef<HTMLInputElement>(null);

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const docData = fetchIndividualDocs?.data?.data || {};

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only .png, .jpg, or .pdf allowed.");
      e.target.value = "";
      setFileName("");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File too large. Max size is 50MB.");
      e.target.value = "";
      setFileName("");
      return;
    }

    setFileName(file.name);
  };

  const handleAddImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    e.target.value = "";
  };

  const removeImage = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    setFile(null);
  };

  const handlePreview = (file: File | null, fileUrl: string | undefined) => {
    let url: string | undefined;

    if (file) {
      url = URL.createObjectURL(file);
      window.open(url, "_blank");
      URL.revokeObjectURL(url);
    } else if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      toast.info("No file selected or uploaded to preview.");
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (proofOfAddressRef.current?.files?.[0])
      formData.append(
        "recentProofOfAddress",
        proofOfAddressRef.current.files[0],
        proofOfAddressRef.current.files[0].name
      );

    if (frontFile) formData.append("proofOfValidID", frontFile, frontFile.name);
    if (backFile)
      formData.append("proofOfValidIDBackView", backFile, backFile.name);

    if (selfieRef.current?.files?.[0])
      formData.append(
        "recentSelfieWithID",
        selfieRef.current.files[0],
        selfieRef.current.files[0].name
      );

    if (bankStatementRef.current?.files?.[0])
      formData.append(
        "recentBankStatement",
        bankStatementRef.current.files[0],
        bankStatementRef.current.files[0].name
      );

    if (additionalDocsRef.current?.files?.[0])
      formData.append(
        "additionalDocuments",
        additionalDocsRef.current.files[0],
        additionalDocsRef.current.files[0].name
      );

    updateIndividualDocs.mutate(formData, {
      onSuccess: () => {
        toast.success("Documents uploaded successfully!");
        queryClient.invalidateQueries({ queryKey: ["individual-docs"] });
        fetchIndividualDocs.refetch();

        setFrontFile(null);
        setBackFile(null);
        setProofOfAddressName("");
        setSelfieName("");
        setBankStatementName("");
        setAdditionalDocsName("");

        if (proofOfAddressRef.current) proofOfAddressRef.current.value = "";
        if (selfieRef.current) selfieRef.current.value = "";
        if (bankStatementRef.current) bankStatementRef.current.value = "";
        if (additionalDocsRef.current) additionalDocsRef.current.value = "";
        if (validIDFront.current) validIDFront.current.value = "";
        if (validIDBack.current) validIDBack.current.value = "";
      },
    });
  };

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

  const handleDelete = () => {
    if (!pendingDeleteKey) return;

    deleteDoc.mutate(
      { docType: pendingDeleteKey },
      {
        onSuccess: () => {
          toast.success("File deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["individual-docs"] });

          switch (pendingDeleteKey) {
            case "proofOfValidID":
              setFrontFile(null);
              if (validIDFront.current) validIDFront.current.value = "";
              break;
            case "proofOfValidIDBackView":
              setBackFile(null);
              if (validIDBack.current) validIDBack.current.value = "";
              break;
            case "proofOfAddress":
              setProofOfAddressName("");
              if (proofOfAddressRef.current)
                proofOfAddressRef.current.value = "";
              break;
            case "selfie":
              setSelfieName("");
              if (selfieRef.current) selfieRef.current.value = "";
              break;
            case "bankStatement":
              setBankStatementName("");
              if (bankStatementRef.current) bankStatementRef.current.value = "";
              break;
            case "additionalDocs":
              setAdditionalDocsName("");
              if (additionalDocsRef.current)
                additionalDocsRef.current.value = "";
              break;
          }
        },
        onSettled: () => {
          setShowConfirm(false);
          setPendingDeleteKey(null);
        },
      }
    );
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

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFileName("");
      if (ref.current) {
        ref.current.value = "";
      }
    };

    const hasFile = prefillName || fileUrl;

  
    const formatFileSize = (sizeInBytes: number) => {
      if (sizeInBytes >= 1024 * 1024) {
        return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
      } else if (sizeInBytes >= 1024) {
        return `${(sizeInBytes / 1024).toFixed(1)} KB`;
      }
      return `${sizeInBytes} B`;
    };

    const displayFileName = newFile
      ? `${newFile.name} (${formatFileSize(newFile.size)})`
      : prefillName;

    return (
      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          {label}
        </label>
        <div className="relative">
          <label
            htmlFor={docType}
            className="w-full mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">{displayFileName || placeholder}</span>

            <div className="flex items-center gap-2">
              {status && status !== "PENDING" && (
                <span
                  className={`text-xs font-poppins ${
                    statusColors[status] || "text-gray-500"
                  }`}
                >
                  {status.replace(/_/g, " ")}
                </span>
              )}

              {hasFile && (
                <Eye
                  size={16}
                  className="text-main cursor-pointer hover:text-blue-700"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePreview(newFile || null, fileUrl);
                  }}
                />
              )}

              {status !== "APPROVED" &&
                hasFile &&
                (kycStatus.data.status === "REJECTED" ||
                  kycStatus.data.status === "NOT_STARTED") && (
                  <HiTrash
                    size={16}
                    onMouseDown={(e) => e.preventDefault()}
                    className="text-red-500 relative z-10 cursor-pointer hover:text-red-700"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (fileUrl) {
                        confirmDelete(docType);
                      } else {
                        handleClear(e);
                      }
                    }}
                  />
                )}
            </div>
          </label>
        </div>

        <input
          id={docType}
          ref={ref}
          type="file"
          className="hidden"
          accept=".png, .jpg, .pdf"
          onChange={(e) => handleFileChange(e, setFileName)}
        />
      </div>
    );
  };

  const idFrontUrl = docData.proofOfValidID;
  const idBackUrl = docData.proofOfValidIDBackView;

  return (
    <div className="w-full bg-white shadow-md mb-16 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main">
          Document Upload
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          Additional document needed to speed up the KYC process
        </p>
      </div>

      <div className="flex md:flex-row flex-col items-center mb-5 justify-between gap-5">
        <div className="w-full h-[140px] mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-center relative hover:border-main transition-colors group">
          {frontFile && (
            <HiTrash
              size={20}
              className="absolute top-2 z-10 right-2 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => removeImage(setFrontFile)}
            />
          )}

          {!frontFile &&
            idFrontUrl &&
            (kycStatus.data.status === "REJECTED" ||
              kycStatus.data.status === "NOT_STARTED") && (
              <div className="flex">
                <HiTrash
                  size={20}
                  className="absolute top-2 right-2 z-10 text-red-500 cursor-pointer hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDeleteKey("proofOfValidID");
                    setShowConfirm(true);
                  }}
                />
              </div>
            )}

          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            ref={validIDFront}
            onChange={(e) => handleAddImage(e, setFrontFile)}
          />

          {frontFile ? (
            <img
              src={URL.createObjectURL(frontFile)}
              alt="ID Front"
              className="max-h-full max-w-full object-contain"
            />
          ) : idFrontUrl ? (
            <img
              src={idFrontUrl!}
              alt="ID Front"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <p className="text-base flex items-center gap-2">
              <span className="font-semibold">ID</span> card Front{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.13103 7.84214C7.07605 7.84214 7.84214 7.07605 7.84214 6.13103C7.84214 5.18601 7.07605 4.41992 6.13103 4.41992C5.18601 4.41992 4.41992 5.18601 4.41992 6.13103C4.41992 7.07605 5.18601 7.84214 6.13103 7.84214Z"
                  stroke="#0640B5"
                  stroke-width="0.855556"
                />

                <path
                  d="M0.427734 6.33908C0.427734 4.59089 0.427734 3.71709 0.854942 3.08968C1.04064 2.81704 1.27826 2.58368 1.55422 2.40295C1.96488 2.13317 2.47936 2.03678 3.26704 2.00255C3.64291 2.00255 3.96631 1.72307 4.03989 1.36089C4.09612 1.09559 4.24222 0.857841 4.45349 0.687822C4.66477 0.517803 4.92827 0.425941 5.19945 0.427761H7.06342C7.62695 0.427761 8.11233 0.818465 8.22299 1.36089C8.29656 1.72307 8.61996 2.00255 8.99584 2.00255C9.78295 2.03678 10.2974 2.13374 10.7087 2.40295C10.9853 2.58433 11.2231 2.81761 11.4079 3.08968C11.8351 3.71709 11.8351 4.59089 11.8351 6.33908C11.8351 8.08727 11.8351 8.9605 11.4079 9.58848C11.2222 9.86112 10.9846 10.0945 10.7087 10.2752C10.0693 10.6944 9.17893 10.6944 7.3988 10.6944H4.86408C3.08395 10.6944 2.1936 10.6944 1.55422 10.2752C1.27841 10.0943 1.04098 9.8607 0.855512 9.58791C0.731593 9.40333 0.640335 9.19882 0.585727 8.98332M10.124 4.42035H9.55366"
                  stroke="#0640B5"
                  stroke-width="0.855556"
                  stroke-linecap="round"
                />
              </svg>
            </p>
          )}
          <div></div>
        </div>

        <div className="w-full h-[140px] mt-1 py-3 px-3 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-center relative hover:border-main transition-colors">
          {backFile && (
            <HiTrash
              size={20}
              className="absolute top-2 right-2 z-10 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => removeImage(setBackFile)}
            />
          )}

          {!backFile &&
            idBackUrl &&
            (kycStatus.data.status === "REJECTED" ||
              kycStatus.data.status === "NOT_STARTED") && (
              <>
                <HiTrash
                  size={20}
                  className="absolute top-2 right-2 z-10 text-red-500 cursor-pointer hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDeleteKey("proofOfValidIDBackView");
                    setShowConfirm(true);
                  }}
                />
              </>
            )}

          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            ref={validIDBack} // Attach ref here
            onChange={(e) => handleAddImage(e, setBackFile)}
          />

          {backFile ? (
            <img
              src={URL.createObjectURL(backFile)}
              alt="ID Back"
              className="max-h-full max-w-full object-contain"
            />
          ) : idBackUrl ? (
            <img
              src={idBackUrl!}
              alt="ID Back"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <p className="text-base flex items-center gap-2">
              <span className="font-semibold">ID</span> card Back{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.13103 7.84214C7.07605 7.84214 7.84214 7.07605 7.84214 6.13103C7.84214 5.18601 7.07605 4.41992 6.13103 4.41992C5.18601 4.41992 4.41992 5.18601 4.41992 6.13103C4.41992 7.07605 5.18601 7.84214 6.13103 7.84214Z"
                  stroke="#0640B5"
                  stroke-width="0.855556"
                />

                <path
                  d="M0.427734 6.33908C0.427734 4.59089 0.427734 3.71709 0.854942 3.08968C1.04064 2.81704 1.27826 2.58368 1.55422 2.40295C1.96488 2.13317 2.47936 2.03678 3.26704 2.00255C3.64291 2.00255 3.96631 1.72307 4.03989 1.36089C4.09612 1.09559 4.24222 0.857841 4.45349 0.687822C4.66477 0.517803 4.92827 0.425941 5.19945 0.427761H7.06342C7.62695 0.427761 8.11233 0.818465 8.22299 1.36089C8.29656 1.72307 8.61996 2.00255 8.99584 2.00255C9.78295 2.03678 10.2974 2.13374 10.7087 2.40295C10.9853 2.58433 11.2231 2.81761 11.4079 3.08968C11.8351 3.71709 11.8351 4.59089 11.8351 6.33908C11.8351 8.08727 11.8351 8.9605 11.4079 9.58848C11.2222 9.86112 10.9846 10.0945 10.7087 10.2752C10.0693 10.6944 9.17893 10.6944 7.3988 10.6944H4.86408C3.08395 10.6944 2.1936 10.6944 1.55422 10.2752C1.27841 10.0943 1.04098 9.8607 0.855512 9.58791C0.731593 9.40333 0.640335 9.19882 0.585727 8.98332M10.124 4.42035H9.55366"
                  stroke="#0640B5"
                  stroke-width="0.855556"
                  stroke-linecap="round"
                />
              </svg>
            </p>
          )}
        </div>
      </div>
      {/* End Valid ID Front/Back Section */}

      <div className="grid md:grid-cols-2 gap-5">
        {renderFileField(
          "Recent Proof of Address",
          proofOfAddressRef,
          proofOfAddressName,
          setProofOfAddressName,
          "recentProofOfAddress",
          "recentProofOfAddressStatus",
          "recentProofOfAddress",
          "Recent Proof of Address (required)"
        )}

        {renderFileField(
          "Recent Selfie with ID",
          selfieRef,
          selfieName,
          setSelfieName,
          "recentSelfieWithID",
          "recentSelfieWithIDStatus",
          "recentSelfieWithID",
          "Recent Selfie with ID (required)"
        )}

        {renderFileField(
          "Recent Bank Statement",
          bankStatementRef,
          bankStatementName,
          setBankStatementName,
          "recentBankStatement",
          "recentBankStatementStatus",
          "recentBankStatement",
          "Recent Proof of Bank Statement (last 3 months required)"
        )}

        {renderFileField(
          "Additional Documents",
          additionalDocsRef,
          additionalDocsName,
          setAdditionalDocsName,
          "additionalDocuments",
          "additionalDocumentsStatus",
          "additionalDocuments",
          "Any Additional Document (optional)"
        )}
      </div>

      <div className="space-y-1 my-3">
        <p className="text-[#454745] text-xs font-poppins">
          Files should be in .png, .jpg or .pdf format
        </p>

        <p className="text-[#454745] text-xs font-poppins">
          Max size is 50mb and clear visible copy
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            onClick={() => router.back()}
            className="font-poppins py-2 bg-[#e3e3e3] pr-3 rounded-md inline-flex text-sm font-semibold items-center text-main gap-2 cursor-pointer"
          >
            <ChevronLeft size={25} className="text-main cursor-pointer" />
            Back
          </div>
          <button
            type="submit"
            disabled={
              updateIndividualDocs.isPending ||
              kycStatus.data.status === "APPROVED" ||
              kycStatus.data.status === "PENDING_REVIEW"
            }
            onClick={() => handleSubmit()}
            className=" text-white font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateIndividualDocs.isPending ? "Saving..." : "Save"}
          </button>
        </div>

        {(kycStatus.data.status === "NOT_STARTED" ||
          kycStatus.data.status === "REJECTED") && (
          <div className="bg-white z-9 fixed bottom-0 left-0 w-full p-3 flex flex-col items-center">
            <button
              onClick={() =>
                submitKyc.mutate(undefined, {
                  onSuccess: () => {
                    toast.success("Submission for KYC successful");
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                  },
                })
              }
              disabled={submitKyc.isPending}
              className="w-full font-poppins text-sm cursor-pointer bg-main text-white p-2 rounded-sm disabled:opacity-50"
            >
              {submitKyc.isPending
                ? "Submitting..."
                : "Submit KYC for Approval"}
            </button>

            {showSuccess && (
              <div className="font-poppins justify-center text-sm flex items-center gap-2 text-main mt-2">
                <FaCircleCheck size={20} className="text-main" />
                Saved
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        open={showConfirm}
        message="Do you really want to delete this document?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
        loading={deleteDoc.isPending}
      />
    </div>
  );
};

export default IndividualDoc;
