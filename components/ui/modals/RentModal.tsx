'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/hooks/modal/useRentModal';

import Modal from "./Modal";
import CategoryInput from '../inputs/CategoryInput';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../headers/Heading';
import LocationSelects from '../inputs/Location';
import ImagesUploads from '../inputs/ImagesUploads';
import { arrayServices, categories } from '@/utils';

enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
  SERVICES = 2,
  LOCATION = 3,
  IMAGE = 4,
  MULTIMEDIA = 5,
}

export const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [selectedServices, setSelectedServices] = useState<any>([]);

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

  const location = watch('location');
  const category = watch('category');
  const services = watch('services');
  const imageSrc = watch('imageSrc');
  const images = watch('images');

  // const Map = useMemo(() => dynamic(() => import('../Map'), { 
  //   ssr: false 
  // }), [location]);


  const [selectedLocation, setSelectedLocation] = useState({
    country: null,
    department: null,
    city: null,
  });
  
  const handleLocationChange = (addLocation: any) => {
    setCustomValue('services', selectedServices)
    setSelectedLocation(addLocation);
    setCustomValue('location', addLocation?.value.name)
  }

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

  const toggleServices = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((cat: string) => cat !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.MULTIMEDIA) {
      return onNext();
    }
  
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Tu lugar fue creado');
      router.refresh();
      reset();
      setSelectedServices([])
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Ohh Ohh algo salio mal.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.MULTIMEDIA) {
      return 'Finalizar'
    }

    return 'Siguiente'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Anterior'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿Cuál de estos describe mejor tu lugar?"
        subtitle="Elige una categoría"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
              setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Dónde está ubicado tu lugar?"
          subtitle="¡Ayuda a los invitados a encontrarte!"
        />
        <LocationSelects 
          value={location}  
          // onChange={(value) => setCustomValue('location', value)}
          onChange={handleLocationChange}
        />
      </div>
    );
  }

  if (step === STEPS.SERVICES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading
        title="¿Cuáles de estos describe mejor tu lugar?"
        subtitle="Elige tus servicios"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {arrayServices.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={toggleServices}
              selected={selectedServices.includes(item.label)}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
    )
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
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
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cómo describirías tu lugar?"
          subtitle="Corto y dulce funciona mejor!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
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
      isOpen={rentModal.isOpen}
      title="Gloupper tu lugar"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

