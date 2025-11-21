import { HiTrash } from "react-icons/hi2";
import ActionDropDown from "./action";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/useAdmin";

const statusColors: Record<string, string> = {
  PENDING_UPLOAD: "text-gray-500",
  PENDING: "text-orange-500",
  APPROVED: "text-green-500",
  IN_REVIEW: "text-main",
  REJECTED: "text-red-500",
};
const DocUpload = ({ user, isLoading }: any) => {
  const { changeFileStatus } = useAdmin();

  const [proofOfAddressName, setProofOfAddressName] = useState("");
  const [selfieName, setSelfieName] = useState("");
  const [bankStatementName, setBankStatementName] = useState("");
  const [additionalDocsName, setAdditionalDocsName] = useState("");

  const proofOfAddressRef = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);
  const bankStatementRef = useRef<HTMLInputElement>(null);
  const additionalDocsRef = useRef<HTMLInputElement>(null);

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const docData = user?.individualAccountDoc || {};

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
      <div className="overflow-x-scroll scrollbar-hide">
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          {label}
        </label>
        <div className="relative">
          <label
            htmlFor={docType} 
            className="w-full mt-1 pl-2 gap-2 rounded-sm border border-dashed border-[#d1d5db80] text-[#666] text-sm font-poppins cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">{prefillName || placeholder}</span>

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
                <ActionDropDown
                  onPreview={() => handlePreview(newFile || null, fileUrl)}
                  onStatusChange={(status) => {
                    changeFileStatus.mutate({
                      userId: user?.id,
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

  const idFrontUrl = docData.proofOfValidID;
  const idBackUrl = docData.proofOfValidIDBackView;
  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
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
          {!frontFile && idFrontUrl && (
            <div className="flex ">
              <div className="absolute flex items-center flex-col gap-1 top-2 right-2 z-10">
                <span
                  className={`text-xs font-poppins ${
                    statusColors[docData.proofOfValidIDStatus] ||
                    "text-gray-500"
                  }`}
                >
                  {docData.proofOfValidIDStatus.replace(/_/g, " ")}
                </span>
                <ActionDropDown
                  onPreview={() => handlePreview(frontFile, idFrontUrl)}
                  onStatusChange={(status) => {
                    changeFileStatus.mutate({
                      userId: user?.id,
                      docType: "proofOfValidID",
                      status,
                    });
                  }}
                  disableApprove={docData.proofOfValidIDStatus === "APPROVED"}
                  disableReject={docData.proofOfValidIDStatus === "REJECTED"}
                />
              </div>
            </div>
          )}

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
          {!backFile && idBackUrl && (
            <>
              <div className="absolute flex items-center flex-col gap-1 top-2 right-2 z-10 ">
                <span
                  className={`text-xs font-poppins ${
                    statusColors[docData.proofOfValidIDBackViewStatus] ||
                    "text-gray-500"
                  }`}
                >
                  {docData.proofOfValidIDBackViewStatus.replace(/_/g, " ")}
                </span>
                <ActionDropDown
                  onPreview={() => handlePreview(backFile, idBackUrl)}
                  onStatusChange={(status) => {
                    changeFileStatus.mutate({
                      userId: user?.id,
                      docType: "proofOfValidIDBackView",
                      status,
                    });
                  }}
                  disableApprove={
                    docData.proofOfValidIDBackViewStatus === "APPROVED"
                  }
                  disableReject={
                    docData.proofOfValidIDBackViewStatus === "REJECTED"
                  }
                />
              </div>
            </>
          )}

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
    </div>
  );
};

export default DocUpload;
