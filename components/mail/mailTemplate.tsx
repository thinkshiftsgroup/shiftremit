import { FileText, Heart, Rocket } from 'lucide-react';
import Link from 'next/link';

import Image from "next/image";

interface WithdrawalData {
    no: number;
    payoutId: string;
    user: string;
    amount: string;
    method: string;
}

const withdrawalData: WithdrawalData[] = [
    { no: 1, payoutId: '#SLIPPRANK3', user: 'Victor Odolofin - LUXE GODHEAD', amount: '₦63,000.00', method: 'shiftremit' },
    { no: 2,payoutId: '#SLIPIY0FWK', user: 'Onifade-Esan Modupeola Bolaji', amount: '₦383,150.00', method: 'shiftremit' },
    { no: 3,payoutId: '#SLIIPIX2FOK', user: 'Victor Odolofin - LUXE GODHEAD', amount: '₦62,000.00', method: 'shiftremit' },
];

export default function MailTemplate() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#813FD6] to-[#301342] p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-lg shadow-2xl overflow-hidden">
                {/* Header with Logo */}
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

                    <p className="text-gray-700 text-base md:text-lg">Dear Admin,</p>
                    <p className="text-gray-600 text-base md:text-lg mt-4">
                        This is to inform you that <span className="font-semibold">3 Invoice withdrawal(s)</span> have been successfully processed.
                    </p>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-8">
                    {/* Processing Summary */}
                    <div className="mb-8">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Processing Summary</h2>
                        <div className="bg-gray-50 rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-around gap-6">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">3</div>
                                <p className="text-gray-600 text-sm md:text-base">Successful</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">0</div>
                                <p className="text-gray-600 text-sm md:text-base">Failed</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Withdrawals Overview */}
                    <div className="mb-8">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Recent Withdrawals Overview</h2>
                        {/* <div className="overflow-x-auto">
                            <table className="w-full text-sm md:text-base">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-3 px-3 md:px-4 font-semibold text-gray-700">Payout ID</th>
                                        <th className="text-left py-3 px-3 md:px-4 font-semibold text-gray-700 hidden md:table-cell">User</th>
                                        <th className="text-left py-3 px-3 md:px-4 font-semibold text-gray-700">Amount</th>
                                        <th className="text-left py-3 px-3 md:px-4 font-semibold text-gray-700">Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {withdrawalData.map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-3 md:px-4 font-mono text-blue-600">{row.payoutId}</td>
                                            <td className="py-4 px-3 md:px-4 hidden md:table-cell text-gray-700">{row.user}</td>
                                            <td className="py-4 px-3 md:px-4 font-semibold text-gray-900">{row.amount}</td>
                                            <td className="py-4 px-3 md:px-4 text-gray-600">{row.method}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> */}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-max border-collapse">
                                <thead>
                                    <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                                        <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Payout ID</th>
                                        <th className="px-4 py-2.5 font-semibold whitespace-nowrap">User</th>
                                        <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Amount</th>
                                        <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Method</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {withdrawalData.map((row, idx) => (
                                        <tr
                                            key={row.no}
                                            className={`${idx % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                                                } border-b border-gray-100 hover:bg-gray-50`}
                                        >
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                {row.payoutId}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {row.user}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {row.amount}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {row.method}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Processing Details */}
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-4">Processing Details:</h3>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base ms-4">
                            <li className="flex gap-3">
                                <span className="font-semibold min-w-fit">Withdrawal Type:</span>
                                <span>Invoice withdrawals</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-semibold min-w-fit">Total Processed:</span>
                                <span>3 withdrawal(s)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-semibold min-w-fit">Failed Attempts:</span>
                                <span>0 withdrawal(s)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-semibold min-w-fit">Processing Date:</span>
                                <span>2025-11-04 09:45:10</span>
                            </li>
                        </ul>
                    </div>

                    {/* Info Box */}
                    <div className="bg-[#fbf6ff] border-l-4 border-[#d4a8f9] p-4 md:p-6 mb-8 rounded">
                        <div className="flex gap-3">
                            <FileText className="text-[#c991f6] shrink-0" size={20} />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Detailed Report Attached</h4>
                                <p className="text-gray-700 text-sm md:text-base">
                                    A comprehensive PDF report with complete withdrawal details is attached to this email for your records and review.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 text-sm md:text-base mb-8">
                        Please review the attached PDF document for complete transaction details.
                    </p>

                    {/* Signature */}
                    <div className="mb-8">
                        <p className="text-gray-700 text-sm md:text-base">Best regards,</p>
                        <p className="text-gray-700 font-semibold text-sm md:text-base">Payment Processing System</p>
                    </div>

                    {/* Footer Message */}
                    <div className="mb-8">
                        <p className="text-sm md:text-base mb-2">
                            <span className="text-lg">❤️🚀</span> Always,
                        </p>
                        <p className="text-gray-700 text-sm md:text-base font-semibold">Your friends at ShiftRemit</p>
                    </div>

                    {/* Links */}
                    <div className="mb-8 space-y-2">
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm md:text-base">
                            🌐 shiftremit.com
                        </p>
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm md:text-base">
                            Unbeatable Transfer Rate
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 pt-6 text-gray-600 text-xs md:text-sm space-y-2">
                        <p>© 2024 - 2025 ShiftRemit Limited. All Rights Reserved.</p>
                        <p>
                            <span className="hover:underline cursor-pointer">Privacy Policy</span> ·
                            <span className="hover:underline cursor-pointer"> Terms of Use</span> ·
                            <span className="hover:underline cursor-pointer"> Payouts</span>
                        </p>
                        <p>
                            Follow us on
                            <span className="hover:underline cursor-pointer"> Instagram,</span>
                            <span className="hover:underline cursor-pointer"> Youtube,</span>
                            <span className="hover:underline cursor-pointer"> LinkedIn,</span>
                            <span className="hover:underline cursor-pointer"> Facebook,</span>
                            <span className="hover:underline cursor-pointer"> Twitter (X),</span>
                            <span className="hover:underline cursor-pointer"> TikTok</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 p-6 md:p-8 flex flex-col sm:flex-row gap-3 justify-center border-t border-gray-200">
                    <button className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition">
                        ← Reply
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition">
                        → Forward
                    </button>
                    <button className="w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 transition flex items-center justify-center">
                        😊
                    </button>
                </div>
            </div>
        </div>
    );
}