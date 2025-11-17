import { useProfile } from "@/app/(authenticatedRoute)/(general)/account/useProfile";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { toast } from "sonner";
import ConfirmModal from "../modal/deleteModal";

interface PepProps {
  fetchBusinessProfile: UseQueryResult<any>;
}

interface PepI {
  id?: string;
  name: string;
  position: string;
  pepStatusDescription: string;
}
const PEPForm: React.FC<PepProps> = ({ fetchBusinessProfile }) => {
  const { updatePEP, deletePEP } = useProfile();
  const [peps, setPeps] = useState<PepI[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const handlePepChange = (index: number, field: string, value: string) => {
    setPeps((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  useEffect(() => {
    if (!fetchBusinessProfile.data) return;

    const b = fetchBusinessProfile.data;

    setPeps(
      b.peps?.map((p: any) => ({
        id: p.id,
        name: p.name || "",
        position: p.position || "",
        pepStatusDescription: p.pepStatusDescription || "",
      })) || []
    );
  }, [fetchBusinessProfile.data]);

  const addNewPep = () => {
    setPeps((prev) => [
      ...prev,
      { name: "", position: "", pepStatusDescription: "" },
    ]);
  };

  const deletePep = (index: number) => {
    setPeps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAndAddAnother = async () => {
    const lastPep = peps[peps.length - 1];

    if (!lastPep.name || !lastPep.position || !lastPep.pepStatusDescription) {
      toast.error("Please fill all fields before saving.");
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePEP.mutateAsync([lastPep]);

      setPeps((prev) => [
        ...prev,
        { name: "", position: "", pepStatusDescription: "" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [pepDelId, setPepDelId] = useState<null | string>(null);
  const handleDeletePep = async (index: number) => {
    const pep = peps[index];

    if (!pep.id) {
      setPeps((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    setIsSubmitting(true);
    setPepDelId(pep.id);
    try {
      await deletePEP.mutateAsync({ id: pep.id });
      toast.success("PEP deleted successfully!");
      setPeps((prev) => prev.filter((_, i) => i !== index));
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to delete PEP");
    } finally {
      setIsSubmitting(false);
      setPepDelId(null);
    }
  };

  const handleSubmitAll = async () => {
    if (peps.some((p) => !p.name || !p.position || !p.pepStatusDescription)) {
      toast.error("Please ensure all PEP entries are fully filled.");
      return;
    }

    setIsSubmitting(true);

    await updatePEP.mutateAsync(peps).finally(() => {
      setIsSubmitting(false);
    });
  };

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

      <button
        className="font-poppins my-3 text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm bg-main/30"
        onClick={addNewPep}
      >
        Add Another PEP +
      </button>

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
                onChange={(e) => handlePepChange(index, "name", e.target.value)}
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
                onChange={(e) =>
                  handlePepChange(index, "position", e.target.value)
                }
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
                onChange={(e) =>
                  handlePepChange(index, "pepStatusDescription", e.target.value)
                }
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setPendingIndex(index);
                setShowDeleteModal(true);
              }}
              className="text-white mt-2 justify-center font-poppins py-1.5 px-4 font-medium rounded-[6px] cursor-pointer bg-linear-to-l from-[#813FD6] flex items-center gap-1 to-[#301342]"
            >
              {deletePEP.isPending && pep.id === pepDelId ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      ))}

      <hr className="my-4" />
      {/* <button
        onClick={handleSaveAndAddAnother}
        disabled={isSubmitting}
        className="font-poppins text-sm border border-main-dark-II text-main-dark-II bg-main/30 p-2 rounded-sm disabled:bg-[#e6e5e5]"
      >
        {isSubmitting ? "Saving..." : "Save and Add Another PEP +"}
      </button> */}

      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <button
          onClick={handleSubmitAll}
          disabled={isSubmitting}
          className="font-poppins text-sm border border-main-dark-II text-main-dark-II p-2 rounded-sm bg-main/30"
        >
          {isSubmitting ? "Submitting..." : "I'm Done Adding PEP"}
        </button>
      </div>
      <ConfirmModal
        open={showDeleteModal}
        message="Are you sure you want to delete this PEP?"
        confirmText={deletePEP.isPending ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        onCancel={() => {
          setShowDeleteModal(false);
          setPendingIndex(null);
        }}
        onConfirm={async () => {
          if (pendingIndex === null) return;

          await handleDeletePep(pendingIndex);

          setShowDeleteModal(false);
          setPendingIndex(null);
        }}
      />
    </div>
  );
};

export default PEPForm;
