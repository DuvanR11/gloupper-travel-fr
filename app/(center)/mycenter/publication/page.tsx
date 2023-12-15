import { getListings, getTours } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import EmptyState from '@/components/ui/loads/EmptyState';
import { IParamsCenter } from '@/interfaces';
import PublicationClient from './PublicationClient';


interface TourPageProps { searchParams: IParamsCenter };

const PublicationPage = async ({ searchParams }: TourPageProps) => {
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

  return ( <PublicationClient publication={tours} center={center[0]}/> )
}

export default PublicationPage