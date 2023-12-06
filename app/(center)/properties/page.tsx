
import EmptyState from "@/components/ui/loads/EmptyState";
import ClientOnly from "@/components/layouts/ClientOnly";

import { getCurrentUser } from '@/app/actions/user'
import { getListings } from "@/app/actions/center";

import PropertiesClient from "./PropertiesClient";
import Navbar from "@/components/ui/navbar/Navbar";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser}/>
      <div className="pb-10 pt-28">
        <PropertiesClient
          listings={listings}
          currentUser={currentUser}
        />
      </div>
    </ClientOnly>
  );
}
 
export default PropertiesPage;
