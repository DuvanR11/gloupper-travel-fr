
import { getListings, getAttraction } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'

import AttractionsClient from './AttractionsClient';
import { IParamsCenter } from '@/interfaces';
import { EmptyState } from '@/components/ui/loads';

interface AttractionsPageProps { searchParams: IParamsCenter };

const AttractionsPage = async ({ searchParams }: AttractionsPageProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
        title="No autorizado"
        subtitle="Debes Iniciar Sesion"
        />
    }
    
    const center = await getListings({ centerId: searchParams.centerId })
    const attractions = await getAttraction({ centerId: center[0]?.id })

  if (!center) {
    return <EmptyState
      title="No hay centros registrados"
      subtitle="Debes Crear uno"
    />
  }

  return ( <AttractionsClient attractions={attractions} center={center[0]}/> )
}

export default AttractionsPage