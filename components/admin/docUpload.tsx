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

              
              <div className="flex items-center gap-2">
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                <g fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M12 5C7.336 5 3.6 7.903 2 12c1.6 4.097 5.336 7 10 7s8.4-2.903 10-7c-1.6-4.097-5.336-7-10-7m0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clipRule="evenodd" opacity={0.16}></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></path>
                </g>
              </svg><ActionDropDown /></div>
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

              
              <div className="flex items-center gap-2">
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                <g fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M12 5C7.336 5 3.6 7.903 2 12c1.6 4.097 5.336 7 10 7s8.4-2.903 10-7c-1.6-4.097-5.336-7-10-7m0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clipRule="evenodd" opacity={0.16}></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></path>
                </g>
              </svg><ActionDropDown /></div>
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

              <div className="flex items-center gap-2">
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                <g fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M12 5C7.336 5 3.6 7.903 2 12c1.6 4.097 5.336 7 10 7s8.4-2.903 10-7c-1.6-4.097-5.336-7-10-7m0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clipRule="evenodd" opacity={0.16}></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></path>
                </g>
              </svg><ActionDropDown /></div>
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

              <div className="flex items-center gap-2">
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                <g fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M12 5C7.336 5 3.6 7.903 2 12c1.6 4.097 5.336 7 10 7s8.4-2.903 10-7c-1.6-4.097-5.336-7-10-7m0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clipRule="evenodd" opacity={0.16}></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></path>
                </g>
              </svg><ActionDropDown /></div>
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

                
              <div className="flex items-center gap-2">
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                <g fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M12 5C7.336 5 3.6 7.903 2 12c1.6 4.097 5.336 7 10 7s8.4-2.903 10-7c-1.6-4.097-5.336-7-10-7m0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clipRule="evenodd" opacity={0.16}></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></path>
                </g>
              </svg><ActionDropDown /></div>
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
