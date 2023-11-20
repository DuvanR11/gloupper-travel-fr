import { getListings, getAccommodations } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import EmptyState from '@/components/ui/loads/EmptyState';

import AccommodationClient from './AccommodationClient';
import { IParamsCenter } from '@/interfaces';

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

  return ( <AccommodationClient accommodations={accommodations}/> )
}

export default AccommodationPage