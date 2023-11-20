'use client';

import Select from 'react-select'

import { cities } from '@/utils';

export type CitySelectValue = {
  value: string,
  label: string,
  latlng: string[],
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: any) => void;
}

export const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {

    const formattedCity = cities.map((city) => ({
        value: city.name,
        label: city.name,
        latlng: [city.latitude, city.longitude],
    }));

      
  return ( 
    <div>
      <Select
        placeholder="Donde"
        isClearable
        options={formattedCity}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                Huila
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}
 