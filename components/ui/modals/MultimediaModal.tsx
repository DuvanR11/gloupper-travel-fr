'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from "react";

import useRentModal from '@/hooks/modal/useRentModal';

import Modal from "./Modal";
import ImageUpload from '../inputs/ImageUpload';
import Heading from '../headers/Heading';

export const MultimediaModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      services: [],
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      category: '',
      departament: '',
      location: null,
      images: [],
      imageSrc: '',
      price: 1
    }
  });

  const imageSrc = watch('imageSrc');  

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
  
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Tu lugar fue creado');
      router.refresh();
      reset();
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Ohh Ohh algo salio mal.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Añade una foto principal de tu lugar"
        subtitle="Esta sera la primera impresion de tu espacio"
      />
      <ImageUpload
        onChange={(value) => setCustomValue('imageSrc', value)}
        value={imageSrc}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Gloupper tu lugar"
      actionLabel={'Cargar'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

