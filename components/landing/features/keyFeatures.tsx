"use client";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  const cardDetails = [
    {
      image: "/images/send.png",
      title: "Send Money",
      description:
        "Effortlessly send, swap and exchange currencies with secure, fast and seamless multi-currency transactions online",
    },
    {
      image: "/images/stake.png",
      title: "Request Money",
      description:
        "Keep more of your money with low transaction fees. Our platform offers affordable rates to make transferring funds easier",
    },
    {
      image: "/images/trade.png",
      title: "Live Rates",
      description:
        "Engage in live trading with real-time insights, dynamic strategies, and profitable opportunities in every move",
    },
  ];

  return (
    <div className="container py-24 px-20 mx-auto relative ">
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
            Key Features
          </span>
        </div>

        <h1 className="font-dm-sans text-center text-[#072032] font-bold text-4xl">
          Money Transfer at your fingertips
        </h1>
        <div className="font-poppins max-w-2xl mx-auto text-center text-[#454745] mb-10">
          <p>
            Experience the convinience of fast, reliable transfers at any time,
            from any device. Empower your finances with seamless trasactions
            right at your fingertips
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between gap-5 mt-20 mb-5"
      >
        {cardDetails.map((card, index) => {
          return (
            <div
              key={index}
              className="bg-white relative p-6 border border-[#d1d5db80] rounded-[12px] flex flex-col gap-2.5 items-center justify-between transition-all duration-300 hover:border-main hover:-translate-y-1"
            >
              <div className="bg-[#f1f5f9] w-[75px] h-[75px] flex items-center justify-center rounded-full">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-[50px] h-[50px]"
                />
              </div>
              <h1 className="font-dm-sans text-lg text-[#0720432] font-semibold">
                {card.title}
              </h1>
              <p className="text-[#454745] text-center font-dm-sans text-sm">
                {card.description}
              </p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
