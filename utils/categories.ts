import { TbMountain } from 'react-icons/tb';
import { 
  GiJourney,
  GiCastle, 
  GiWaterfall, 
  GiForestCamp, 
  GiIsland,
  GiWindmill,
  GiKneeling,
  GiRiver,
  GiMountainCave 
} from 'react-icons/gi';
import { IoRestaurantSharp } from "react-icons/io5";
import { MdOutlineVilla } from 'react-icons/md';

export const categories = [
    {
      label: 'Miradores',
      icon: TbMountain,
      description: 'Miradores',
    },
    {
      label: 'Recreacionales',
      icon: GiWindmill,
      description: 'Recreacionales',
    },
    {
      label: 'Quebradas',
      icon: GiRiver,
      description: 'Quebradas'
    },
    {
      label: 'Cascadas',
      icon: GiWaterfall,
      description: 'Cascadas'
    },
    {
      label: 'Parques',
      icon: GiIsland,
      description: 'Parques'
    },
    {
      label: 'Cuevas',
      icon: GiMountainCave,
      description: 'Cuevas'
    },
    {
      label: 'Senderos',
      icon: GiJourney,
      description: 'Senderos'
    },
    {
      label: 'Santuarios',
      icon: GiKneeling,
      description: 'Santuarios'
    },
    {
      label: 'Museos',
      icon: GiCastle,
      description: 'Museos'
    },
    {
      label: 'Camping',
      icon: GiForestCamp,
      description: 'Camping'
    },
    {
      label: 'Hotel',
      icon: MdOutlineVilla,
      description: 'Hotel'
    },
    {
      label: 'Restaurante',
      icon: IoRestaurantSharp,
      description: 'Restaurante'
    },
  ]