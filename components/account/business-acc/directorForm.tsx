"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { toast } from "sonner";
import {
  Director,
  useProfile,
} from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { countriesWithCodes } from "@/data/data";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Eye, Trash } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import ConfirmModal from "../modal/deleteModal";

const DirectorForm = ({ fetchBusinessProfile }: any) => {
  const { updateBusinessDirectors, deleteDirector, getKYCStatus } =
    useProfile();
  const docData = fetchBusinessProfile?.data?.directors || [];

  const { data: kycStatus, isLoading: kycStatusLoad } =
    getKYCStatus("BUSINESS");

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [pendingDeleteData, setPendingDeleteData] = useState<{
    id?: string;
    index: number;
  } | null>(null);

  const [directors, setDirectors] = useState<Director[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const idProofRef = useRef<HTMLInputElement>(null);
  const resProofRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (docData.length > 0) {
      setDirectors(
        docData.map((d: any) => ({
          ...d,
          identificationDocumentProofFile: undefined,
          residentialAddressUrlProofFile: undefined,
          dateOfBirth: d.dateOfBirth
            ? new Date(d.dateOfBirth).toISOString().split("T")[0]
            : "",
          percentageShareholding: d.percentageShareholding ?? undefined,
          issuedCountry: d.issuedCountry ?? "",
        }))
      );
    }
  }, [docData]);

  const currentDirector = directors[currentIndex] ?? {
    firstname: "",
    lastname: "",
    position: "",
    isShareholder: false,
    nationality: "",
    identificationDocument: "",
    idNumber: "",
    residentialAddress: "",
    issuedCountry: "",
    dateOfBirth: "",
    percentageShareholding: undefined,
    identificationDocumentProofUrl: "",
    residentialAddressUrlProof: "",
    identificationDocumentProofFile: undefined,
    residentialAddressUrlProofFile: undefined,
  };

  const updateCurrentDirector = (key: keyof Director, value: any) => {
    setDirectors((prev) => {
      const updated = [...prev];
      updated[currentIndex] = { ...updated[currentIndex], [key]: value };
      return updated;
    });
  };

  const handleProofUpload = async (
    file: File,
    key: "identificationDocumentProofUrl" | "residentialAddressUrlProof"
  ) => {
    const sizeKB = file.size / 1024;

    if (key === "identificationDocumentProofUrl") {
      updateCurrentDirector("identificationDocumentProofFile", file);
      updateCurrentDirector("identificationDocumentProofUrlSizeKB", sizeKB);
    } else {
      updateCurrentDirector("residentialAddressUrlProofFile", file);
      updateCurrentDirector("residentialAddressUrlProofSizeKB", sizeKB);
    }

    try {
      const url = await uploadToCloudinary(file, "raw");
      updateCurrentDirector(key, url);
    } catch (err) {
      toast.error("Failed to upload file");
    }
  };

  const handleRemoveTab = (idx: number) => {
    setDirectors((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      return updated;
    });
    if (currentIndex >= directors.length - 1) {
      setCurrentIndex(directors.length - 2 >= 0 ? directors.length - 2 : 0);
    }
  };

  const handleDeleteDirector = async (id: string, idx: number) => {
    setLoadingDelete(true);
    deleteDirector.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Director deleted");
          handleRemoveTab(idx);
          fetchBusinessProfile.refetch();
        },
        onSettled: () => setLoadingDelete(false),
      }
    );
  };

  const handleAddNewDirector = () => {
    setDirectors((prev) => [
      ...prev,
      {
        firstname: "",
        lastname: "",
        position: "",
        isShareholder: false,
        nationality: "",
        identificationDocument: "",
        idNumber: "",
        residentialAddress: "",
        issuedCountry: "",
        dateOfBirth: "",
        percentageShareholding: undefined,
        identificationDocumentProofUrl: "",
        residentialAddressUrlProof: "",
        identificationDocumentProofFile: undefined,
        residentialAddressUrlProofFile: undefined,
      },
    ]);
    setCurrentIndex(directors.length);
    if (idProofRef.current) idProofRef.current.value = "";
    if (resProofRef.current) resProofRef.current.value = "";
  };

  const handleSaveDirector = async () => {
    const director = directors[currentIndex];

    if (
      !director.firstname ||
      !director.lastname ||
      !director.position ||
      !director.identificationDocument ||
      !director.idNumber ||
      (!director.identificationDocumentProofFile &&
        !director.identificationDocumentProofUrl) ||
      (!director.residentialAddressUrlProofFile &&
        !director.residentialAddressUrlProof)
    ) {
      toast.error("Complete all required fields");
      return;
    }
    setLoadingSave(true);
    try {
      let idProofUrl = director.identificationDocumentProofUrl;
      let resProofUrl = director.residentialAddressUrlProof;

      if (director.identificationDocumentProofFile) {
        idProofUrl = await uploadToCloudinary(
          director.identificationDocumentProofFile,
          "raw"
        );
      }
      if (director.residentialAddressUrlProofFile) {
        resProofUrl = await uploadToCloudinary(
          director.residentialAddressUrlProofFile,
          "raw"
        );
      }

      const {
        identificationDocumentProofFile,
        residentialAddressUrlProofFile,
        businessAccountId,
        ...cleanDirector
      } = director;

      const directorToSend = {
        ...cleanDirector,
        dateOfBirth: director.dateOfBirth
          ? new Date(director.dateOfBirth).toISOString()
          : undefined,
        identificationDocumentProofUrl: idProofUrl,
        identificationDocumentProofUrlSizeKB:
          director.identificationDocumentProofUrlSizeKB,
        residentialAddressUrlProof: resProofUrl,
        residentialAddressUrlProofSizeKB:
          director.residentialAddressUrlProofSizeKB,
      };

      const saved = await updateBusinessDirectors.mutateAsync([directorToSend]);

      setDirectors((prev) => {
        const updated = [...prev];
        updated[currentIndex] = { ...updated[currentIndex], ...saved[0] };
        return updated;
      });

      toast.success("Director saved!");
      fetchBusinessProfile.refetch();
    } catch (err) {
      toast.error("Failed to save director");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDoneAdding = async () => {
    try {
      await updateBusinessDirectors.mutateAsync(directors);
      toast.success("All directors saved!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save directors");
    }
  };

  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3 flex justify-between items-center">
        <div>
          <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
            Director <FaCircleQuestion size={16} className="text-[#454745]" />
          </h1>
          <p className="text-xs sm:text-sm text-[#454745] font-dm-sans">
            We would like to know a bit about your directors
          </p>
        </div>
        {(kycStatus.data.status === "NOT_STARTED" ||
          kycStatus.data.status === "REJECTED") && (
          <div>
            <button
              onClick={handleAddNewDirector}
              className="font-poppins my-3 flex items-center gap-1 text-xs sm:text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm bg-main/30"
            >
              <FaPlus /> Add aonther director
            </button>
          </div>
        )}
      </div>

      {directors.length > 0 && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 flex-wrap overflow-x-auto mt-2">
            {directors.map((d, idx) => (
              <button
                key={idx}
                className={`px-3 font-poppins text-xs py-1 border rounded ${
                  idx === currentIndex ? "bg-main text-white" : "bg-gray-100"
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                {d.firstname || "New"} {d.lastname || ""}
              </button>
            ))}
          </div>

          {(kycStatus.data.status === "NOT_STARTED" ||
            kycStatus.data.status === "REJECTED") && (
            <Trash
              className={`text-red-500 cursor-pointer ${
                loadingDelete ? "opacity-50 cursor-not-allowed" : ""
              }`}
              size={16}
              onClick={() => {
                if (loadingDelete) return;

                const director = directors[currentIndex];

                setPendingDeleteData({
                  id: director.id,
                  index: currentIndex,
                });
                setShowConfirmDelete(true);
              }}
            />
          )}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-5 mt-3">
        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            First Name*
          </label>
          <input
            type="text"
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.firstname}
            onChange={(e) => updateCurrentDirector("firstname", e.target.value)}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Last Name*
          </label>
          <input
            type="text"
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.lastname}
            onChange={(e) => updateCurrentDirector("lastname", e.target.value)}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Position*
          </label>
          <input
            type="text"
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.position}
            onChange={(e) => updateCurrentDirector("position", e.target.value)}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Date of Birth*
          </label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.dateOfBirth || ""}
            onChange={(e) =>
              updateCurrentDirector("dateOfBirth", e.target.value)
            }
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Nationality*
          </label>
          <select
            value={currentDirector.nationality}
            onChange={(e) =>
              updateCurrentDirector("nationality", e.target.value)
            }
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors bg-white"
          >
            <option value="">Select a Country</option>
            {countriesWithCodes.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Identification Document*
          </label>
          <select
            value={currentDirector.identificationDocument}
            onChange={(e) =>
              updateCurrentDirector("identificationDocument", e.target.value)
            }
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3.5 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
          >
            <option value="">Select</option>
            <option value="ID">National ID Card</option>
            <option value="Driver's License">Driver’s License</option>
            <option value="International Passport">
              International Passport
            </option>
            <option value="Voter’s Card">Voter’s Card</option>
            <option value="Resident Permit / Work Permit">
              Resident Permit / Work Permit
            </option>
          </select>
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            ID Number*
          </label>
          <input
            type="text"
            value={currentDirector.idNumber}
            onChange={(e) => updateCurrentDirector("idNumber", e.target.value)}
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Residential Address*
          </label>
          <input
            type="text"
            value={currentDirector.residentialAddress}
            onChange={(e) =>
              updateCurrentDirector("residentialAddress", e.target.value)
            }
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm flex items-center gap-1 text-[#454745]">
            Identification Document Proof*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>
          <label
            htmlFor="idProof"
            className="w-full mt-3 font-poppins py-3 text-xs sm:text-sm overflow-x-scroll scrollbar-hide px-3 rounded-sm border border-dashed text-[#666] cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">
              {currentDirector.identificationDocumentProofFile?.name ||
                currentDirector.identificationDocumentProofUrl
                  ?.split("/")
                  .pop() ||
                "Choose file to upload (required)"}
              {currentDirector.identificationDocumentProofUrlSizeKB && (
                <span className="ml-1 text-xs text-gray-500">
                  (
                  {(
                    currentDirector.identificationDocumentProofUrlSizeKB / 1024
                  ).toFixed(2)}{" "}
                  MB )
                </span>
              )}
            </span>
            {currentDirector.identificationDocumentProofUrl && (
              <button
                type="button"
                onClick={() =>
                  window.open(
                    currentDirector.identificationDocumentProofUrl,
                    "_blank"
                  )
                }
                className="text-main ml-2"
              >
                <Eye className="cursor-pointer text-main" size={14} />
              </button>
            )}
          </label>

          <input
            id="idProof"
            type="file"
            className="hidden"
            ref={idProofRef}
            onChange={(e) => {
              if (!e.target.files) return;
              handleProofUpload(
                e.target.files[0],
                "identificationDocumentProofUrl"
              );
            }}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Issued Country*
          </label>
          <select
            value={currentDirector.issuedCountry}
            onChange={(e) =>
              updateCurrentDirector("issuedCountry", e.target.value)
            }
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors bg-white"
          >
            <option value="">Select a Country</option>
            {countriesWithCodes.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-poppins font-semibold text-xs sm:text-sm overflow-x-scroll scrollbar-hide  flex items-center gap-1 text-[#454745]">
            Residential Address Proof*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>
          <label
            htmlFor="resProof"
            className="w-full mt-3 font-poppins py-3 px-3 text-xs sm:text-sm  rounded-sm border border-dashed text-[#666] cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">
              {currentDirector.residentialAddressUrlProofFile?.name ||
                currentDirector.residentialAddressUrlProof?.split("/").pop() ||
                "Choose file to upload (required)"}
              {currentDirector.residentialAddressUrlProofSizeKB && (
                <span className="ml-1 text-xs text-gray-500">
                  (
                  {(
                    currentDirector.residentialAddressUrlProofSizeKB / 1024
                  ).toFixed(2)}{" "}
                  MB )
                </span>
              )}
            </span>

            {currentDirector.residentialAddressUrlProof && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    currentDirector.residentialAddressUrlProof,
                    "_blank"
                  );
                }}
                className="text-main ml-2"
                title="Preview file"
              >
                <Eye className="cursor-pointer text-main" size={14} />
              </button>
            )}
          </label>

          <input
            id="resProof"
            type="file"
            className="hidden"
            ref={resProofRef}
            onChange={(e) => {
              if (!e.target.files) return;
              handleProofUpload(
                e.target.files[0],
                "residentialAddressUrlProof"
              );
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <input
          type="checkbox"
          className="w-4 h-4 rounded-sm accent-main"
          checked={currentDirector.isShareholder}
          onChange={(e) =>
            updateCurrentDirector("isShareholder", e.target.checked)
          }
        />
        <p className="text-xs sm:text-sm font-poppins text-[#454745]">
          This director is a shareholder
        </p>
      </div>

      {currentDirector.isShareholder && (
        <div className="md:w-1/3 mt-2">
          <label className="font-poppins font-semibold text-xs sm:text-sm text-[#454745]">
            Percentage Shareholding*
          </label>
          <input
            type="number"
            placeholder="%"
            value={currentDirector.percentageShareholding || ""}
            onChange={(e) =>
              updateCurrentDirector(
                "percentageShareholding",
                Number(e.target.value)
              )
            }
            className="font-poppins text-xs sm:text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
          />
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSaveDirector}
          disabled={
            loadingSave ||
           kycStatus.data.status === "APPROVED" ||
            kycStatusLoad
          }
          className={`font-poppins  text-xs sm:text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm  disabled:opacity-50 disabled:cursor-not-allowed `}
        >
          {loadingSave ? "Saving..." : "Save Director"}
        </button>
      </div>
      <ConfirmModal
        open={showConfirmDelete}
        message="Are you sure you want to delete this director?"
        confirmText={loadingDelete ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        onCancel={() => {
          setShowConfirmDelete(false);
          setPendingDeleteData(null);
        }}
        onConfirm={() => {
          if (!pendingDeleteData) return;
          if (pendingDeleteData.id) {
            handleDeleteDirector(pendingDeleteData.id, pendingDeleteData.index);
          } else {
            handleRemoveTab(pendingDeleteData.index);
          }

          setShowConfirmDelete(false);
          setPendingDeleteData(null);
        }}
      />
    </div>
  );
};

export default DirectorForm;
