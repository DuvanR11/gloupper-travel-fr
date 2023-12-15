"use client"

import { Button  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import axios from 'axios';
import { useAttractionModal } from '@/hooks/modal/center';
import Table from '@/components/ui/table/Table';
import { PublicationModal } from '@/components/ui/modals';
import usePublicationModal from '@/hooks/modal/usePublicationModal';

interface PublicationClientProps {
    publication?: any | null,
    center?: any | null;
}
  
const PublicationClient: FC<PublicationClientProps> = ({ publication, center }) => {

  const [listAtraction, setListAtraction] = useState(publication)
  const [attraction, setAttraction] = useState(null)

  const attractionModal = usePublicationModal();

  const handleEdit = async(id: any) => {
    const { data } = await axios.get(`/api/attraction/${id}`)
    setAttraction(data)
    attractionModal.onOpen()
  };
       
  useEffect(() => {
    setListAtraction(publication)
  }, [publication])
  
  const headers = ['Publicación', 'descripción', '']

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
        title='Publicaciones'
        subTitle='Contenido para tus usuarios'
        headers={headers}
        data={listAtraction}
        urlApi='/api/publication/'
        create={ createButton }
        handleEdit={ handleEdit }
        handleDelete={ () => {} }
      />

      <PublicationModal publication={attraction} center={center}/>
    </>
  )
}

export default PublicationClient