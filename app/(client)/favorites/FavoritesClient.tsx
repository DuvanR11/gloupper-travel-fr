import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/components/ui/headers/Heading";
import Container from "@/components/layouts/Container";
import ListingCard from "@/components/center/cards/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Mis favoritos"
        subtitle="¡Lista de lugares que te gustaron!"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-4
          gap-6
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default FavoritesClient;