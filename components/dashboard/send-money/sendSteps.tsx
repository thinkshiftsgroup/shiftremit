"use client";
import React from "react";

const SendSteps = ({ step }: { step: number }) => {
  const steps = [
    { id: 1, label: "Amount" },
    { id: 2, label: "Recipient" },
    { id: 3, label: "Fund" },
  ];

  return (
    <div className="flex px-2.5 py-4 md:py-3.5 md:px-10 border-b items-center justify-between gap-6">
      {steps.map((item) => {
        const isCompleted = step > item.id;
        const isActive = step === item.id;

        return (
          <div key={item.id} className="flex items-center gap-2">
            {isCompleted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="text-main"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <p className="w-6 h-6 p-1 rounded-full flex items-center justify-center font-semibold font-poppins bg-[#e2e8f0]">
                {item.id}
              </p>
            )}
            <p
              className={`font-poppins text-sm font-medium 
              ${isActive ? "text-black" : "text-[#454745]"}`}
            >
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SendSteps;
