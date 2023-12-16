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
import ImagesUploads from '../../ui/inputs/ImagesUploads';
import Input from '../../ui/inputs/Input';
import { convertToSlug } from '@/utils';
import usePublicationModal from '@/hooks/modal/usePublicationModal';
import { Heading } from '../headers';

enum STEPS {
  INFORMATION = 0,
  IMAGE = 1,
}

export const PublicationModal = ({ publication, center }: any) => {
  const router = useRouter();
  const attractionModal = usePublicationModal();

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
      centerId: center.id,
      title: publication?.title || '',
      content: publication?.content || '',
      images: publication?.images || [],
    },
  });

  useEffect(() => {
    reset({
      centerId: center.id,
      title: publication?.title || '',
      content: publication?.content || '',
      images: publication?.images || [],
    });
  }, [publication, reset]);

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
    if (step !== STEPS.IMAGE) { return onNext() }

    console.log('entroooooooooooooo')
    setIsLoading(true);

    const axiosRequest = publication
        ? axios.put(`/api/publication/${publication.id}`, data)
        : axios.post('/api/publication', data);

    axiosRequest
        .then(() => {
            toast.success('Añadido con exito');
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
    if (step === STEPS.IMAGE) {
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
        title="Publicaciones"
        subtitle="Contenido para tus usarios"
      />
        <Input
          id="title"
          label="Titulo"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="content"
          label="Contenido"
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
            title="Añade mas fotos para tus invitados"
            subtitle="¡Muestra a los invitados cómo se ve tu atracción!"
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

