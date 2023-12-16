import { getListings, getTours } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import TourClient from './TourClient';
import { IParamsCenter } from '@/interfaces';
import { EmptyState } from '@/components/ui/loads';


interface TourPageProps { searchParams: IParamsCenter };

const TourPage = async ({ searchParams }: TourPageProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
        title="No autorizado"
        subtitle="Debes Iniciar Sesion"
        />
    }
    
    const center = await getListings({ centerId: searchParams.centerId })
    const tours = await getTours({ centerId: center[0]?.id })

  if (!center) {
    return <EmptyState
      title="No hay un centro registrado"
      subtitle="Debes Crear uno"
    />
  }

  return ( <TourClient tours={tours} center={center[0]}/> )
}

export default TourPage