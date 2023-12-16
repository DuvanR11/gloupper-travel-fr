import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";
import { GiIsland } from 'react-icons/gi';
import { TextIcon } from "../../ui/text";


interface InformationSectionProps {
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

export const InformationSection: React.FC<InformationSectionProps> = ({
  description,
  category,
  services
}) => {

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="text-xl font-semibold">
        Alojamiento vacacional entero - Anfitrión: Bestbooking
      </div>
      <hr />
      {category && (
        <TextIcon
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
        <div>
          <div className="font-semibold text-xl mb-4">Lo que este lugar ofrece</div>
          <div className="grid grid-cols-2 gap-5">
            {services.map((service, index) => (
              <TextIcon
                key={index}
                icon={GiIsland} 
                label={service}
                small={ true }
              />
            ))}
          </div>
        </div>
      <hr />
    </div>
   );
}
 