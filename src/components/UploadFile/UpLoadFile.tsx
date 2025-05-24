import React, { useState } from 'react';
import { iconUpload } from '@/configs/icon';
import { FieldErrors } from 'react-hook-form';

interface FileUploaderProps {
  onFileChange?: (file: string | null) => void;
  className?: string;
  dragDropText?: string;
  clearButtonText?: string;
  showPreview?: boolean;
  disabled?: boolean;
  name: string;
  label: string;
  type?: string;
  register?: any;
  errors?: FieldErrors;
  rules?: object;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileChange,
  className = '',
  dragDropText = 'ໂຍນຮູບພາບ ຫຼື ກົດເພື່ອເລືອກຮູບ',
  clearButtonText = 'ລຶບ',
  showPreview = true,
  disabled = false,
  name,
  label,
  type = 'file',
  register,
  errors,
  rules,
}) => {
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    if (!selectedFile.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result as string;
        setFile(base64File);
        onFileChange?.(base64File);
      };
      reader.onerror = () => {
        setError('Failed to read file');
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError('Error processing file');
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    onFileChange?.(null);
  };

  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-gray-700 dark:border-orange-600 md:border-2 ${className}`}
    >
      <div className="w-full rounded-lg bg-white p-10 md:p-10">
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className={`w-full cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <div className="flex flex-col items-center justify-center rounded-lg border-2 p-4 text-white transition-all">
              {iconUpload}
              <span className="text-center text-lg font-semibold text-gray-600">{dragDropText}</span>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </label>
          <input
            id="file-upload"
            type={type}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            disabled={disabled}
            {...register(name, rules)}
          />

          {showPreview && file && (
            <section className="mt-6 w-full">
              <div className="flex flex-col items-center">
                <img src={file} alt="Preview" className="h-32 w-32 rounded object-cover" />
                <button
                  onClick={clearFile}
                  className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-red-300"
                >
                  {clearButtonText}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
