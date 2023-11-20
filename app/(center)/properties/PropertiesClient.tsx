'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/components/ui/headers/Heading";
import Container from "@/components/layouts/Container";
import ListingCard from "@/components/center/cards/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);


  return ( 
    <Container>
      <Heading
        title="Mis Propiedades"
        subtitle="Lista de tus propiedades"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Eliminar Propiedad"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default PropertiesClient;