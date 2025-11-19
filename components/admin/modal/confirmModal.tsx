import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean; // <- new prop
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed font-poppins inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-5 w-80 shadow-lg text-center">
        {title && <h2 className="font-semibold mb-3 text-lg">{title}</h2>}
        <p>{message}</p>
        <div className="flex gap-2 justify-between mt-4">
          <button
            className="px-4 py-2 w-full bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 w-full bg-main text-white rounded-md flex items-center justify-center gap-2"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
