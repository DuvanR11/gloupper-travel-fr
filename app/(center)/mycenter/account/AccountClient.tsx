'use client';

import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import Heading from "@/components/ui/headers/Heading";
import { Button, Grid, TextField } from "@mui/material";
import { FormField } from "@/components/ui/inputs";
import { validations } from "@/utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface AccountClientProps {
  center: any,
  currentUser?: SafeUser | null,
}

const AccountClient: FC<AccountClientProps> = ({
  center,
  currentUser
}) => {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<any>();
  

  const onSubmit = async( updateCenter: any ) => {
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

  return ( 
    <form onSubmit={ handleSubmit(onSubmit) } noValidate>
        <Heading title="Información del Centro"/>
        <Grid container spacing={ 3 } sx={{ mt: 1 }}>

            <FormField
                label="Nombre"
                defaultValue={center?.title}
                register={register('title', validations.nameValidation)}
                error={!!errors.firstname}
                size='small'
                // helperText={errors.firstname?.message}
            />

            <FormField
                label="Correo"
                defaultValue={currentUser?.email || ''}
                register={register('email', validations.nameValidation)}
                error={!!errors.lastname}
                size='small'
                // helprText={errors.lastname?.message}
            />

            <FormField
                label="Departamento"
                defaultValue={center?.departament}
                register={register('departament', validations.nameValidation)}
                error={!!errors.lastname}
                size='small'
                // helprText={errors.lastname?.message}
            />

            <FormField
                label="Ciudad"
                defaultValue={center?.city}
                register={register('city', validations.nameValidation)}
                error={!!errors.lastname}
                size='small'
                // helprText={errors.lastname?.message}
            />

            <Grid item sm={12} lg={12}>
                <TextField
                    label="description"
                    multiline
                    defaultValue={center?.description}
                    rows={4}
                    fullWidth
                />
            </Grid>


            <Grid item sm={ 12 } display="flex" justifyContent="end">
                <Button variant="contained" size="medium" type="submit" sx={{ background: '#1A9AA5' }}>Actualizar datos</Button>
            </Grid>
        </Grid>
    </form>
   );
}
 
export default AccountClient;