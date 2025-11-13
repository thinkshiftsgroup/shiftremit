import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface PurposeModalProps {
  openPurpose: boolean;
  setOpenPurpose: (open: boolean) => void;
  purpose: string;
  onUpdatePurpose: (updatedPurpose: string) => void;
  isUpdating?: boolean; // 👈 added prop to control loader
}

const PurposeModal = ({
  openPurpose,
  setOpenPurpose,
  purpose,
  onUpdatePurpose,
  isUpdating = false,
}: PurposeModalProps) => {
  const [localPurpose, setLocalPurpose] = useState(purpose);

  useEffect(() => {
    setLocalPurpose(purpose);
  }, [purpose]);

  const handleSave = () => {
    if (!localPurpose.trim()) return;
    onUpdatePurpose(localPurpose);
    
  };

  return (
    <Dialog open={openPurpose} onOpenChange={setOpenPurpose}>
      <DialogContent className="max-w-md rounded-xl p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="font-poppins text-lg font-semibold">
            Purpose
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm font-poppins">
          <textarea
            className="border rounded-md w-full p-3 outline-none text-sm font-poppins focus:border-main transition"
            placeholder="Write purpose here..."
            rows={4}
            value={localPurpose}
            onChange={(e) => setLocalPurpose(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpenPurpose(false)}
            className="font-poppins"
            disabled={isUpdating}
          >
            Cancel
          </Button>

          <Button
            className="bg-main text-white font-poppins flex items-center gap-2"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurposeModal;
