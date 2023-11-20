'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";

import Modal from '../../ui/modals/Modal';
import ImageUpload from '../../ui/inputs/ImageUpload';
import Heading from '../../ui/headers/Heading';
import ImagesUploads from '../../ui/inputs/ImagesUploads';
import Input from '../../ui/inputs/Input';
import { useAttractionModal } from '@/hooks/modal/center';
import { convertToSlug } from '@/utils';

enum STEPS {
  INFORMATION = 0,
  IMAGE = 1,
  MULTIMEDIA = 2,
}

export const AttractionModal = ({ attraction }: any) => {
  const router = useRouter();
  const attractionModal = useAttractionModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: attraction?.name || '',
      description: attraction?.description || '',
      image: attraction?.image || '',
      images: attraction?.images || [],
      price: attraction?.price || 0,
    },
  });

  useEffect(() => {
    reset({
      name: attraction?.name || '',
      description: attraction?.description || '',
      image: attraction?.image || '',
      images: attraction?.images || [],
      price: attraction?.price || 0,
    });
  }, [attraction, reset]);

  const image = watch('image');
  const images = watch('images');
  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.MULTIMEDIA) { return onNext() }

    setIsLoading(true);
    data.price = parseInt(data.price)
    data.slug = convertToSlug(data.name)

    const axiosRequest = attraction
        ? axios.put(`/api/attraction/${attraction.id}`, data)
        : axios.post('/api/attraction', data);

    axiosRequest
        .then(() => {
            toast.success('Añadido a tu menú');
            router.refresh();
            reset();
            setStep(STEPS.INFORMATION);
            attractionModal.onClose();
        })
        .catch(() => {
            toast.error('Ohh, algo salió mal.');
        })
        .finally(() => {
            setIsLoading(false);
        });
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.MULTIMEDIA) {
      return 'Finalizar'
    }

    return 'Siguiente'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined
    }

    return 'Anterior'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="La mejor gastronomia"
        subtitle="Lo mejor para tus clientes"
      />
        <Input
          id="name"
          label="Nombre"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Descripción"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
            id="price"
            label="Precio"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
    </div>
  )

  if (step === STEPS.IMAGE) {
    bodyContent = (
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
  }

  if (step === STEPS.MULTIMEDIA) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Añade mas fotos para tus invitados"
          subtitle="¡Muestra a los invitados cómo se ve tu lugar!"
        />
        <ImagesUploads
           onChange={(value) => setCustomValue('images', value)}
           values={images}
        />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={attractionModal.isOpen}
      title="Gloupper tu lugar"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFORMATION ? undefined : onBack}
      onClose={attractionModal.onClose}
      body={bodyContent}
    />
  );
}

