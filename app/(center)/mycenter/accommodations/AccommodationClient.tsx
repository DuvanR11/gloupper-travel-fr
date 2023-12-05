"use client"

import { Button  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import axios from 'axios';
import { AccommodationModal } from '@/components/center/modals';
import { useAccommodationModal } from '@/hooks/modal/center';
import Table from '@/components/ui/table/Table';

interface AccommodationClientProps {
  accommodations?: any | null,
  center?: any | null,
}
  
const AccommodationClient: FC<AccommodationClientProps> = ({ accommodations, center }) => {

  const [listAccommodation, setListAccommodation] = useState(accommodations)
  const [accommodation, setAccommodation] = useState(null)

  const accommodationModal = useAccommodationModal();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/accommodation/${id}`)
   setAccommodation(data)
   accommodationModal.onOpen()
  };

  useEffect(() => {
    setListAccommodation(listAccommodation)
  }, [accommodations])
  
  const headers = ['Hospedaje', 'Descripción', 'Precio', 'Descuento', 'Total', 'Estado', '']

  const createButton = (
    <Button 
      variant='outlined' 
      onClick={ () => { accommodationModal.onOpen(), setAccommodation(null) } }
    >
      Agregar
    </Button>
  )

  return (
    <>
      <Table 
        title='Hospedajes'
        subTitle='Espacios de descanso para tus usuarios'
        headers={headers}
        data={listAccommodation}
        urlApi='/api/accommodation/'
        create={ createButton }
        handleEdit={ handleEdit }
        handleDelete={ () => {} }
      />

      <AccommodationModal accommodation={accommodation} center={center}/>
    </>
  )
}

export default AccommodationClient