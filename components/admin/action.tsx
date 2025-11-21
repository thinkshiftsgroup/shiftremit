"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import ReactDOM from "react-dom";
import { FaGear } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import ConfirmationModal from "./modal/confirmModal";

interface ActionDropDownProps {
  onPreview: () => void;
  onStatusChange: (status: "APPROVED" | "REJECTED") => Promise<void> | void;
  disableApprove?: boolean;
  disableReject?: boolean;
}

const ActionDropDown: React.FC<ActionDropDownProps> = ({
  onPreview,
  onStatusChange,
  disableApprove,
  disableReject,
}) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    action: "APPROVED" | "REJECTED" | "";
  }>({ open: false, action: "" });

  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleButtonClick = () => {
    if (buttonRef.current)
      setButtonRect(buttonRef.current.getBoundingClientRect());
    setOpenDrop((prev) => !prev);
  };

  const handleActionClick = (action: "APPROVED" | "REJECTED") => {
    if (
      (action === "APPROVED" && disableApprove) ||
      (action === "REJECTED" && disableReject)
    )
      return;
    setConfirmModal({ open: true, action });
    setOpenDrop(false);
  };

  const handleConfirm = async () => {
    if (!confirmModal.action) return;
    try {
      setLoading(true);
      await onStatusChange(confirmModal.action);
    } finally {
      setLoading(false);
      setConfirmModal({ open: false, action: "" });
    }
  };

  const handleCancel = () => setConfirmModal({ open: false, action: "" });

  const getActionMessage = () => {
    if (confirmModal.action === "APPROVED")
      return "Are you sure you want to approve this document?";
    if (confirmModal.action === "REJECTED")
      return "Are you sure you want to reject this document?";
    return "Confirm this action?";
  };

  const dropdownContent =
    openDrop &&
    buttonRect &&
    ReactDOM.createPortal(
      <div
        ref={dropdownRef}
        className="absolute z-50 whitespace-nowrap rounded-md bg-white border border-gray-200 shadow-lg"
        style={{
          top: buttonRect.bottom + window.scrollY,
          left: buttonRect.left + window.scrollX,
          minWidth: buttonRect.width,
        }}
      >
        {/* View File */}
        <div
          onClick={() => {
            onPreview();
            setOpenDrop(false);
          }}
          className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors cursor-pointer"
        >
         <FaRegEye size={16} className="flex-none" />
          View File
        </div>
        <hr />
        <div
          onClick={() => handleActionClick("APPROVED")}
          className={`text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 transition-colors cursor-pointer ${
            disableApprove
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <FaCheckCircle size={14} className="flex-none"/> Approve
        </div>
        <div
          onClick={() => handleActionClick("REJECTED")}
          className={`text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 transition-colors cursor-pointer ${
            disableReject
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <TiCancel size={16} className="flex-none"/> Reject
        </div>
      </div>,
      document.body
    );

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="flex items-center relative rounded bg-gray-100 hover:bg-gray-300 cursor-pointer p-1 px-2"
      >
        <FaGear size={16} />
        Action
      </button>

      {dropdownContent}

      <ConfirmationModal
        open={confirmModal.open}
        title={confirmModal.action === "APPROVED" ? "Approve" : "Reject"}
        message={getActionMessage()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={loading ? "Processing..." : "Yes"}
        cancelText="Cancel"
      />
    </div>
  );
};

export default ActionDropDown;
