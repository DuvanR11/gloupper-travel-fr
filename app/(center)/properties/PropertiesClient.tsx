'use client';

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "@/components/center/cards/ListingCard";
import { Heading } from "@/components/ui/headers";
import { Container } from "@/components/layouts";

interface PropertiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();

  const hanldeAdmin = useCallback((id: string) => {
    router.push(`/mycenter?centerId=${id}`)
  }, [router]);


  return ( 
    <Container>
      <Heading
        title="Mis Propiedades"
        subtitle="Lista de tus propiedades"
      />
      <div 
        className="
          mt-8
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
            onAction={hanldeAdmin}
            actionLabel="Administrar"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default PropertiesClient;