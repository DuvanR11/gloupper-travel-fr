import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import Select from 'react-select';
// data.ts

  export const countries = [
    { id: '1', name: 'Colombia' },
    // Agrega más países aquí
  ];
  
  export const departments = [
    { id: '1', countryId: '1', name: 'Huila' },
    // Agrega más departamentos aquí
  ];
  
  export const cities = [
    {
      id: '1',
      departmentId: '1',
      name: 'Neiva',
      latitude: '2.9984',
      longitude: '-75.3037',
    },
    {
      id: '2',
      departmentId: '1',
      name: 'Pitalito',
      latitude: '1.8485',
      longitude: '-76.0466',
    },
    {
      id: '3',
      departmentId: '1',
      name: 'Garzón',
      latitude: '2.1912',
      longitude: '-75.6266',
    },
    {
      id: '4',
      departmentId: '1',
      name: 'Huila',
      latitude: '2.5356',
      longitude: '-75.5277',
    },
    {
      id: '5',
      departmentId: '1',
      name: 'La Plata',
      latitude: '2.3879',
      longitude: '-75.9211',
    },
    {
      id: '6',
      departmentId: '1',
      name: 'Campoalegre',
      latitude: '2.6861',
      longitude: '-75.3176',
    },
    {
      id: '7',
      departmentId: '1',
      name: 'Palermo',
      latitude: '2.9022',
      longitude: '-75.9645',
    },
    {
      id: '8',
      departmentId: '1',
      name: 'Isnos',
      latitude: '1.9083',
      longitude: '-76.1212',
    },
    {
      id: '9',
      departmentId: '1',
      name: 'Timaná',
      latitude: '2.9583',
      longitude: '-75.8537',
    },
    {
      id: '10',
      departmentId: '1',
      name: 'Baraya',
      latitude: '2.3969',
      longitude: '-75.2842',
    },
    {
      id: '11',
      departmentId: '1',
      name: 'Acevedo',
      latitude: '1.8654',
      longitude: '-76.1057',
    },
    {
      id: '12',
      departmentId: '1',
      name: 'Agrado',
      latitude: '2.2543',
      longitude: '-75.7581',
    },
    {
      id: '13',
      departmentId: '1',
      name: 'Santa María',
      latitude: '2.7114',
      longitude: '-75.8208',
    },
    {
      id: '14',
      departmentId: '1',
      name: 'Tello',
      latitude: '3.0601',
      longitude: '-75.1588',
    },
    {
      id: '15',
      departmentId: '1',
      name: 'Teruel',
      latitude: '3.0638',
      longitude: '-75.1684',
    },
    {
      id: '16',
      departmentId: '1',
      name: 'Tesalia',
      latitude: '2.4585',
      longitude: '-75.8521',
    },
    {
      id: '17',
      departmentId: '1',
      name: 'Yaguará',
      latitude: '2.6462',
      longitude: '-75.2601',
    },
    {
      id: '18',
      departmentId: '1',
      name: 'Saladoblanco',
      latitude: '2.8816',
      longitude: '-75.8276',
    },
    {
      id: '19',
      departmentId: '1',
      name: 'Paicol',
      latitude: '2.3368',
      longitude: '-75.9883',
    },
    {
      id: '20',
      departmentId: '1',
      name: 'Oporapa',
      latitude: '2.1193',
      longitude: '-75.9834',
    },
    {
      id: '21',
      departmentId: '1',
      name: 'Gigante',
      latitude: '2.3677',
      longitude: '-75.5695',
    },
    {
      id: '22',
      departmentId: '1',
      name: 'La Argentina',
      latitude: '2.3408',
      longitude: '-75.9827',
    },
    {
      id: '23',
      departmentId: '1',
      name: 'Algeciras',
      latitude: '2.2359',
      longitude: '-75.9913',
    },
    {
      id: '24',
      departmentId: '1',
      name: 'Nátaga',
      latitude: '2.5401',
      longitude: '-75.8392',
    },
    {
      id: '25',
      departmentId: '1',
      name: 'Íquira',
      latitude: '2.8371',
      longitude: '-75.8374',
    },
    {
      id: '26',
      departmentId: '1',
      name: 'San Agustín',
      latitude: '1.8716',
      longitude: '-76.2492',
    },
    {
      id: '27',
      departmentId: '1',
      name: 'Elias',
      latitude: '2.3427',
      longitude: '-75.9589',
    },
    {
      id: '28',
      departmentId: '1',
      name: 'Guadalupe',
      latitude: '2.1512',
      longitude: '-75.8343',
    },
    {
      id: '29',
      departmentId: '1',
      name: 'Albania',
      latitude: '1.1811',
      longitude: '-76.8702',
    },
    {
      id: '30',
      departmentId: '1',
      name: 'El Pital',
      latitude: '2.2775',
      longitude: '-76.0327',
    },
    {
      id: '31',
      departmentId: '1',
      name: 'Timaná',
      latitude: '2.9583',
      longitude: '-75.8537',
    },
    {
      id: '32',
      departmentId: '1',
      name: 'Villavieja',
      latitude: '3.2999',
      longitude: '-75.1873',
    },
    {
      id: '33',
      departmentId: '1',
      name: 'Aipe',
      latitude: '2.5073',
      longitude: '-75.8676',
    },
    {
      id: '34',
      departmentId: '1',
      name: 'Altamira',
      latitude: '1.4895',
      longitude: '-76.0605',
    },
    {
      id: '35',
      departmentId: '1',
      name: 'Palestina',
      latitude: '1.6072',
      longitude: '-76.0979',
    },
    {
      id: '36',
      departmentId: '1',
      name: 'Rivera',
      latitude: '2.7667',
      longitude: '-75.2679',
    },
    {
      id: '37',
      departmentId: '1',
      name: 'Suaza',
      latitude: '1.9329',
      longitude: '-76.1661',
    },
    // Puedes seguir agregando más municipios aquí
  ];

  interface LocationSelectProps {
    value?: any;
    onChange: (value: any) => void;
  }

  
