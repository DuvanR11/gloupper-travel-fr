"use client"

import { Box, Button, Grid, Stack, IconButton  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import FoodModal from '@/components/center/modals/FoodModal';
import { useFoodModal } from '@/hooks/modal/center';
import Image from 'next/image';
import { MdVisibility, MdModeEditOutline, MdDelete   } from "react-icons/md";
import RequiereAlert from '@/components/ui/alerts/Requiere';
import useRequireAlert from '@/hooks/alert/useRequireAlert';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FoodClientProps {
  foods?: any | null,
  center?: any;
}
  
const FoodClient: FC<FoodClientProps> = ({ foods, center }) => {
  const router = useRouter();

  const [listFood, setListFood] = useState(foods)
  const [food, setFood] = useState(null)
  const [foodId, setFoodId] = useState()

  const foodModal = useFoodModal();
  const requireAlert = useRequireAlert();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/food/${id}`)
   setFood(data)
   foodModal.onOpen()
  };

  const handleDelete = () => {
    axios.delete(`/api/food/${foodId}`)
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
            onClick={() =>  { requireAlert.onOpen(), setFoodId(params.row.id) }}
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
    const rows = foods.map((food: any, index: any) => ({
      id: food.slug,
      name: food.name,
      description: food.description,
      status: 'Actvio',
      price: food.price,
      image: food.image,
    }))
    setListFood(rows)
  }, [foods])
  
  return (
    <>
      <Grid container gap={ 1.5 } justifyContent='end'>
        <Grid item>
          <Button 
            variant='outlined' 
            onClick={ () => { foodModal.onOpen(), setFood(null) } }
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

      <FoodModal food={food} center={center}/>
      <RequiereAlert onSubmit={ handleDelete } />
    </>
  )
}

export default FoodClient