'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/inputs/Input";
import Button from "@/components/ui/buttons/Button";
import Modal from "@/components/ui/modals/Modal";
import { useReviewModal } from "@/hooks/modal/center";
import axios from "axios";
import { Heading } from "@/components/ui/headers";


export const ReviewModal = ({ center }: any) => {
  const router = useRouter();
  const reviewModal = useReviewModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    reset,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      centerId: center?.id,
      description: '',
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/review', data)
    .then(() => {
      toast.success('Reseña creada');
      router.refresh()
      reset();
      reviewModal.onClose()
    })
    .catch(() => {
      toast.error('ohh ohh');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Expresa tu opinion"
        subtitle="¡ Para nuestra comunidad es muy importante !"
      />
      <Input
        id="description"
        label="Tu reseña"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-1">
      <hr />
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>Politica tratamiento de datos</p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={reviewModal.isOpen}
      title="Crea tu reseña"
      actionLabel="Finalizar"
      onClose={reviewModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

