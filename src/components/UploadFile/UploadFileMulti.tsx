import { iconCancel, iconUpload, iconAdd } from "@/configs/icon";
import { useState, useEffect } from "react";

interface InputProps {
  name: string;
  label: string;
  disabled?: boolean;
  title?: string;
  setFiles: (files: File[]) => void;
  initialImages?: string[] | null;
  maxFiles?: number;
  removeFile: (index: number) => void;
  handleSelectAsPrimary: (index: number) => void;
}

const MultiUploadImage: React.FC<InputProps> = ({
  name,
  label,
  setFiles,
  disabled = false,
  title,
  initialImages = [],
  maxFiles = 5,
  removeFile,
  handleSelectAsPrimary,
}) => {
  const [previews, setPreviews] = useState<string[]>(initialImages || []);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const max_file_size = 3;
  const max_file_size_bytes = max_file_size * 1024 * 1024;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [...previews];
    let hasError = false;

    Array.from(files).forEach((file) => {
      if (file.size > max_file_size_bytes) {
        if (!hasError) {
          setError(`File "${file.name}" exceeds ${max_file_size} MB.`);
        }
        hasError = true;
        return;
      }

      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (!hasError) {
      setError(null); 
      const allFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(allFiles);
      setPreviews(newPreviews);
      setFiles(allFiles);
    }
  };

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setPreviews(initialImages);
    }
  }, [initialImages]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previews]);

  return (
    <div>
      <h1 className="py-2">{title}</h1>
      <div className="flex flex-col gap-4">
        {previews.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className={`h-48 w-full cursor-pointer rounded object-cover ${index === 0 ? 'border-4 border-green-500' : ''}`}
                  onClick={() => handleSelectAsPrimary(index)}
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute right-2 top-2 p-1 text-red-600"
                >
                  {iconCancel}
                </button>
              </div>
            ))}
          </div>
        )}

        {uploadedFiles.length < maxFiles ? (
          <div className="flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-orange-600 md:border-2">
            <label className="mb-2 block w-full text-sm font-medium text-black dark:text-white" htmlFor={name}>
              <div className="flex flex-col items-center justify-center rounded-lg py-8 text-white transition-all">
                {iconUpload}
                <span className="text-center text-lg font-semibold text-gray-600">{label}</span>
                <div className="py-4">
                  <div className="rounded-lg bg-green-700 px-8 py-2">{iconAdd}</div>
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>
            </label>
            <input
              id={name}
              type="file"
              disabled={disabled}
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="mb-4 hidden w-full rounded border border-stroke p-2"
              multiple
            />
          </div>
        ) : (
          <div className="text-center">
            <button
              type="button"
              onClick={() => alert('Edit functionality here')}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Edit Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiUploadImage;
