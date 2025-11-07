import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PurposeModal = ({ openPurpose, setOpenPurpose }: any) => {
  return (
    <Dialog open={openPurpose} onOpenChange={setOpenPurpose}>
      <DialogContent className="max-w-md rounded-xl p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="font-poppins text-lg font-semibold">
            Purpose
          </DialogTitle>
        </DialogHeader>
        {/* <div className="space-y-3 text-sm font-poppins">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab libero
            molestiae ea quisquam, voluptate iusto voluptatum recusandae
            pariatur tenetur esse modi atque possimus porro corrupti asperiores
            rerum aliquid sequi laborum.
          </p>
        </div> */}

        <div className="space-y-3 text-sm font-poppins">
          <p className="text-gray-600">
            Purpose
          </p>

          <textarea
            className="border rounded-md w-full p-3 outline-none text-sm font-poppins focus:border-main transition"
            placeholder="Write purpose here..."
            rows={4}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpenPurpose(false)}
            className="font-poppins"
          >
            Cancel
          </Button>

          <Button className="bg-main text-white font-poppins">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurposeModal;
