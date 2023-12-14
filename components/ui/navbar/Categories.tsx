'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiJourney,
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill,
  GiKneeling 
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
    icon: TbMountain,
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
    icon: TbBeach,
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