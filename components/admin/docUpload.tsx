import ActionDropDown from "./action";

const DocUpload = () => {
  return (
    <div className="w-full bg-white shadow-md mb-5 rounded-md p-3">
      <div className="my-2 border-b pb-3">
        <h1 className="font-poppins text-lg font-medium text-main">Document Upload</h1>
        <p className="text-sm text-[#454745] font-dm-sans">
          Additional document needed to speed up the KYC process
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="">
          <label
            htmlFor="fileUpload"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Business Registration/Incorporation Certificate
          </label>

          <label
            htmlFor="fileUpload"
            className="
      w-full mt-1 py-1 px-3 pe-1 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-center
      hover:border-main transition-colors
    "
          >
            <span className="opacity-80 flex justify-between items-center w-full">Choose file to upload (required)

              <button className="flex items-center rounded bg-gray-300 p-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2" strokeWidth={0.5} stroke="currentColor"></path>
                </svg> Action
              </button>
            </span>
            {/* <span className="text-main text-xs">Browse</span> */}
          </label>

          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="hidden"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="fileUpload"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Article of Association
          </label>

          <label
            htmlFor="fileUpload"
            className="
      w-full mt-1 py-1 px-3 pe-1 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-center
      hover:border-main transition-colors
    "
          >
            <span className="opacity-80 flex justify-between items-center w-full">Choose file to upload (required)

              <button className="flex items-center rounded bg-gray-300 p-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2" strokeWidth={0.5} stroke="currentColor"></path>
                </svg> Action
              </button>
            </span>
            {/* <span className="text-main text-xs">Browse</span> */}
          </label>

          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="hidden"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="fileUpload"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Operating Buiness Utility Bill
          </label>

          <label
            htmlFor="fileUpload"
            className="
      w-full mt-1 py-1 px-3 pe-1 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-center
      hover:border-main transition-colors
    "
          >
            <span className="opacity-80 flex justify-between items-center w-full">Choose file to upload (required)

             <ActionDropDown />
            </span>
            {/* <span className="text-main text-xs">Browse</span> */}
          </label>

          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="hidden"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="fileUpload"
            className="font-poppins font-semibold text-sm text-[#454745] "
          >
            Company Status Report
          </label>

          <label
            htmlFor="fileUpload"
            className="
      w-full mt-1 py-1 px-3 pe-1 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-center
      hover:border-main transition-colors
    "
          >
            <span className="opacity-80">Choose file to upload (optional)</span>
            {/* <span className="text-main text-xs">Browse</span> */}
          </label>

          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="hidden"
            required
          />
        </div>
        <div>
          <div className="">
            <label
              htmlFor="fileUpload"
              className="font-poppins font-semibold text-sm text-[#454745] "
            >
              Additional Documents
            </label>

            <label
              htmlFor="fileUpload"
              className="
      w-full mt-1 py-1 px-3 pe-1 rounded-sm border border-dashed border-[#d1d5db80]
      text-[#666] text-sm font-poppins cursor-pointer
      flex items-center justify-center
      hover:border-main transition-colors
    "
            >
              <span className="opacity-80 flex justify-between items-center w-full">Choose file to upload (optional)

                <button className="flex items-center rounded bg-gray-300 p-1 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2" strokeWidth={0.5} stroke="currentColor"></path>
                  </svg> Action
                </button>
              </span>
              {/* <span className="text-main text-xs">Browse</span> */}
            </label>

            <input
              id="fileUpload"
              name="fileUpload"
              type="file"
              className="hidden"
              required
            />
          </div>
          <div className="space-y-1 my-3">
            <p className="text-[#454745] text-xs font-poppins">
              Minimum 1, Maximum 5 documents
            </p>
            <p className="text-[#454745] text-xs font-poppins">
              Files should be in .png, .jpg or .pdf format
            </p>
            <p className="text-[#454745] text-xs font-poppins">
              Max size is 50mb
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocUpload;
