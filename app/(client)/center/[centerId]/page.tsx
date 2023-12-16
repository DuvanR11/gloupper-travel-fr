
import { getCurrentUser } from '@/app/actions/user'
import { getListingById, getListings, getPublications, getReservations,getReviews } from "@/app/actions/center";

import ClientOnly from "@/components/layouts/ClientOnly";

import ListingClient from "./ListingClient";
import { EmptyState } from '@/components/ui/loads';

interface IParams {
  centerId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const interesting = await getListings({});
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const reviews = await getReviews(params);
  const publications = await getPublications(params);
  
  

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
        interesting={interesting}
        reviews={reviews}
        publications={publications}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
