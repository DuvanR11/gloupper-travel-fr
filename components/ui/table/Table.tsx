import React from 'react'
import { Pagination } from './Pagination'
import { Button, IconButton } from '@mui/material'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { DropdownFilter } from '../dropdown'
import { useFoodModal } from '@/hooks/modal/center'
import RequiereAlert from '@/components/ui/alerts/Requiere';
import useRequireAlert from '@/hooks/alert/useRequireAlert';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FC, useEffect, useState } from 'react'
import { dropdownOptions } from '@/utils'
import { useRouter } from 'next/navigation'

interface TableProps {
    title: string;
    subTitle?: string;
    headers: string[];
    data: string[];
    urlApi: string;
    urlInfo?: string;
    create?: React.ReactElement;
    handleEdit: (id: number) => void;
    handleDelete: () => void;
  }

  
const Table: FC<TableProps> = ({ 
    title,
    subTitle,
    headers,
    data,
    create,
    urlApi,
    urlInfo,
    handleEdit,
    handleDelete,
}) => {

    const router = useRouter();

    const requireAlert = useRequireAlert();
    const [listData, setListdata] = useState(data)
    const [dataId, setDataId] = useState()
    const [currentPage, setCurrentPage] = useState(1);

    const edit = async(id: any) => {
        handleEdit(id)
    };
     
    const remove = () => {
        axios.delete(`${urlApi}${dataId}`)
        .then(() => {
          toast.success('Removido');
          requireAlert.onClose();
          router.refresh();
        })
        .catch(() => {
          toast.error('Ohh Ohh algo salio mal.');
        })
    };

    const pageSize = 5; 
    const totalPages = 50;
  
    useEffect(() => {
      setListdata(data);
    }, [data]);
  
    const paginatedData = listData?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  return (
    <>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            {/* <!-- Card header --> */}
            <div className="items-center justify-between lg:flex">
            <div className="mb-4 lg:mb-0">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{ title }</h3>
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">{ subTitle }</span>
            </div>
            <div className="items-center sm:flex">
                <div className="flex items-center">
                <DropdownFilter options={dropdownOptions} />
                </div>
                <div className="flex items-center">
                    { create }
                </div>
            </div>
            </div>
            {/* <!-- Table --> */}
            <div className="flex flex-col mt-6">
            <div className="overflow-x-auto rounded-lg">
                <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                {
                                    headers.map((head: any, index: number) => (
                                        <th key={ head } scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                            { head }
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                            {
                            paginatedData.map((food: any, index: number) => (
                                <tr
                                key={food.id}
                                className={index % 2 === 1 ? "bg-gray-50 dark:bg-gray-700" : ""}
                                >
                                <td className="p-4 text-sm font-normal flex items-center text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-8 h-8 rounded-full mr-3 " src={ food.image } alt={ food.name }/>
                                    { food.name }
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                    ...
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                    { food.price }
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                    10 %
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                    90.000 $
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">Activo</span>
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    <div>
                                    <IconButton
                                        onClick={() => { edit(food.id) }}
                                        color="primary"
                                        size="small"
                                    >
                                        <MdModeEditOutline  />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>  { requireAlert.onOpen(), setDataId(food.id) }}
                                        color="primary"
                                        size="small"
                                    >
                                        <MdDelete  />
                                    </IconButton>
                                    </div>
                                </td>
                                </tr>
                            ))
                            }

                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
            {/* <!-- Card Footer --> */}
            <div className="flex items-center justify-between pt-3 sm:pt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            <div className="flex-shrink-0">
                <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                Informe de transacciones
                <svg className="w-4 h-4 ml-1 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
            </div>
            </div>
        </div>

        <RequiereAlert onSubmit={ remove } />
    </>
  )
}

export default Table