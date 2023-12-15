'use client'

import { DropdownSelect } from '@/components/ui/dropdown';
import React from 'react'
import { useEffect } from 'react';
import NextLink from 'next/link'  
import { usePathname, useSearchParams } from 'next/navigation';
import { FaWallet, FaImage   } from "react-icons/fa6";
import { FaHome, FaUsers  } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineHotel } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { CgAttribution } from "react-icons/cg";

const subRoutes = [
    {
        name: 'Atracciones',
        url: '/mycenter/attractions',
        icon: <CgAttribution  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
    },
    {
        name: 'Tours',
        url: '/mycenter/tours',
        icon: <CiDiscount1  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
    },
    {
        name: 'Hospedaje',
        url: '/mycenter/accommodations',
        icon: <MdOutlineHotel  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
    },
    {
        name: 'Restaurante',
        url: '/mycenter/foods',
        icon:  <IoFastFoodOutline  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
    },
]

export const SideMenu = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const centerId = searchParams?.get('centerId')

     // Sidebar
     useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const toggleSidebarMobileEl = document.getElementById('toggleSidebarMobile');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        const toggleSidebarMobileHamburger = document.getElementById('toggleSidebarMobileHamburger');
        const toggleSidebarMobileClose = document.getElementById('toggleSidebarMobileClose');
        const toggleSidebarMobileSearch = document.getElementById('toggleSidebarMobileSearch');
    
        const toggleSidebarMobile = () => {
          if (sidebar && sidebarBackdrop && toggleSidebarMobileHamburger && toggleSidebarMobileClose) {
            sidebar.classList.toggle('hidden');
            sidebarBackdrop.classList.toggle('hidden');
            toggleSidebarMobileHamburger.classList.toggle('hidden');
            toggleSidebarMobileClose.classList.toggle('hidden');
          }
        };
    
        if (toggleSidebarMobileSearch) {
          toggleSidebarMobileSearch.addEventListener('click', toggleSidebarMobile);
        }
    
        if (toggleSidebarMobileEl) {
          toggleSidebarMobileEl.addEventListener('click', toggleSidebarMobile);
        }
    
        if (sidebarBackdrop) {
          sidebarBackdrop.addEventListener('click', toggleSidebarMobile);
        }
    
        return () => {
          if (toggleSidebarMobileSearch) {
            toggleSidebarMobileSearch.removeEventListener('click', toggleSidebarMobile);
          }
    
          if (toggleSidebarMobileEl) {
            toggleSidebarMobileEl.removeEventListener('click', toggleSidebarMobile);
          }
    
          if (sidebarBackdrop) {
            sidebarBackdrop.removeEventListener('click', toggleSidebarMobile);
          }
        };
      }, []);

  return (
    <>
         <aside id="sidebar" className="fixed hidden top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width" aria-label="Sidebar">
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <ul className="pb-2 space-y-2">
                            <li>
                                <form action="#" method="GET" className="lg:hidden">
                                <label className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search"/>
                                </div>
                                </form>
                            </li>
                            <li>
                                <NextLink href={ `/mycenter?centerId=${centerId}` } passHref legacyBehavior >
                                    <div className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                        <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                        <span className="ml-3">Dashboard</span>
                                    </div>
                                </NextLink>
                            </li>
                            <li>
                                <DropdownSelect 
                                    buttonText='Mi centro' 
                                    icon={ <FaHome className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/> }>
                                    {
                                        subRoutes.map((subRoute, index) => (
                                            <li key={ index }>
                                                <NextLink href={`${subRoute.url}?centerId=${centerId}`} passHref legacyBehavior >
                                                    <div 
                                                    className={`
                                                        flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg 
                                                        pl-5 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700
                                                        ${ subRoute.url == pathname ? 'bg-gray-100 dark:bg-gray-700' : '' }`}>
                                                        
                                                        { subRoute.icon }
                                                        <span className="ml-3"> { subRoute.name }</span>
                                                    </div>
                                                </NextLink>
                                            </li>
                                        ))
                                    }
                                </DropdownSelect>
                            </li>
                          
                            <li>
                                <NextLink href={ `/mycenter/publication?centerId=${centerId}` } passHref legacyBehavior >
                                    <div className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                        <FaImage className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                                        <span className="ml-3">Publicaciones</span>
                                    </div>
                                </NextLink>
                            </li>

                            <li>
                                <NextLink href={ `/mycenter/multimedia?centerId=${centerId}` } passHref legacyBehavior >
                                    <div className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                        <FaImage className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                                        <span className="ml-3">Multimedia</span>
                                    </div>
                                </NextLink>
                            </li>

                            <li>
                                <NextLink href={ `/mycenter/users?centerId=${centerId}` } passHref legacyBehavior >
                                    <div className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                        <FaUsers className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                                        <span className="ml-3">Usuarios</span>
                                    </div>
                                </NextLink>
                            </li>

                            <li>
                                <NextLink href={ `/mycenter/wallet?centerId=${centerId}` } passHref legacyBehavior >
                                    <div className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                        <FaWallet className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                                        <span className="ml-3">Billetera</span>
                                    </div>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href={ `/mycenter/account?centerId=${centerId}` } passHref legacyBehavior >
                                        <div className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                            <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span className="ml-3">Configuraciones</span>
                                        </div>
                                </NextLink>
                            </li>
                           
                        </ul>
                        <div className="pt-2 space-y-2">
                            <NextLink href={ `/mycenter/help-center?centerId=${centerId}` } passHref legacyBehavior>
                                <div className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                                    <span className="ml-3">Soporte</span>
                                </div>
                            </NextLink>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800">
                    <a href="#" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
                    </a>
                    <a href="{{ }}" data-tooltip-target="tooltip-settings" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                    </a>
                    <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Settings page
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>           
                </div>
            </div>
        </aside>

        <div className="fixed hidden inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
    </>
  )
}
