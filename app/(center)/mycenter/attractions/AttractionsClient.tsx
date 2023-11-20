"use client"

import { Box, Button, Grid, Stack, IconButton  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Image from 'next/image';
import { MdModeEditOutline, MdDelete   } from "react-icons/md";
import RequiereAlert from '@/components/ui/alerts/Requiere';
import useRequireAlert from '@/hooks/alert/useRequireAlert';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAttractionModal } from '@/hooks/modal/center';
import { AttractionModal } from '@/components/center/modals';

interface FoodClientProps {
    attractions?: any | null,
}
  
const AttractionsClient: FC<FoodClientProps> = ({ attractions }) => {
  const router = useRouter();

  const [listFood, setListFood] = useState(attractions)
  const [attraction, setAttraction] = useState(null)
  const [attractionId, setAttractionId] = useState()

  const attractionModal = useAttractionModal();
  const requireAlert = useRequireAlert();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/attraction/${id}`)
   setAttraction(data)
   attractionModal.onOpen()
  };

  const handleDelete = () => {
    axios.delete(`/api/attraction/${attractionId}`)
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
            onClick={() =>  { requireAlert.onOpen(), setAttractionId(params.row.id) }}
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
    const rows = attractions.map((attraction: any, index: any) => ({
      id: attraction.slug,
      name: attraction.name,
      description: attraction.description,
      status: 'Actvio',
      price: attraction.price,
      image: attraction.image,
    }))
    setListFood(rows)
  }, [attractions])
  
  return (
    <>
      <Grid container gap={ 1.5 } justifyContent='end'>
        <Grid item>
          <Button 
            variant='outlined' 
            onClick={ () => { attractionModal.onOpen(), setAttraction(null) } }
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={ 12 }>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={listFood}
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

      <AttractionModal attraction={attraction}/>
      <RequiereAlert onSubmit={ handleDelete } />
    </>
  )
}

export default AttractionsClient