"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { FaCircleQuestion, FaPlus } from "react-icons/fa6";

import {
  useProfile,
  NaturalPersonShareholder,
  LegalEntityShareholder,
  Shareholder,
} from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { countriesWithCodes } from "@/data/data";
import { uploadToCloudinary } from "@/lib/cloudinary";
import FileUpload from "./fileUpload";

export default function ShareHolderForm({ userDeets }: any) {
  const docData = userDeets?.shareholders || [];

  const [activeTab, setActiveTab] = useState<"individual" | "entity">(
    "individual"
  );

  const [individuals, setIndividuals] = useState<NaturalPersonShareholder[]>(
    []
  );
  const [entities, setEntities] = useState<LegalEntityShareholder[]>([]);

  const [currentIndividualIndex, setCurrentIndividualIndex] = useState(0);
  const [currentEntityIndex, setCurrentEntityIndex] = useState(0);

  // Prefill shareholders on fetch
  useEffect(() => {
    if (!docData) return;

    const indivs = docData.filter(
      (s: Shareholder) => s.entityType !== "LEGAL_ENTITY"
    );
    setIndividuals(
      indivs.length > 0
        ? indivs.map((i: any) => ({
            ...i,
            validIdFile: undefined,
            proofOfAddressFile: undefined,
          }))
        : [
            {
              firstname: "",
              lastname: "",
              dateOfBirth: "",
              nationality: "",
              identificationDocument: "",
              idNumber: "",
              issuedCountry: "",
              residentialAddress: "",
              percentageSharesOwned: 0,
              validIdUrl: "",
              proofOfAddressUrl: "",
              taxNumber: "",
            },
          ]
    );

    const ents = docData.filter(
      (s: Shareholder) => s.entityType === "LEGAL_ENTITY"
    );
    setEntities(
      ents.length > 0
        ? ents
        : [
            {
              legalEntityName: "",
              countryOfRegistrationIncorporation: "",
              registrationIncorporationNumber: "",
              percentageSharesOwned: 0,
            },
          ]
    );
  }, [docData]);

  const renderIndividualForm = (
    data: NaturalPersonShareholder,
    idx: number
  ) => (
    <div className="grid md:grid-cols-3 gap-5">
      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          First Name*
        </label>
        <input
          name="firstname"
          type="text"
          readOnly
          value={data?.firstname || ""}
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Last Name*
        </label>
        <input
          name="lastname"
          type="text"
          value={data?.lastname || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Date of Birth*
        </label>
        <input
          name="dateOfBirth"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={data?.dateOfBirth?.split("T")[0] || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Nationality*
        </label>
        <select
          name="nationality"
          value={data?.nationality || ""}
          aria-readonly
          className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
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
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Identification Document*
        </label>
        <select
          name="identificationDocument"
          value={data?.identificationDocument || ""}
          aria-readonly
          className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        >
          <option value="">Select Document</option>
          <option value="NIN">National ID</option>
          <option value="Driver's License">Driver’s License</option>
          <option value="International Passport">International Passport</option>
          <option value="Voter’s Card">Voter’s Card</option>
          <option value="Resident Permit / Work Permit">
            Resident Permit / Work Permit
          </option>
        </select>
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          ID/Passport Number*
        </label>
        <input
          name="idNumber"
          type="text"
          value={data?.idNumber || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Issued Country
        </label>
        <select
          name="issuedCountry"
          value={data?.issuedCountry || ""}
          aria-readonly
          className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
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
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Residential Address*
        </label>
        <input
          name="residentialAddress"
          type="text"
          value={data?.residentialAddress || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Percentage of Shares Owned*
        </label>
        <input
          name="percentageSharesOwned"
          type="number"
          placeholder="%"
          value={data?.percentageSharesOwned || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <FileUpload
        label="Valid ID for Shareholder*"
        fileUrl={data?.validIdUrl}
        fileObj={(data as any)?.validIdFile}
      />

      <FileUpload
        label="Proof of Address*"
        fileUrl={data?.proofOfAddressUrl}
        fileObj={(data as any)?.proofOfAddressFile}
      />

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Tax Number*
        </label>
        <input
          name="taxNumber"
          type="text"
          value={data?.taxNumber || ""}
          readOnly
          className="font-poppins mt-2 text-sm w-full indent-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>
    </div>
  );

  const renderEntityForm = (data: LegalEntityShareholder, idx: number) => (
    <div className="grid md:grid-cols-3 gap-5">
      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Name*
        </label>
        <input
          name="legalEntityName"
          type="text"
          value={data?.legalEntityName || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Country of Registration/Incorporation*
        </label>
        <select
          name="countryOfRegistrationIncorporation"
          value={data?.countryOfRegistrationIncorporation || ""}
          aria-readonly
          className="font-poppins text-sm w-full mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
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
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Registration/Incorporation Number*
        </label>
        <input
          name="registrationIncorporationNumber"
          type="text"
          value={data?.registrationIncorporationNumber || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>

      <div>
        <label className="font-poppins font-semibold text-sm text-[#454745]">
          Percentage of Shares Owned*
        </label>
        <input
          name="percentageSharesOwned"
          type="number"
          placeholder="%"
          value={data?.percentageSharesOwned || ""}
          readOnly
          className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
          Shareholders <FaCircleQuestion size={16} className="text-[#454745]" />
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          We would like to know a bit about your shareholders
        </p>
      </div>

      <div className="flex items-center gap-5 flex-col md:flex-row mb-6">
        <div
          onClick={() => setActiveTab("individual")}
          className={`flex items-start gap-3 md:gap-1 w-full cursor-pointer p-3 rounded-md transition-colors ${
            activeTab === "individual"
              ? "bg-main/10 border border-main"
              : "border border-[#d1d5db80]"
          }`}
        >
          <input
            type="checkbox"
            checked={activeTab === "individual"}
            onChange={() => setActiveTab("individual")}
            className="w-4 h-4 mt-1 rounded-sm accent-main cursor-pointer"
          />
          <div>
            <h1 className="font-semibold font-poppins text-[#454745]">
              Natural Person/UBOs
            </h1>
            <p className="text-sm font-dm-sans text-[#454745]">
              This shareholder is an individual
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab("entity")}
          className={`flex items-start gap-3 md:gap-1 w-full cursor-pointer p-3 rounded-md transition-colors ${
            activeTab === "entity"
              ? "bg-main/10 border border-main"
              : "border border-[#d1d5db80]"
          }`}
        >
          <input
            type="checkbox"
            checked={activeTab === "entity"}
            onChange={() => setActiveTab("entity")}
            className="w-4 h-4 mt-1 rounded-sm accent-main cursor-pointer"
          />
          <div>
            <h1 className="font-semibold font-poppins text-[#454745]">
              Legal Entity
            </h1>
            <p className="text-sm font-dm-sans text-[#454745]">
              This shareholder is a legal entity
            </p>
          </div>
        </div>
      </div>

      {activeTab === "individual" && individuals.length > 0 && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center flex-wrap overflow-x-auto mt-2">
            {individuals.map((i, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-xs rounded font-poppins border ${
                  idx === currentIndividualIndex
                    ? "bg-main text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setCurrentIndividualIndex(idx)}
              >
                {i.firstname || "New"} {i.lastname || ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "entity" && entities.length > 0 && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center flex-wrap overflow-x-auto mt-2">
            {entities.map((e, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-xs rounded font-poppins border ${
                  idx === currentEntityIndex
                    ? "bg-main text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setCurrentEntityIndex(idx)}
              >
                {e.legalEntityName || "New"}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "individual" && (
        <>
          {renderIndividualForm(
            individuals[currentIndividualIndex],
            currentIndividualIndex
          )}
        </>
      )}

      {activeTab === "entity" && (
        <>
          {renderEntityForm(entities[currentEntityIndex], currentEntityIndex)}
        </>
      )}
    </div>
  );
}
