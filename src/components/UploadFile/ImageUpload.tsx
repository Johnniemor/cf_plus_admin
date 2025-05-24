import { iconAdd, iconCancel, iconUpload } from '@/configs/icon';
import { useEffect, useState } from 'react';

interface InputProps {
  name: string;
  label: string;
  disabled?: boolean;
  title?: string;
  setFile: (file?: File) => void;
  initialImage?: string | null;
}

const UploadImage: React.FC<InputProps> = ({ name, label, setFile, disabled = false, title, initialImage }) => {
  const [preview, setPreview] = useState<string | null>(initialImage ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isUpLoad, setIsUpLoad] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const max_file_size = 3;
    const mac_file_size_byte = max_file_size * 1024 * 1024;
    setFile(file);
    if (file) {
      if (file.size > mac_file_size_byte) {
        setError(`File size exceeds ${max_file_size} MB. Please upload a smaller file`);
        setPreview(null);
        setIsUpLoad(false);
      } else {
        setError(null);
        setPreview(URL.createObjectURL(file));
        setIsUpLoad(true);
        setFile(file);
      }
    } else {
      setPreview(null);
      setIsUpLoad(false);
      setFile(undefined);
    }
  };
  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
      setIsUpLoad(true);
    }
  }, [initialImage]);

  return (
    <div>
      <h1 className="py-2">{title}</h1>
      <div className={`flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-royalblue`}>
        {!isUpLoad ? (
          <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor={name}>
            <div className="flex flex-col items-center justify-center rounded-lg py-12 text-white transition-all">
              {iconUpload}
              <span className="text-center text-lg font-semibold text-gray-600">{label}</span>
              <div className="py-4">
                <div className="rounded-lg bg-royalblue px-8 py-2">{iconAdd}</div>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </label>
        ) : (
          <div className="relative">
            <img src={preview ?? ''} alt="Preview" className="h-[312px] rounded" />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setIsUpLoad(false);
              }}
              className="absolute right-2 top-2 rounded-full text-lg text-white"
            >
              <div className="text-red-600"> {iconCancel}</div>
            </button>
          </div>
        )}
        <input
          id={name}
          type="file"
          disabled={disabled}
          accept=".jpg, .jpeg, .png,"
          onChange={handleFileChange}
          className="mb-4 hidden w-full rounded border border-stroke p-2"
        />
      </div>
    </div>
  );
};

export default UploadImage;
