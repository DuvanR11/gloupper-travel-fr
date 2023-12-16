import { Container } from "@/components/layouts";
import ListingCard from "@/components/center/cards/ListingCard";

import { getListings } from "./actions/center";
import { getCurrentUser } from '@/app/actions/user'
import Navbar from "@/components/ui/navbar/Navbar";
import { IParamsCenter } from "@/interfaces";
import { FooterClient } from "@/components/client/layout";
import { EmptyState } from "@/components/ui/loads";

interface HomeProps {
  searchParams: IParamsCenter
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  
  if (listings.length === 0) {
    return (
      <>
        <Navbar currentUser={currentUser}/>
        <div className="pb-20 pt-32">
          <EmptyState showReset />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar currentUser={currentUser}/>
      <div className="pb-10 pt-28">
        <Container>
          <div 
            className="
              pt-24
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
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
      </div>
      <FooterClient/>
    </>
  )
}

export default Home;
