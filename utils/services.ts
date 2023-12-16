import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBoatFishing, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';

export const arrayServices = [
    {
      label: 'Piscina',
      icon: TbBeach,
      description: 'Piscina',
    },
    {
      label: 'Restaurante',
      icon: GiWindmill,
      description: 'Restaurante',
    },
    {
      label: 'Recreación',
      icon: MdOutlineVilla,
      description: 'Recreación'
    },
    {
      label: 'Hospedaje',
      icon: TbMountain,
      description: 'Hospedaje'
    },
    {
      label: 'Parques',
      icon: TbPool,
      description: 'Parques'
    },
    {
      label: 'Zona selfie',
      icon: GiIsland,
      description: 'Zona selfie'
    },
    {
      label: 'jacuzzi',
      icon: GiBoatFishing,
      description: 'jacuzzi'
    },
    {
      label: 'Senderos',
      icon: FaSkiing,
      description: 'Senderos'
    },
    {
      label: 'Esculturas',
      icon: GiCastle,
      description: 'Esculturas'
    },
    {
      label: 'Historia',
      icon: GiCaveEntrance,
      description: 'Historia'
    },
    {
      label: 'Vitas panoramicas',
      icon: GiForestCamp,
      description: 'Vitas panoramicas'
    },
  ]