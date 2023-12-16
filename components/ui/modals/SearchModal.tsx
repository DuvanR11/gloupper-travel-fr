'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/hooks/modal/useSearchModal";

import Modal from "./Modal";

import { CitySelect } from '../selects';
import { arrayServices, categories, cities } from '@/utils';
import ServicesInput from '../inputs/ServicesInput';
import CategoryBox from '../inputs/CategoryInput';
import { Heading } from '../headers';

enum STEPS {
  LOCATION = 0,
  CATEGORIA = 1,
  SERVICES = 2,
}

export const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<any>();
  const [category, setCategory] = useState<any>();

  const Map = useMemo(() => dynamic(() => import('../../geolocalization/Map'), { 
    ssr: false 
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const [selectedServices, setSelectedServices] = useState<any>([]);

  const toggleServices = (service: string) => {
    setSelectedServices((prevSelectedServices: string[]) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((cat: string) => cat !== service);
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };
  

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.SERVICES) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      category: category,
      services: selectedServices,
    };

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    searchModal, 
    location, 
    router, 
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.SERVICES) {
      return 'Buscar'
    }

    return 'Siguiente'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Anterior'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿A dónde quieres ir?"
        subtitle="¡Encuentra la ubicación perfecta!"
      />
      <CitySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value as any)} 
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.CATEGORIA) {
    bodyContent = (
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
            <CategoryBox
              onClick={(category: any) => 
                setCategory(category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
      </div>
    )
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
              <ServicesInput
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

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filtros"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

