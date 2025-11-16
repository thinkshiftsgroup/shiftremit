// components/ui/ConfirmModal.tsx
"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  loading?: boolean;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  loading = false,
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-md p-6 w-[90%] max-w-sm shadow-lg"
      >
        <p className="font-poppins text-sm text-[#454745] mb-5">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-3 py-1 text-sm rounded border border-gray-300 font-poppins disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-1 text-sm rounded bg-red-600 text-white font-poppins justify-center flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
