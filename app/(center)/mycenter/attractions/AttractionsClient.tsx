"use client"

import { Button  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import axios from 'axios';
import { useAttractionModal } from '@/hooks/modal/center';
import { AttractionModal } from '@/components/center/modals';
import Table from '@/components/ui/table/Table';

interface AttractionClientProps {
    attractions?: any | null,
    center?: any | null;
}
  
const AttractionsClient: FC<AttractionClientProps> = ({ attractions, center }) => {

  const [listAtraction, setListAtraction] = useState(attractions)
  const [attraction, setAttraction] = useState(null)

  const attractionModal = useAttractionModal();

  const handleEdit = async(id: any) => {
    const { data } = await axios.get(`/api/attraction/${id}`)
    setAttraction(data)
    attractionModal.onOpen()
  };
       
  useEffect(() => {
    setListAtraction(attractions)
  }, [attractions])
  
  const headers = ['Atraccion', 'descripción', 'Precio', 'Descuento', 'Total', 'Estado', '']

  const createButton = (
    <Button 
      variant='outlined' 
      onClick={ () => { attractionModal.onOpen(), setAttraction(null) } }
    >
      Agregar
    </Button>
  )
  return (
    <>
      <Table 
        title='Atracciones'
        subTitle='Diversion para tus usuarios'
        headers={headers}
        data={listAtraction}
        urlApi='/api/attraction/'
        create={ createButton }
        handleEdit={ handleEdit }
        handleDelete={ () => {} }
      />

      <AttractionModal attraction={attraction} center={center}/>
    </>
  )
}

export default AttractionsClient