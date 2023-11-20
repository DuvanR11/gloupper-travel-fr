'use client'

import { createContext } from 'react';

interface Contextprops {
    isMenuOpen: boolean


    toggleSideMenu: () => void;
}


export const UiContext = createContext({} as Contextprops)