
import EmptyState from "@/components/ui/loads/EmptyState";
import ClientOnly from "@/components/layouts/ClientOnly";

import { getCurrentUser } from '@/app/actions/user'
import { getReservations } from "@/app/actions/center";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="No autorizado"
          subtitle="Por favor Iniciar sesión"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No se encontraron viajes"
          subtitle="Parece que no has recibido ningún viaje."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default TripsPage;
