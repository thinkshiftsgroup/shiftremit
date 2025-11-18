"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { toast } from "sonner";
import {
  Director,
  useProfile,
} from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { countriesWithCodes } from "@/data/data";
import { Eye, Trash } from "lucide-react";

const DirectorForm = ({ userDeets }: any) => {
  const docData = userDeets?.directors || [];

  const [directors, setDirectors] = useState<Director[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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


  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3 flex justify-between items-center">
        <div>
          <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
            Director <FaCircleQuestion size={16} className="text-[#454745]" />
          </h1>
          <p className="text-sm text-[#454745] font-dm-sans">
            We would like to know a bit about your directors
          </p>
        </div>
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
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-5 mt-3">
        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            First Name*
          </label>
          <input
            type="text"
            readOnly
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.firstname}
            onChange={(e) => updateCurrentDirector("firstname", e.target.value)}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Last Name*
          </label>
          <input
            type="text"
            readOnly
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.lastname}
            onChange={(e) => updateCurrentDirector("lastname", e.target.value)}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Position*
          </label>
          <input
            type="text"
            readOnly
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.position}
            onChange={(e) => updateCurrentDirector("position", e.target.value)}
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Date of Birth*
          </label>
          <input
            type="date"
            readOnly
            max={new Date().toISOString().split("T")[0]}
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
            value={currentDirector.dateOfBirth || ""}
            onChange={(e) =>
              updateCurrentDirector("dateOfBirth", e.target.value)
            }
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Nationality*
          </label>
          <select
            aria-readonly
            value={currentDirector.nationality}
            onChange={(e) =>
              updateCurrentDirector("nationality", e.target.value)
            }
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors bg-white"
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Identification Document*
          </label>
          <select
            aria-readonly
            value={currentDirector.identificationDocument}
            onChange={(e) =>
              updateCurrentDirector("identificationDocument", e.target.value)
            }
            className="font-poppins text-sm w-full mt-2 py-3.5 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors appearance-none pr-8"
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
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            ID Number*
          </label>
          <input
            type="text"
            readOnly
            value={currentDirector.idNumber}
            onChange={(e) => updateCurrentDirector("idNumber", e.target.value)}
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Residential Address*
          </label>
          <input
            type="text"
            readOnly
            value={currentDirector.residentialAddress}
            onChange={(e) =>
              updateCurrentDirector("residentialAddress", e.target.value)
            }
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm flex items-center gap-1 text-[#454745]">
            Identification Document Proof*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>
          <label
            aria-readonly
            htmlFor="idProof"
            className="w-full mt-3 font-poppins py-3 px-3 rounded-sm border border-dashed text-[#666] cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">
              {currentDirector.identificationDocumentProofFile?.name ||
                currentDirector.identificationDocumentProofUrl
                  ?.split("/")
                  .pop() ||
                "Choose file to upload (required)"}
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

          {/* <input
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
          /> */}
        </div>

        <div>
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Issued Country*
          </label>
          <select
            aria-readonly
            value={currentDirector.issuedCountry}
            onChange={(e) =>
              updateCurrentDirector("issuedCountry", e.target.value)
            }
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors bg-white"
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
          <label className="font-poppins font-semibold text-sm flex items-center gap-1 text-[#454745]">
            Residential Address Proof*{" "}
            <FaCircleQuestion size={16} className="text-[#454745]" />
          </label>
          <label
            aria-readonly
            htmlFor="resProof"
            className="w-full mt-3 font-poppins py-3 px-3 rounded-sm border border-dashed text-[#666] cursor-pointer flex items-center justify-between hover:border-main transition-colors"
          >
            <span className="opacity-80">
              {currentDirector.residentialAddressUrlProofFile?.name ||
                currentDirector.residentialAddressUrlProof?.split("/").pop() ||
                "Choose file to upload (required)"}
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

          {/* <input
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
          /> */}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <input
          readOnly
          type="checkbox"
          className="w-4 h-4 rounded-sm accent-main"
          checked={currentDirector.isShareholder}
          onChange={(e) =>
            updateCurrentDirector("isShareholder", e.target.checked)
          }
        />
        <p className="text-sm font-poppins text-[#454745]">
          This director is a shareholder
        </p>
      </div>

      {currentDirector.isShareholder && (
        <div className="md:w-1/3 mt-2">
          <label className="font-poppins font-semibold text-sm text-[#454745]">
            Percentage Shareholding*
          </label>
          <input
            readOnly
            type="number"
            placeholder="%"
            value={currentDirector.percentageShareholding || ""}
            onChange={(e) =>
              updateCurrentDirector(
                "percentageShareholding",
                Number(e.target.value)
              )
            }
            className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745] focus:border-main focus:outline-none transition-colors"
          />
        </div>
      )}
    </div>
  );
};

export default DirectorForm;
