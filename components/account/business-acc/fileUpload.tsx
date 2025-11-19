import { useState, useRef, ChangeEvent, useEffect } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { Eye } from "lucide-react";

interface FileUploadProps {
  label: string;
  fileUrl?: string;
  fileObj?: File;
  fileSizeKB?: number; // new prop
  onFileChange: (file: File) => void;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  fileUrl,
  fileObj,
  onFileChange,
  fileSizeKB,
  required = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayFile, setDisplayFile] = useState<string>("");

  useEffect(() => {
    if (fileObj) {
      setDisplayFile(fileObj.name);
    } else if (fileUrl) {
      setDisplayFile(fileUrl.split("/").pop() || "");
    } else {
      setDisplayFile("Choose file to upload (required)");
    }
  }, [fileObj, fileUrl]);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDisplayFile(file.name);
    onFileChange(file);
  };

  return (
    <div>
      <label className="font-poppins font-semibold flex items-center gap-1 text-sm text-[#454745]">
        {label} <FaCircleQuestion size={16} className="text-[#454745]" />
      </label>

      <div
        className="w-full mt-3 font-poppins py-3 overflow-x-scroll scrollbar-hide px-3 rounded-sm border border-dashed text-[#666] cursor-pointer flex items-center justify-between hover:border-main transition-colors"
        onClick={handleClick}
      >
        <span className="opacity-80 flex items-center gap-1">
          {displayFile}
          {fileSizeKB && (
            <p className="text-xs text-gray-500 mt-1">
            ({(fileSizeKB / 1024).toFixed(2)} MB)
            </p>
          )}
        </span>
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

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default FileUpload;
