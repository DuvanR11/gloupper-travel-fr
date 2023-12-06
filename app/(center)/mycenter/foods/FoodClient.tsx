"use client"

import { Button  } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import FoodModal from '@/components/center/modals/FoodModal';
import { useFoodModal } from '@/hooks/modal/center';
import axios from 'axios';
import Table from '@/components/ui/table/Table';

interface FoodClientProps {
  foods?: any | null,
  center?: any;
}
  
const FoodClient: FC<FoodClientProps> = ({ foods, center }) => {

  const [listFood, setListFood] = useState(foods)
  const [food, setFood] = useState(null)

  const foodModal = useFoodModal();

  const handleEdit = async(id: any) => {
   const { data } = await axios.get(`/api/food/${id}`)
   setFood(data)
   foodModal.onOpen()
  };

  useEffect(() => {
    setListFood(foods);
  }, [foods]);

  const headers = ['Comida', 'descripción', 'Precio', 'Descuento', 'Total', 'Estado', '']

  const createButton = (
    <Button 
      variant='outlined' 
      onClick={ () => { foodModal.onOpen(), setFood(null) } }
    >
        Agregar
    </Button>
  )

  return (
    <>
      <Table
        title='Restuarante'
        subTitle='El menu para tus usuarios'
        headers={headers}
        data={listFood}
        urlApi='/api/food/'
        create={ createButton }
        handleEdit={ handleEdit }
        handleDelete={ () => {} }
      />

      <FoodModal food={food} center={center}/>
    </>
  )
}

export default FoodClient