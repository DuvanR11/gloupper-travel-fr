

export const isValidEmail = (email: string): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
      return !!match;
};
  
export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) 
    ? undefined
    : 'El correo no parece ser válido';
}
  
export const nameValidation = {
  required: 'Este campo es requerido',
  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
};

export const emailValidation = {
  required: 'Este campo es requerido',
  validate: (value: string) => {
    return isEmail(value)
  },
};

export const telValidation = {
  required: 'Este campo es requerido',
  minLength: { value: 10, message: 'Mínimo 10 caracteres' },
};

export const imageValidation = {
  required: 'Este campo es requerido',
};