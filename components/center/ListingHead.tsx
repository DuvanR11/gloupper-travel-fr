'use client';

import Image from "next/image";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../ui/headers/Heading";
import HeartButton from "../ui/buttons/HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  images: string[]
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  images,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return ( 
    <>
      <div className="flex flex-row items-end justify-between">
        <Heading
          title={title}
          subtitle={`Huila, ${locationValue}`}
        />
        
      
        <HeartButton 
              centerId={id}
              currentUser={currentUser}
              text={true}
            />
      </div>

      <div className="grid grid-cols-2 gap-3  h-[50vh]">
          <div className="w-full h-auto overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                width={300}
                height={300}
                className="object-cover w-full h-full"
                alt="Image"
              />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {
              images.map((image: any, index) => (
                <div className="w-full h-auto overflow-hidden rounded-lg" key={index}>
                  <Image
                    src={image}
                    width={300}
                    height={150}
                    style={{ objectFit: 'cover', height: 150 }}
                    alt="Image"
                  />
                </div>
              ))
            }
          </div>
      </div>

    </>
   );
}
 
export default ListingHead;