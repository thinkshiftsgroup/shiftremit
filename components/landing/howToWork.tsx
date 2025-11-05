"use client";
import { motion } from "framer-motion";
import { BsPersonCheck } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";

const HowToWork = () => {
  return (
    <div className="container px-3 md:px-5 lg:py-10 lg:px-20 mx-auto relative ">
      <div className="w-[350px] h-[350px] bg-main opacity-[0.2] blur-[35px] absolute bottom-0 right-0" />
      <div className="w-[350px] h-[350px] bg-main opacity-[0.2] blur-[35px] absolute top-0 left-0" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <div className=" w-full flex justify-center">
          <span className="rounded-full mx-auto border border-main text-main font-poppins text-sm px-3.5 py-0.5">
            How to Work
          </span>
        </div>

        <h1 className="font-dm-sans text-center text-[#072032] font-bold text-4xl">
          How to Send Money
        </h1>
        <div className="font-poppins max-w-2xl mx-auto text-center text-[#454745] mb-10">
          <p>
            Send money effortlessly! Create and verify your account, add a
            recipient, enter the amount, and track your transfer—all in one
            secure platform.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-start relative justify-between gap-5 mt-20 mb-5 flex-col lg:flex-row"
      >
        <div className="relative flex flex-col gap-2.5 items-center justify-between transition-all duration-300  hover:-translate-y-1 mx-3">
          <div className="bg-main w-[75px] text-white h-[75px] flex items-center justify-center rounded-md">
            <BsPersonCheck size={40} />
          </div>
          <h1 className="font-dm-sans text-lg text-[#0720432] font-semibold">
            Create and verify your account
          </h1>
          <p className="text-[#454745] text-center text-base font-poppins">
            Start by creating an account and completing the verification
            process. This ensures secure and seamless money transfers.
          </p>
        </div>
        {/* <div className="flex absolute items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-main" />
            <div className="w-full h-0.5 bg-black" />
            <div className="w-5 h-5 rounded-full bg-main" />
        </div> */}
        <div className="relative flex flex-col gap-2.5 items-center justify-between transition-all duration-300  hover:-translate-y-1 mx-3">
          <div className="bg-[#3fc3ff] w-[75px] text-white h-[75px] flex items-center justify-center rounded-md">
            <BsReceipt size={40} />
          </div>
          <h1 className="font-dm-sans text-lg text-[#0720432] font-semibold">
            Add recipient
          </h1>
          <p className="text-[#454745] text-center text-base font-poppins">
            Add your recipient’s details, like their contact information or bank
            account, to ensure your funds reach the right person.
          </p>
        </div>
        <div className="relative flex flex-col gap-2.5 items-center justify-between transition-all duration-300  hover:-translate-y-1 mx-3">
          <div className="bg-[#ff3fff] w-[75px] text-white h-[75px] flex items-center justify-center rounded-md">
            <BiTransfer size={40} />
          </div>
          <h1 className="font-dm-sans text-lg text-[#0720432] font-semibold">
            Enter amount to transfer
          </h1>
          <p className="text-[#454745] text-center text-base font-poppins">
            Input the exact amount you wish to send. Confirm any fees or
            exchange rates to see the total transfer cost.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToWork;
