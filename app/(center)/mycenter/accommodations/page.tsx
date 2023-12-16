import { getListings, getAccommodations } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'

import AccommodationClient from './AccommodationClient';
import { IParamsCenter } from '@/interfaces';
import { EmptyState } from '@/components/ui/loads';

interface TourPageProps { searchParams: IParamsCenter };

const AccommodationPage = async ({ searchParams }: TourPageProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
        title="No autorizado"
        subtitle="Debes Iniciar Sesion"
        />
    }
    
    const center = await getListings({ centerId: searchParams.centerId })
    const accommodations = await getAccommodations({ centerId: center[0]?.id })

  if (!center) {
    return <EmptyState
      title="No hay un centro registrado"
      subtitle="Debes Crear uno"
    />
  }

  return ( <AccommodationClient accommodations={accommodations} center={center[0]}/> )
}

export default AccommodationPage