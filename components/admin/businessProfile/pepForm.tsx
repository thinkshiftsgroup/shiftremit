import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { PepI } from "@/components/account/business-acc/PEPForm";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const PEPForm = ({ userDeets }: any) => {
  const docData = userDeets?.peps || [];
  console.log(docData, "pep");

  const [peps, setPeps] = useState<PepI[]>([]);

  useEffect(() => {
    if (!docData) return;

    const b = docData;

    setPeps(
      b?.map((p: any) => ({
        id: p.id,
        name: p.name || "",
        position: p.position || "",
        pepStatusDescription: p.pepStatusDescription || "",
      })) || []
    );
  }, [docData]);

  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main flex items-center gap-1">
          Peps
          <FaCircleQuestion size={16} className="text-[#454745]" />
        </h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          We would like to know a bit about your peps
        </p>
      </div>

      {peps.map((pep, index) => (
        <div key={index} className="shadow-sm p-3 rounded-md mb-4">
          <div className="grid md:grid-cols-3 gap-5 ">
            <div>
              <label className="font-poppins font-semibold text-sm text-[#454745]">
                Name
              </label>
              <input
                name="name"
                value={pep.name}
                readOnly
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
              />
            </div>

            <div>
              <label className="font-poppins font-semibold text-sm text-[#454745]">
                Position
              </label>
              <input
                name="position"
                value={pep.position}
                readOnly
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
              />
            </div>

            <div>
              <label className="font-poppins font-semibold text-sm text-[#454745]">
                PEP Status Description
              </label>
              <input
                name="pepStatusDescription"
                value={pep.pepStatusDescription}
                readOnly
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PEPForm;
