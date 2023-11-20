import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from 'react-icons/tb';
import { FaCut } from "react-icons/fa";

declare global {
  var cloudinary: any;
}

const uploadPreset = "qdxm961x";

interface ImageUploadProps {
  onChange: (values: string[]) => void;
  values: string[];
}

const ImagesUploads: React.FC<ImageUploadProps> = ({
  onChange,
  values
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(values);


  const handleUpload = useCallback((result: any) => {
    setImageUrls((prevImageUrls) => {
        const newImageUrls = [...prevImageUrls, result.info.secure_url];
        onChange(newImageUrls);
        return newImageUrls;
      });
  }, [ onChange]);

  const handleRemoveImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    onChange(newImageUrls);
  };

  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
            {imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative w-[120px]">
                <button
                    className="absolute right-1 top-1 p-1 bg-red-500 text-white rounded-full"
                    onClick={() => handleRemoveImage(index)}
                >
                    <FaCut size={12}/>
                </button>
                <Image
                    width={120}
                    height={85}
                    style={{ objectFit: 'cover', height: 85 }}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                />
                </div>
            ))}
       </div>

      {imageUrls.length < 4 && (
        <CldUploadWidget
          onUpload={handleUpload}
          uploadPreset={uploadPreset}
          options={{
            maxFiles: 1
          }}
        >
          {({ open }) => (
            <div
              onClick={() => open?.()}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed 
                border-2 
                p-20 
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
              "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">
                Da clic para cargar
              </div>
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImagesUploads;
