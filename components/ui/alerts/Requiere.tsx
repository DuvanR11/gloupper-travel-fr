'use client'

import { useState } from 'react'
import Alert from './Alert'
import useRequireAlert from '@/hooks/alert/useRequireAlert';
import { FieldValues, useForm } from 'react-hook-form';

export default function RequiereAlert({ onSubmit }: any) {
    const [isLoading, setIsLoading] = useState(false);

    const requireAlert = useRequireAlert();
    
    const { handleSubmit } = useForm<FieldValues>();

    const bodyContent = (
        <div className="mt-2">
            <p className="text-sm text-gray-500">
                Los registros que desactives no podran ser visibles para tus usuarios
            </p>
        </div>
    )

  return (
   <Alert 
    disabled={isLoading}
    isOpen={requireAlert.isOpen}
    title="¿Estas seguro de desactivar?"
    actionLabel='Desactivar'
    onSubmit={handleSubmit(onSubmit)}
    onClose={requireAlert.onClose}
    body={bodyContent}
   />
  )
}
