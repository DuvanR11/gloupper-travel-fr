'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../../CategoryBox";
import Container from '../../layouts/Container';


export const categories = [
  {
    label: 'Miradores',
    icon: TbBeach,
    description: 'Miradores',
  },
  {
    label: 'Recreacionales',
    icon: GiWindmill,
    description: 'Recreacionales',
  },
  {
    label: 'Ríos',
    icon: MdOutlineVilla,
    description: 'Ríos'
  },
  {
    label: 'Quebradas',
    icon: TbMountain,
    description: 'Quebradas'
  },
  {
    label: 'Cascadas',
    icon: TbPool,
    description: 'Cascadas'
  },
  {
    label: 'Parques',
    icon: GiIsland,
    description: 'Parques'
  },
  {
    label: 'Cuevas',
    icon: GiBoatFishing,
    description: 'Cuevas'
  },
  {
    label: 'Senderos',
    icon: FaSkiing,
    description: 'Senderos'
  },
  {
    label: 'Santuarios',
    icon: GiCastle,
    description: 'Santuarios'
  },
  {
    label: 'Museos',
    icon: GiCaveEntrance,
    description: 'Museos'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'Camping'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;