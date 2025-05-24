import { useEffect, useState } from 'react';

interface ImageListProps {
  images: string[];
  title?: string;
}

const ImageList: React.FC<ImageListProps> = ({ images = [], title = 'ຮູບພາບລາຍລະອຽດ' }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    setPreviews(images || []);

    return () => {
      previews.forEach((preview) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [images]);

  return (
    <div className="mt-4">
      {title && <h3 className="mb-2 font-medium">{title}</h3>}
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
        {previews.length > 0 ? (
          previews.map((preview, index) => (
            <div key={index} className="relative h-32 overflow-hidden rounded-lg bg-gray-300">
              <img src={preview} alt={`Image ${index + 1}`} className="h-full w-full object-contain" />
            </div>
          ))
        ) : (
          <div className="col-span-full py-4 text-center text-gray-500">ບໍ່ມີຮູບພາບ</div>
        )}
      </div>
    </div>
  );
};

export default ImageList;
