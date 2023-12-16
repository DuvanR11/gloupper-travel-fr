'use client';

import { useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";

import { useRouter } from "next/navigation";

import Modal from "./Modal";

import ImageUpload from "../inputs/ImageUpload";
import { useUploadImage } from "@/hooks/modal/multimedia";
import { Heading } from "../headers";

export const UploadImage = ({ upload }: any) => {
  const router = useRouter();
  const uploadModal = useUploadImage()


  const [isLoading, setIsLoading] = useState(false);

  const { 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
 
  const image = watch('image');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true);

    upload((prevImageUrls: any) => {
        const newImageUrls = [...prevImageUrls, data.image];
        return newImageUrls;
      });
   
    setIsLoading(false);
    uploadModal.onClose()
  }

  const bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading
            title="Añade una foto principal de tu lugar"
            subtitle="Esta sera la primera impresion de tu espacio"
        />
        <ImageUpload
            onChange={(value) => setCustomValue('image', value)}
            value={image}
        />
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={uploadModal.isOpen}
      title="Multimedia"
      actionLabel="Cargar"
      onClose={uploadModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

