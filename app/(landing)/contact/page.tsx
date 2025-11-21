"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const router = useRouter();

  return (
    <div>
      <main className="min-h-screen font-poppins bg-gray-50 p-6 md:p-12 text-gray-800">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">How to Contact ShiftRemit</h1>

          <p className="mb-4">
            If you have any enquiries, complaints, suggestions, or would like to
            request account or data deletion, please email us at{" "}
            <a
              href="mailto:support@shiftremit.com"
              className="text-main underline"
            >
              support@shiftremit.com
            </a>
            .
          </p>

          <p className="mb-4">
            To learn more about how we handle your data, please visit our
            Privacy Policy:
          </p>

          <a
            href="https://shiftremit.com/privacy"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-main underline"
          >
            https://shiftremit.com/privacy
          </a>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => router.back()}
              className="font-poppins text-sm sm:text-base flex items-center gap-2 sm:py-3 py-2 px-3 sm:px-6 cursor-pointer bg-gray-300 rounded-[6px]"
            >
              <FaArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
