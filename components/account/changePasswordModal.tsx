"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiInstance from "@/api/apiInstance";
import { toast } from "sonner";
import { usePassword } from "@/hooks/usePassword";

const ChangePassword = ({ openPassword, setOpenPassword }: any) => {
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
    oldPassword: false,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { updatePassword } = usePassword();

  return (
    <Dialog open={openPassword} onOpenChange={setOpenPassword}>
      <DialogContent className="max-w-xl rounded-xl p-6 space-y-4">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="font-poppins text-lg font-semibold">
            Update Password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm font-poppins">
          {/* Old Password */}
          <div className="space-y-3">
            <label className="font-poppins font-semibold text-sm text-[#454745] ">
              Old Password
            </label>
            <div className="relative">
              <input
                name="oldPassword"
                type={show.oldPassword ? "text" : "password"}
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
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

          {/* New Password */}
          <div className="space-y-3">
            <label className="font-poppins font-semibold text-sm text-[#454745] ">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={show.password ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
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

          {/* Confirm Password */}
          <div className="space-y-3">
            <label className="font-poppins font-semibold text-sm text-[#454745] ">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={show.confirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Enter confirm password"
                className="font-poppins text-sm w-full indent-2 mt-2 py-3 px-2 rounded-sm border border-[#d1d5db80] text-[#454745]
focus:border-main focus:outline-none transition-colors"
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
          <Button
            className="bg-main text-white font-poppins"
            onClick={() =>
              updatePassword.mutate(
                {
                  oldPassword: form.oldPassword,
                  newPassword: form.password,
                },
                {
                  onSuccess: () => {
                    toast.success("Password updated successfully!");
                    setOpenPassword(false);
                  },
                }
              )
            }
            disabled={
              updatePassword.isPending ||
              !form.oldPassword ||
              !form.password ||
              !form.confirmPassword ||
              form.password !== form.confirmPassword
            }
          >
            {updatePassword.isPending ? "Updating..." : "Update Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
