import Image from "next/image";
import { IoMailOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" container px-3 md:px-5 md:pb-8 md:pt-14 lg:px-20 w-full  mt-10  lg:pt-28 lg:pb-14 mx-auto relative ">
      <div className="w-[350px] h-[350px] bg-main opacity-[0.2] blur-[35px] absolute bottom-0 right-0" />
      <div className="w-[350px] h-[350px] bg-main opacity-[0.2] blur-[35px] absolute top-0 left-0" />
      <div className=" ">
        <div className="flex items-center justify-between gap-2 border-b pb-5 flex-col md:flex-row">
          <div className="flex items-center gap-1 w-full md:w-[40%] ">
            <Image
              src="/images/shiftremit-logo.png"
              width={100}
              height={100}
              alt="shiftremit-logo"
              className="w-10 h-10 object-cover"
            />
            <div>
              <h1 className="text-xl font-poppins text-black font-semibold">
                Shift<span className="text-main">Remit</span>
              </h1>
              <p className="text-[8px] italic text-black font-dm-sans">
                Unbeatable Transfer Rates
              </p>
            </div>
          </div>

          <div className="flex items-center w-full lg:w-[60%] gap-3 flex-col lg:flex-row">
            <div className="whitespace-nowrap w-full">
              <p className="font-dm-sans text-xl font-semibold">
                Subscribe out newsletter
              </p>
              <p className="font-dm-sans text-sm ">We do not send spam email</p>
            </div>
            <div className="flex items-center pl-2 pr-1 h-10 py-1 gap-2 w-full rounded-full border border-[#d1d5db80]">
              <IoMailOutline size={20} />
              <input
                type="text"
                className="font-poppins w-full text-sm"
                placeholder="Enter your email"
              />
              <span className="bg-main py-2 text-white px-5 cursor-pointer rounded-full">
                <BsFillSendFill />
              </span>
            </div>
          </div>
        </div>

        <div className="border-b pb-5 flex justify-between w-full gap-2 my-10 flex-col md:flex-row">
          <div className="flex justify-between w-full md:w-8/10">
            {/* <div className="">
            <h1 className="text-black text-lg font-semibold font-dm-sans">
              Quick Links
            </h1>
            <ul className="text-[#454745] font-poppins mt-4 flex flex-col *:cursor-pointer gap-2">
              <li>Home</li>
              <li>Send Money</li>
              <li>Exchange</li>
            </ul>
          </div> */}
            <div className="">
              <h1 className="text-black text-lg font-semibold font-dm-sans">
                24/7 Support +44shiftremit | support@shiftremit.com
              </h1>
              {/* <ul className="text-[#454745] font-poppins mt-4 flex flex-col *:cursor-pointer gap-2">
                <li>Contact us</li>
                <li>About us</li>
                <li>Support</li>
              </ul> */}
            </div>
            {/* <div className="">
            <h1 className="text-black text-lg font-semibold font-dm-sans">
              Company
            </h1>
            <ul className="text-[#454745] font-poppins mt-4 flex flex-col *:cursor-pointer gap-2">
              <li>Track</li>
              <li>Blog</li>
              <li>Career</li>
            </ul>
          </div> */}
            {/* <div className="">
              <h1 className="text-black text-lg font-semibold font-dm-sans">
                Legal
              </h1>
              <ul className="text-[#454745] font-poppins mt-4 flex flex-col *:cursor-pointer gap-2">
                <li>Terms & conditions</li>
                <li>Privacy Policy</li>
                <li>Support</li>
              </ul>
            </div> */}
          </div>
          <div className="space-y-3">
            {/* <h1 className="font-dm-sans font-semibold">
              ShiftRemit mobile apps
            </h1>
            <div className="flex items-center gap-2">
              <img src="/images/appStore.png" className="h-[39px]" />
              <img src="/images/googlePlay.jpg" className="h-[39px]" />
            </div>
            <p className="font-dm-sans font-semibold">
              Find us on social media
            </p> */}
            <div className="*:cursor-pointer *:hover:text-main *:text-gray-500 *:w-4 *:h-4 flex items-center gap-4">
              <FaXTwitter />
              <FaFacebookF />
              <FaYoutube />
              <FaLinkedinIn />
              <FaInstagram />
            </div>
          </div>
        </div>

        <div>
          {/* <div>
            <p className="font-semibold font-dm-sans text-sm text-black">
              Disclaimer: Before Sending Money
            </p>
            <p className="text-[#454745] font-poppins text-sm py-3">
              Ensure that all recipient details, such as name, account number,
              and bank information, are accurate. Transfer Max will not be
              liable for transactions sent to incorrect accounts due to user
              error. Verify the exchange rate and any additional fees before
              confirming the transaction. Rates may vary, and fees are
              non-refundable once the transaction is processed. Be aware of your
              local laws and regulations regarding money transfers and foreign
              exchange. It is the sender’s responsibility to comply with
              applicable legal requirements.
            </p>
          </div> */}
          <div>
            <p className="font-semibold font-dm-sans text-sm text-black">
              Send Money Made Simple with ShiftRemit

            </p>
            <p className="text-[#454745] font-poppins text-sm py-3">
              ShiftRemit is built for one purpose: to make sending money from the UK to Nigeria simple, fast, and completely fee free.

              We believe sending money home should be effortless. That’s why our web platform gives you a secure, transparent, and straightforward way to move your funds without the hidden costs or long delays of traditional remittance services.

              With ShiftRemit, every transfer is clear from start to finish. You’ll see exactly how much your recipient will receive, and your payment reaches any Nigerian bank account in record time.

              Our system is designed around speed, reliability, and great value so you can send more and worry less.

              Most importantly, ShiftRemit is built by the people and for the people, powered by a robust technology infrastructure that puts community, transparency, and trust at the heart of every transaction.

              Stay connected to the people and opportunities that matter most.
              Choose ShiftRemit, the smart, fee free way to send money to Nigeria.
            </p>
          </div>
        </div>

        <div>

          <div className="mb-5">
            <h1 className="font-semibold font-dm-sans text-sm text-black">
              Legal
            </h1>
            <ul className="text-[#454745] font-poppins mt-4 flex flex-wrap flex-row *:cursor-pointer gap-2">
              <li className="md:border-r-2 pe-3 me-2">Terms & conditions</li>
              <li className="md:border-r-2 pe-3 me-2">Privacy Policy</li>
              <li className="">Partner Account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
