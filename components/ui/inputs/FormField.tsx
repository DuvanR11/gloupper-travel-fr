'use client'
import { FC } from 'react';

import { Grid, TextField, InputLabel } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  defaultValue?: string | number | Date;
  register: UseFormRegisterReturn;
  error?: boolean;
  helperText?: string | undefined;
  type?: string;
  size?: any | undefined;
}

export const FormField: FC<FormFieldProps> = ({
  label,
  defaultValue,
  register,
  error = false,
  helperText,
  type,
  size = 'medium'
}) => {
  return (
    <Grid item sm={12} lg={6}>
        {/* <InputLabel sx={{ fontSize: '14px', color: '#c7c7c7', mb: '5px '}}>
            {label}
        </InputLabel> */}
        <TextField
            variant="outlined"
            label={label}
            fullWidth
            type={type}
            defaultValue={defaultValue}
            {...register}
            error={error}
            helperText={helperText}
            size={size ? size : 'medium'}
        />
    </Grid>
  );
};


