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
            <span className="opacity-80 flex justify-between items-center w-full">Choose file to upload (optional)

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
