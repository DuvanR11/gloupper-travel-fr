
import { getCurrentUser } from '@/app/actions/user'
import { getListingById, getReservations } from "@/app/actions/center";

import ClientOnly from "@/components/layouts/ClientOnly";
import EmptyState from "@/components/ui/loads/EmptyState";

import ListingClient from "./ListingClient";
import { getReviews } from '@/app/actions/center/getReviews';

interface IParams {
  centerId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const reviews = await getReviews(params);
  

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
        currentUser={currentUser}
        reservations={reservations}
        listing={listing}
        reviews={reviews}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
