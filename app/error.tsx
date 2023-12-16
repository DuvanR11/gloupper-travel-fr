'use client';

import { EmptyState } from "@/components/ui/loads";
import { useEffect } from "react";


interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <EmptyState
      title="Uh Oh"
      subtitle="¡Algo salió mal!"
    />
   );
}
 
export default ErrorState;
