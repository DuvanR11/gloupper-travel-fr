import { IconType } from "react-icons";

interface TextIconProps {
  icon: IconType,
  label: string,
  description?: string
  small?: boolean
}

export const TextIcon: React.FC<TextIconProps> = ({ 
  icon: Icon,
  label,
  description,
  small
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={`${small ? 28 : 40 }`} className="text-neutral-600" />
        <div className="flex flex-col">
            <div className={`${small ? 'font-light capitalize' : 'text-lg font-semibold'}`}>
              {label}
            </div>
            {
            description && (
              <div className="text-neutral-500 font-light">
                {description}
              </div>
            )
          }
        </div>
      </div>
    </div>
   );
}
 