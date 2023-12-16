'use client';

import { useRouter } from "next/navigation";

import Button from "../buttons/Button";
import { Heading } from "../headers";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No hay coincidencias exactas",
  subtitle = "Intenta cambiar o eliminar algunos de sus filtros.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Quitar todos los filtros"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 