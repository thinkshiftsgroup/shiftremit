import { useState } from 'react';

export default function LearnMoreModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="mb-8">
                <p className="text-lg">
                    Rates updated 1 - 2 hours ago{' '}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-[#813FD6] underline font-medium cursor-pointer"
                    >
                        Learn more
                    </button>
                </p>
            </div>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                    {/* Modal Content */}
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Learn more about rate comparison
                        </h2>

                        <div className="space-y-4 text-gray-700 mb-8">
                            <p className="leading-relaxed">
                                Rates are accurate at the time of publication and sourced from publicly available information, including the websites of the providers listed. Please note that some providers may charge an additional fee which is not reflected in the rates displayed. This comparison is intended to offer a general overview only.
                            </p>

                            <p className="leading-relaxed">
                                We strive to keep the information up to date and accurate, but please check directly with each provider for the most current information. Any mention of a company, product, or service is for reference only and does not imply any endorsement, partnership, or affiliation. All trademarks and brand names remain the property of their respective owners.
                            </p>
                        </div>

                        {/* Done Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-linear-to-l from-[#813FD6] to-[#301342] text-white font-semibold py-3 px-4 rounded transition-colors duration-200"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}