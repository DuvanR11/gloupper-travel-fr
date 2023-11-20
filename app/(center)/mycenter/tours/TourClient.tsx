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
import { useTourModal } from '@/hooks/modal/center';
import { TourModal } from '@/components/center/modals';

interface TourClientProps {
  tours?: any | null,
}
  
const TourClient: FC<TourClientProps> = ({ tours }) => {

  const router = useRouter();

  const [listTour, setListTour] = useState(tours)
  const [tour, setTour] = useState(null)
  const [tourId, setTourId] = useState()

  const tourModal = useTourModal();
  const requireAlert = useRequireAlert();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/tour/${id}`)
   setTour(data)
   tourModal.onOpen()
  };

  const handleDelete = () => {
    axios.delete(`/api/tour/${tourId}`)
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
            onClick={() =>  { requireAlert.onOpen(), setTourId(params.row.id) }}
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
    const rows = tours.map((tour: any, index: any) => ({
      id: tour.slug,
      name: tour.name,
      description: tour.description,
      status: 'Actvio',
      price: tour.price,
      image: tour.image,
    }))
    setListTour(rows)
  }, [tours])
  
  return (
    <>
      <Grid container gap={ 1.5 } justifyContent='end'>
        <Grid item>
          <Button 
            variant='outlined' 
            onClick={ () => { tourModal.onOpen(), setTour(null) } }
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={ 12 }>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={listTour}
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

      <TourModal tour={tour}/>
      <RequiereAlert onSubmit={ handleDelete } />
    </>
  )
}

export default TourClient