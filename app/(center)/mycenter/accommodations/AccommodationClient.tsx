"use client"

import { Box, Button, Grid, IconButton  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { MdModeEditOutline, MdDelete   } from "react-icons/md";
import RequiereAlert from '@/components/ui/alerts/Requiere';
import useRequireAlert from '@/hooks/alert/useRequireAlert';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AccommodationModal } from '@/components/center/modals';
import { useAccommodationModal } from '@/hooks/modal/center';

interface AccommodationClientProps {
  accommodations?: any | null,
}
  
const AccommodationClient: FC<AccommodationClientProps> = ({ accommodations }) => {

  const router = useRouter();

  const [listAccommodation, setListAccommodation] = useState(accommodations)
  const [accommodation, setAccommodation] = useState(null)
  const [accommodationId, setAccommodationId] = useState()

  const accommodationModal = useAccommodationModal();
  const requireAlert = useRequireAlert();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/accommodation/${id}`)
   setAccommodation(data)
   accommodationModal.onOpen()
  };

  const handleDelete = () => {
    axios.delete(`/api/accommodation/${accommodationId}`)
    .then(() => {
      toast.success('Añadido a tu menu');
      requireAlert.onClose();
      router.refresh();
    })
    .catch(() => {
      toast.error('Ohh Ohh algo salio mal.');
    })
  };
       
  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 350 },
    { field: 'price', headerName: 'Precio', width: 120 },
    { field: 'status', headerName: 'Estado', width: 120 },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 120,
      renderCell: (params: any) => (
        <Image
          alt=''
          src={params.value}
          width={ 50 }
          height={ 50 }
        />
      ),
    },
    {
      field: 'options',
      headerName: 'Opciones',
      width: 120,
      renderCell: (params: any) => (
        <div>
          <IconButton
            onClick={() => { handleEdit(params.row.id) }}
            color="primary"
            size="small"
          >
            <MdModeEditOutline  />
          </IconButton>
          <IconButton
            onClick={() =>  { requireAlert.onOpen(), setAccommodationId(params.row.id) }}
            color="primary"
            size="small"
          >
            <MdDelete  />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const rows = accommodations.map((accommodation: any, index: any) => ({
      id: accommodation.slug,
      name: accommodation.name,
      description: accommodation.description,
      status: 'Actvio',
      price: accommodation.price,
      image: accommodation.image,
    }))
    setListAccommodation(rows)
  }, [accommodations])
  
  return (
    <>
      <Grid container gap={ 1.5 } justifyContent='end'>
        <Grid item>
          <Button 
            variant='outlined' 
            onClick={ () => { accommodationModal.onOpen(), setAccommodation(null) } }
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={ 12 }>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={listAccommodation}
                columns={columns}
                getRowId={(row) => row.name}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </Grid>

      <AccommodationModal accommodation={accommodation}/>
      <RequiereAlert onSubmit={ handleDelete } />
    </>
  )
}

export default AccommodationClient