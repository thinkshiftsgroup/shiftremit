"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import ReactDOM from "react-dom";

const ActionDropDown = () => {
    const [openDrop, setOpenDrop] = useState(false);
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
    const [confirmModal, setConfirmModal] = useState<{ open: boolean; action: string }>({
        open: false,
        action: "",
    });
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        if (buttonRef.current) {
            setButtonRect(buttonRef.current.getBoundingClientRect());
        }
        setOpenDrop((prev) => !prev);
    };

    const handleActionClick = (action: string) => {
        setConfirmModal({ open: true, action });
        setOpenDrop(false);
    };

    const handleConfirm = () => {
        console.log(`${confirmModal.action} confirmed`);
        setConfirmModal({ open: false, action: "" });
    };

    const handleCancel = () => {
        setConfirmModal({ open: false, action: "" });
    };

    const getActionMessage = () => {
        switch (confirmModal.action) {
            case "delete":
                return "Are you sure you want to delete this item?";
            case "remove":
                return "Are you sure you want to remove this item?";
            case "view":
                return "View this item?";
            default:
                return "Confirm this action?";
        }
    };

    const dropdownContent = openDrop && buttonRect && ReactDOM.createPortal(
        <div
            ref={dropdownRef}
            className="fixed z-50 w-40 rounded-md bg-white border border-gray-200 shadow-lg"
            style={{
                top: `${buttonRect.bottom + 8}px`,
                right: `${window.innerWidth - buttonRect.right}px`,
            }}
        >
            <div
                onClick={() => handleActionClick("view")}
                className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" strokeWidth={0.5} stroke="currentColor"></path>
                </svg> View New
            </div>
            <div
                onClick={() => handleActionClick("remove")}
                className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64" strokeWidth={25.5} stroke="currentColor"></path>
                    <path fill="currentColor" d="M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896" strokeWidth={25.5} stroke="currentColor"></path>
                </svg>
                Remove
            </div>
            <hr />
            <div className="text-[#454745] font-poppins text-sm flex items-center gap-2 py-1.5 px-3.5 hover:bg-gray-100 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z" strokeWidth={0.5} stroke="currentColor"></path>
                </svg> Delete
            </div>
        </div>,
        document.body
    );

    return (
        <div>
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className="flex items-center rounded bg-gray-100 hover:bg-gray-300 cursor-pointer p-1 px-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={26}
                    height={26}
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
                        strokeWidth={0.5}
                        stroke="currentColor"
                    ></path>
                </svg>
                <span className="ml-1">Action</span>
            </button>
            {dropdownContent}
        </div>
    );
};

export default ActionDropDown;