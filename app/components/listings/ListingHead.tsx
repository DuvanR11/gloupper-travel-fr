'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

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
      <div className="flex flex-row">
        <Heading
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
        
      
        <HeartButton 
              listingId={id}
              currentUser={currentUser}
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
                    height={300}
                    className="object-cover w-full h-full"
                    alt="Image"
                  />
                </div>
              ))
            }
{/*               
              <div className="w-full h-auto overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  alt="Image"
                />
              </div>
              <div className="w-full h-auto overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  alt="Image"
                />
              </div>
              <div className="w-full h-auto overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  alt="Image"
                />
              </div> */}
          </div>
      </div>

    </>
   );
}
 
export default ListingHead;