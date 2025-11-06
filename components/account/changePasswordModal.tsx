"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const ChangePassword = ({ openPassword, setOpenPassword }: any) => {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
    oldPassword: false,
  });

  return (
    <Dialog open={openPassword} onOpenChange={setOpenPassword}>
      <DialogContent className="max-w-xl rounded-xl p-6 space-y-4">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="font-poppins text-lg font-semibold">
            Update Password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm font-poppins">
          <div className="space-y-3">
            <label
              htmlFor="password"
              className="font-poppins font-semibold text-sm "
            >
              Old Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={show.oldPassword ? "text" : "password"}
                // value={form.password}
                // onChange={handleChange}
                placeholder="Enter Old password"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-2 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
              {show.oldPassword ? (
                <IoEyeOffOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, oldPassword: false }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              ) : (
                <IoEyeOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, oldPassword: true }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              )}
            </div>
          </div>
          <div className="space-y-3">
            <label
              htmlFor="password"
              className="font-poppins font-semibold text-sm "
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={show.password ? "text" : "password"}
                // value={form.password}
                // onChange={handleChange}
                placeholder="Enter Password"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-2 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
              {show.password ? (
                <IoEyeOffOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, password: false }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              ) : (
                <IoEyeOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, password: true }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="confirmPassword"
              className="font-poppins font-semibold text-sm "
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={show.confirmPassword ? "text" : "password"}
                // value={form.confirmPassword}
                // onChange={handleChange}
                placeholder="Enter Confirm Password"
                className="font-poppins text-sm bg-[#fafbfe] w-full indent-2 mt-2 py-3 px-2 rounded-sm border shadow-sm"
                required
              />
              {show.confirmPassword ? (
                <IoEyeOffOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, confirmPassword: false }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              ) : (
                <IoEyeOutline
                  onClick={() =>
                    setShow((prev) => ({ ...prev, confirmPassword: true }))
                  }
                  className="absolute top-[26px] cursor-pointer right-3 text-[#858484]"
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          {/* <Button
            variant="outline"
            onClick={() => setOpenPassword(false)}
            className="font-poppins"
          >
            Cancel
          </Button> */}

          <Button className="bg-main text-white font-poppins">Update Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
