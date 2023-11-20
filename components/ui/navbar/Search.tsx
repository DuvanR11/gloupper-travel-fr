'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

import useSearchModal from '@/hooks/modal/useSearchModal';
import useCountries from '@/hooks/useCountries';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const  locationValue = params?.get('locationValue'); 
  const  category = params?.get('category'); 
  const  services = params?.get('services'); 

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return locationValue
    }

    return 'Viaja por el Huila';
  }, [locationValue]);

  const categoryLabel = useMemo(() => {
    if (category) {
      return category;
    }

    return 'Categoria'
  }, [category]);

  const servicesLabel = useMemo(() => {
    if (services) {
      return services;
    }

    return 'Servicios';
  }, [services]);

  return ( 
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {categoryLabel}
        </div>
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{servicesLabel}</div>
          <div 
            className="
              p-2 
              bg-cyan-600
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;