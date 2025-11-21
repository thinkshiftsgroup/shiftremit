import { useState, useRef, ChangeEvent, useEffect } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { Eye } from "lucide-react";

interface FileUploadProps {
  label: string;
  fileUrl?: string; // URL from backend
  fileObj?: File;   // newly selected file
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  fileUrl,
  fileObj,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayFile, setDisplayFile] = useState<string>("");

  useEffect(() => {
    if (fileObj) setDisplayFile(fileObj.name);
    else if (fileUrl) setDisplayFile(fileUrl.split("/").pop() || "");
    else setDisplayFile("Choose file to upload (required)");
  }, [fileObj, fileUrl]);

  const handleClick = () => inputRef.current?.click();


  return (
    <div>
      <label className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745]">
        {label} <FaCircleQuestion size={16} className="text-[#454745]" />
      </label>

      <div
        className="w-full mt-3 overflow-x-scroll scrollbar-hide text-sm sm:text-base font-poppins py-3 px-3 rounded-sm border border-dashed text-[#666] cursor-pointer flex items-center justify-between hover:border-main transition-colors"
        onClick={handleClick}
      >
        <span className="opacity-80">{displayFile}</span>
        {fileUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(fileUrl, "_blank");
            }}
            className="text-main ml-2"
          >
            <Eye size={14} />
          </button>
        )}
      </div>

      {/* <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
        required={required}
      /> */}
    </div>
  );
};

export default FileUpload;
