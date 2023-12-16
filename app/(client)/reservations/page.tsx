
import ClientOnly from "@/components/layouts/ClientOnly";

import { getCurrentUser } from '@/app/actions/user'
import { getReservations } from "@/app/actions/center";

import TripsClient from "./ReservationsClient";
import { EmptyState } from "@/components/ui/loads";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="No autorizado"
          subtitle="Por favor Iniciar sesión"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No se encontraron reservas"
          subtitle="Parece que no tienes reservas sobre tus propiedades."
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
 
export default ReservationsPage;