const LocationSelects: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<any |  null>({});

  console.log(selectedCity)


  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [selectedCity]);

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const cityPrueba = cities.map((city) => ({
    value: {name: city.name, latlng: [city.latitude,  city.longitude] },
    label: city.name,
  }));

  const departmentOptions = departments
    .filter((department) => department.countryId === selectedCountry)
    .map((department) => ({
      value: department.id,
      label: department.name,
    }));

  const cityOptions = cities
    .filter((city) => city.departmentId === selectedDepartment)
    .map((city) => ({
      value: {id: city.id, latlng: [city.latitude,  city.longitude] },
      label: city.name,
    }));

    const handleCountryChange = (selectedOption: any) => {
      setSelectedCountry(selectedOption?.value || null);
      setSelectedDepartment(null);
      setSelectedCity(null);
    };
    
    const handleDepartmentChange = (selectedOption: any) => {
      setSelectedDepartment(selectedOption?.value || null);
      setSelectedCity(null);
    };
    
    const handleCityChange = (selectedOption: any) => {
      setSelectedCity(selectedOption?.value || null);
      const updatedValue = {
        country: selectedCountry,
        department: selectedDepartment,
        city: selectedOption,
      };
      console.log('po', updatedValue)
      onChange(updatedValue);
    };

    const handlePrueba = (selectedOption: any) => {
      setSelectedCity(selectedOption?.value || null);
      onChange(selectedOption);
      console.log(selectedCity)
    };


  return (
    <div className='flex flex-col gap-6'>
      {/* Select de Países 
      <Select
        placeholder="Selecciona un país"
        isClearable
        options={countryOptions}
        value={countryOptions.find((option: any) => option.value === selectedCountry)}
        onChange={handleCountryChange}
      /> */}

      {/* Select de Departamentos 
      {selectedCountry && (
        <Select
          placeholder="Selecciona un departamento"
          isClearable
          options={departmentOptions}
          value={departmentOptions.find((option: any) => option.value === selectedDepartment)}
          onChange={handleDepartmentChange}
        />
      )} */}

      {/* Select de Ciudades */}
      {/* {selectedDepartment && ( */}
        <Select
          placeholder="Selecciona una ciudad"
          isClearable
          options={cityPrueba}
          // onChange={handleCityChange}
          value={cityPrueba.find((option: any) => option.value === selectedCity)}
          onChange={handlePrueba}
        />
      {/* )} */}

        <Map center={selectedCity?.latlng} />
    </div>
  );
};

export default LocationSelects;
