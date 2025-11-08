import { FileText, Heart, Rocket } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

interface WithdrawalData {
  no: number;
  payoutId: string;
  user: string;
  amount: string;
  method: string;
}

const withdrawalData: WithdrawalData[] = [
  {
    no: 1,
    payoutId: "SR276483",
    user: "John Paul",
    amount: "₦11,567,910",
    method: "Wema Bank (Musa Tanko)",
  },
];

const processingDate = new Date().toISOString().slice(0, 19).replace("T", " ");

export default function MailTemplate() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#813FD6] to-[#301342] p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-white p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/images/shiftremit-logo.png"
                  width={100}
                  height={100}
                  alt="shiftremit-logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-cover cursor-pointer"
                />
              </Link>
              <div>
                <h1 className="text-lg md:text-2xl font-bold font-poppins text-black leading-4 lg:leading-5">
                  Shift<span className="text-main">Remit</span>
                </h1>
                <p className="text-sm md:text-xs font-normal text-black font-dm-sans leading-4 lg:leading-5">
                  Unbeatable Transfer Rates
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-base md:text-lg">Dear Samuel,</p>
          <p className="text-gray-600 text-base md:text-lg mt-4">
            This is to confirm that the transfer instruction with{" "}
            <span className="font-semibold">Reference: SR276483</span> has been{" "}
            <span className="font-bold text-green-600">
              successfully processed
            </span>{" "}
            and disbursed to the recipient.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
              Processing Summary (Transfer Ref: SR276483)
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-around gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">
                  1
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Successful Transfer
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  0
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Failed Attempts
                </p>
              </div>
            </div>
          </div> */}

          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Transfer Overview
            </h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-max border-collapse">
                <thead>
                  <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                    <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                      Reference
                    </th>
                    <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                      Sender
                    </th>
                    <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                      NGN Amount
                    </th>
                    <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                      Recipient Bank
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {withdrawalData.map((row, idx) => (
                    <tr
                      key={row.no}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                      } border-b border-gray-100 hover:bg-gray-50`}
                    >
                      <td className="px-4 py-2 font-medium text-gray-900">
                        {row.payoutId}
                      </td>
                      <td className="px-4 py-2 text-gray-700">{row.user}</td>
                      <td className="px-4 py-2 text-gray-700">{row.amount}</td>
                      <td className="px-4 py-2 text-gray-700">{row.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Transfer Details:</h3>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base ms-4">
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">
                  Transfer Reference:
                </span>
                <span>SR276483</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">
                  Amount Received (GBP):
                </span>
                <span>£5,955</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">
                  Exchange Rate Used:
                </span>
                <span>£1 = ₦1,942</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">
                  Equivalent Amount (NGN):
                </span>
                <span>₦11,567,910</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">
                  Recipient Account:
                </span>
                <span>Musa Tanko (Wema Bank - 28893290904)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">Processed Date:</span>
                <span>{processingDate}</span>
              </li>
            </ul>
          </div>

          {/* <div className="bg-[#fbf6ff] border-l-4 border-[#d4a8f9] p-4 md:p-6 mb-8 rounded">
            <div className="flex gap-3">
              <FileText className="text-[#c991f6] shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">
                  Confirmation Required
                </h4>
                <p className="text-gray-700 text-sm md:text-base">
                  Please process this transfer and send **INSTANT confirmation**
                  once the Naira transfer has been successfully completed.
                </p>
              </div>
            </div>
          </div> */}

          {/* <p className="text-gray-700 text-sm md:text-base mb-8">
            Thank you for your prompt action on this instruction.
          </p> */}

          <div className="mb-8">
            <p className="text-gray-700 text-sm md:text-base">Thank you,</p>
            <p className="text-gray-700 font-semibold text-sm md:text-base">
              ShiftRemit Operations Team
            </p>
          </div>

          {/* <div className="mb-8">
            <p className="text-sm md:text-base mb-2">
              <span className="text-lg">❤️🚀</span> Unbeatable,
            </p>
            <p className="text-gray-700 text-sm md:text-base font-semibold">
              Your friends at ShiftRemit
            </p>
          </div> */}

          <div className="mb-8 space-y-2">
            <p className="text-blue-600 hover:underline cursor-pointer text-sm md:text-base">
              📧 support@shiftremit.com
            </p>
            <p className="text-blue-600 hover:underline cursor-pointer text-sm md:text-base">
              🌐 www.shiftremit.com
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 text-gray-600 text-xs md:text-sm space-y-2">
            <p>© 2024 - 2025 ShiftRemit Limited. All Rights Reserved.</p>
            <p>
              <span className="hover:underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              ·
              <span className="hover:underline cursor-pointer">
                {" "}
                Terms of Use
              </span>{" "}
              ·<span className="hover:underline cursor-pointer"> Payouts</span>
            </p>
            <p>
              Follow us on
              <span className="hover:underline cursor-pointer">
                {" "}
                Instagram,
              </span>
              <span className="hover:underline cursor-pointer"> Youtube,</span>
              <span className="hover:underline cursor-pointer"> LinkedIn,</span>
              <span className="hover:underline cursor-pointer"> Facebook,</span>
              <span className="hover:underline cursor-pointer">
                {" "}
                Twitter (X),
              </span>
              <span className="hover:underline cursor-pointer"> TikTok</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
