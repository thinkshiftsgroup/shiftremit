"use client";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  const cardDetails = [
    {
      image: "/images/send-2.png",
      title: "Send Money",
      description:
        "Send money home instantly, securely, and with complete peace of mind. ShiftRemit makes international transfers simple and transparent — with no transaction fees and no hidden charges.",
    },
    {
      image: "/images/stake-2.png",
      title: "Request Money",
      description:
        "Receive funds effortlessly from anyone in the UK. Share your unique link or partner code to request money, and have it delivered directly to your bank account — fast, reliable, and fee-free.",
    },
    {
      image: "/images/trade-2.png",
      title: "Live Rates",
      description:
        "Stay informed with real-time exchange rates and full transparency on what your recipient will receive before you send. With ShiftRemit, there are no surprises — just fair, honest rates every time.",
    },
  ];

  return (
    <div className="container py-14 px-3 lg:py-24 lg:px-20 mx-auto relative ">
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
            Experience the convenience of fast, reliable transfers anytime, from any device.
            Send money for business, family, friends, investments, and everything else that matters — with seamless transactions and great daily FX rates right at your fingertips.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between md:justify-center gap-5 mt-10 md:mt-15 lg:mt-20 mb-5 flex-col md:flex-wrap lg:flex-nowrap md:flex-row"
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
