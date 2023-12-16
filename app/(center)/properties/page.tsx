

import ClientOnly from "@/components/layouts/ClientOnly";

import { getCurrentUser } from '@/app/actions/user'
import { getListings } from "@/app/actions/center";

import PropertiesClient from "./PropertiesClient";
import Navbar from "@/components/ui/navbar/Navbar";
import { EmptyState } from "@/components/ui/loads";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="No autorizado"
      subtitle="Por favor Iniciar sesión"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Navbar currentUser={currentUser}/>
        <div className="pb-10 pt-28">
          <EmptyState
            title="No se encontraron centros"
            subtitle="Parece que no tienes propiedades."
          />
        </div>
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
