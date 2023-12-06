'use client';

import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import Heading from "@/components/ui/headers/Heading";
import { Button, Grid, TextField } from "@mui/material";
import { FormField } from "@/components/ui/inputs";
import { validations } from "@/utils";
import { FieldValues, useForm } from "react-hook-form";
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
  
  console.log(center) 

  const { register: registerGeneral, handleSubmit: handleSubmitGeneral, formState: { errors: errorsGeneral } } = useForm<FieldValues>({
    defaultValues: {
      title: center.title,
      nit: center?.nit,
      departament: center?.departament,
      city: center?.city,
      address: center?.address,
      email: currentUser?.email,
      phone: center?.phone,
      category: center?.category,
    },
  });

  const { register: registerPicture, handleSubmit: handleSubmitPicture, formState: { errors: errorsPicture } } = useForm<any>();
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: errorsPassword } } = useForm<any>();

  const onSubmitGenreal = async( updateCenter: any ) => {
    axios.put(`/api/listings/${center?.id}`, updateCenter )
    .then(() => {
        toast.success('Centro actualizado con exito');
        router.refresh();
    })
    .catch((error) => {
        toast.error('Ohh Ohh algo salio mal. ', error);
    })
    .finally(() => {
        console.log('')
    })
  }

  const onSubmitPicture = async( updateCenter: any ) => {

  }

  const onSubmitPassword = async( updateCenter: any ) => {

  }

  return ( 
    <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Centro
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Configuración</span>
                    </div>
                </li>
                </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Configuración de centro</h1>
        </div>
        {/* <!-- Right Content --> */}
        <div className="col-span-full xl:col-auto">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                    <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={ center.imageSrc } alt={ center.title }/>
                    <div>
                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Foto de perfil</h3>
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Tamaño máximo de 800K
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-primary-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-primary-800">
                                <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
                                Subir foto
                            </button>
                            <button type="button" className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Idioma</h3>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione el idioma</label>
                    <select id="settings-language" name="countries" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option>English (US)</option>
                        <option>Italiano</option>
                        <option>Français (France)</option>
                        <option>正體字</option>
                        <option>Español (España)</option>
                        <option>Deutsch</option>
                        <option>Português (Brasil)</option>
                    </select>
                </div>
                <div>
                    <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-primary-800">Guardar</button>
                </div>
            </div>
        </div>
        <div className="col-span-2">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Información general</h3>
                <form onSubmit={handleSubmitGeneral(onSubmitGenreal)}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input 
                                type="text" 
                                id="title"
                                {...registerGeneral('title', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Centro" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIT</label>
                            <input 
                                type="text" 
                                id="nit" 
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="000000" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
                            <input 
                                type="text" 
                                id="departament" 
                                {...registerGeneral('departament', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Huila" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                            <input 
                                type="text" 
                                id="city" 
                                {...registerGeneral('city', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Neiva" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                            <input 
                                type="text" 
                                id="address" 
                                {...registerGeneral('address', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Calle 21" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                            <input 
                                type="email" 
                                id="email" 
                                {...registerGeneral('email', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de telefono</label>
                            <input 
                                type="number" 
                                id="phone" 
                                {...registerGeneral('phone', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. +(57) 3209018921" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                            <input 
                                type="text" 
                                id="category" 
                                {...registerGeneral('category', {})}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mirador" required
                            />
                        </div>
                        <div className="col-span-6 sm:col-full">
                            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-primary-800" type="submit">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Información de contraseña</h3>
                <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña actual</label>
                            <input type="text" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required/>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva contraseña</label>
                            <input data-popover-target="popover-password" data-popover-placement="bottom" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required/>
                            <div data-popover id="popover-password" role="tooltip" className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                <div className="p-3 space-y-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                    </div>
                                    <p>It’s better to have:</p>
                                    <ul>
                                        <li className="flex items-center mb-1">
                                            <svg className="w-4 h-4 mr-2 text-green-400 dark:text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Upper & lower case letters
                                        </li>
                                        <li className="flex items-center mb-1">
                                            <svg className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            A symbol (#$&)
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            A longer password (min. 12 chars.)
                                        </li>
                                    </ul>
                            </div>
                            <div data-popper-arrow></div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña</label>
                            <input type="text" name="confirm-password" id="confirm-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required/>
                        </div>
                        <div className="col-span-6 sm:col-full">
                            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-primary-800" type="submit">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
   );
}
 
export default AccountClient;