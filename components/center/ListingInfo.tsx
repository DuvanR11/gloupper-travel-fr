'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { 
  GiIsland,
} from 'react-icons/gi';
import ListingCategory from "./ListingCategory";
import ListingServices from "./ListingServices";

const Map = dynamic(() => import('../geolocalization/Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  services: string[]
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  locationValue,
  services
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div 
        className="
          text-xl 
          font-semibold 
        "
      >
        <div>Alojamiento vacacional entero - Anfitrión: Bestbooking</div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
        <div>
          <div className="font-semibold text-xl mb-4">Lo que este lugar ofrece</div>
          <div className="grid grid-cols-2 gap-5">
            {services.map((service, index) => (
              <ListingServices
              key={index}
              icon={GiIsland} 
              label={service}
              description={service} 
              />
            ))}
          </div>
        </div>
      <hr />
      <Map center={[2, 70]} />
    </div>
   );
}
 
export default ListingInfo;