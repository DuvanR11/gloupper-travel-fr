"use client"

import ImageUpload from '@/components/ui/inputs/ImageUpload';

import { SafeUser } from '@/app/types'
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useState } from 'react';
import { FaCut } from 'react-icons/fa';

import { useUploadImage } from '@/hooks/modal/multimedia';
import { UploadImage } from '@/components/ui/modals';
import { Heading } from '@/components/ui/headers';

interface AccountClientProps {
    center: any
}
  
const MultimediaClient: FC<AccountClientProps> = ({ center }) => {

    const router = useRouter();

    const { handleSubmit, setValue, watch } = useForm<any>();

    const [images, setImages] = useState(center?.images)

    const uploadModal = useUploadImage()

    const setCustomValue = (id: any, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
    }

    const image = watch('image') || center?.imageSrc;
    const frontPage = watch('frontPage') || center?.frontPage;

    const onSubmit = async( updateCenter: any ) => {
        updateCenter.images = images
        axios.put(`/api/listings/${center?.id}`, updateCenter )
        .then(() => {
            toast.success('Usuario actualizado con exito');
            router.refresh();
        })
        .catch((error) => {
            toast.error('Ohh Ohh algo salio mal. ', error);
        })
        .finally(() => {
            console.log('')
        })
    }

    const handleRemoveImage = (index: number) => {
        const newImageUrls = [...images];
        newImageUrls.splice(index, 1);
        setImages(newImageUrls);
    };

  return (
    <>
        <form onSubmit={ handleSubmit(onSubmit) } noValidate>
            <Grid container spacing={ 3 } justifyContent='space-evenly'>

                <Box sx={{ p: 1, mt: 2 }}>
                    <Typography variant="subtitle1" color="#332927" fontSize='15px'sx={{ mb: 1 }}>Perfil</Typography>
                    <ImageUpload
                        onChange={(value) => setCustomValue('image', value)}
                        value={image || ''}
                    />
                </Box>

                <Box sx={{ p: 1, mt: 2 }}>
                    <Typography variant="subtitle1" color="#332927" fontSize='15px'sx={{ mb: 1 }}>Portada</Typography>
                    <ImageUpload
                        onChange={(value) => setCustomValue('frontPage', value)}
                        value={frontPage || ''}
                    />
                </Box>

            </Grid>

            <Stack sx={{ my: 3 }} spacing={ 3 } direction='row' justifyContent='space-between'>
                <Heading title='Lo que ven tus usuarios'/>
                <Button variant='outlined' onClick={ () => uploadModal.onOpen() }>Subir imagen</Button>
            </Stack>

            <ImageList sx={{ width: 'auto', height: 450, my: 3, pr: 0.5 }} gap={8} cols={4} rowHeight={270}>
                    {images.map((image: any, index: number) => (
                        <ImageListItem key={index}>
                            <button
                                className="absolute right-1 top-1 p-1 bg-red-500 text-white rounded-full"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <FaCut size={12}/>
                            </button>
                            <img
                                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                alt={''}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
            </ImageList>

            <Stack sx={{ mt: 4 }} direction='row' justifyContent='end'>
                <Button variant="contained" size="medium" type="submit" sx={{ background: '#1A9AA5' }}>Actualizar datos</Button>
            </Stack>

            <UploadImage upload={setImages}/>
            
        </form>
    </>
  )
}

export default MultimediaClient