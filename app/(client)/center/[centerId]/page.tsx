
import { getCurrentUser } from '@/app/actions/user'
import { getListingById, getReservations } from "@/app/actions/center";

import ClientOnly from "@/components/layouts/ClientOnly";
import EmptyState from "@/components/ui/loads/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  centerId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
