
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationsClient";

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
