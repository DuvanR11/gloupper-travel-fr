"use client"

import { Button } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import axios from 'axios';
import { useTourModal } from '@/hooks/modal/center';
import { TourModal } from '@/components/center/modals';
import Table from '@/components/ui/table/Table';

interface TourClientProps {
  tours?: any | null,
  center?: any | null
}
  
const TourClient: FC<TourClientProps> = ({ tours, center }) => {

  const [listTour, setListTour] = useState(tours)
  const [tour, setTour] = useState(null)

  const tourModal = useTourModal();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/tour/${id}`)
   setTour(data)
   tourModal.onOpen()
  };

  useEffect(() => {
    setListTour(tours)
  }, [tours])
  
  const headers = ['Tour', 'descripción', 'Precio', 'Descuento', 'Total', 'Estado', '']

  const createButton = (
    <Button 
      variant='outlined' 
      onClick={ () => { tourModal.onOpen(), setTour(null) } }
    >
        Agregar
    </Button>
  )

  return (
    <>
      <Table
        title='Tours'
        subTitle='Paquetes todo incluido'
        headers={headers}
        data={listTour}
        urlApi='/api/tour/'
        create={ createButton }
        handleEdit={ handleEdit }
        handleDelete={ () => {} }
      />

      <TourModal tour={tour} center={center}/>
    </>
  )
}

export default TourClient