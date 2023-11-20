
import { getListings, getAttraction } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import EmptyState from '@/components/ui/loads/EmptyState';

import AttractionsClient from './AttractionsClient';
import { IParamsCenter } from '@/interfaces';

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

  return ( <AttractionsClient attractions={attractions}/> )
}

export default AttractionsPage