
import { getListings } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import EmptyState from '@/components/ui/loads/EmptyState';
import MultimediaClient from './MultimediaClient';
import { IParamsCenter } from '@/interfaces';

interface FoodPageProps { searchParams: IParamsCenter };

const MultimediaCenter = async ({ searchParams }: FoodPageProps) => {

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState
      title="No autorizado"
      subtitle="Debes Iniciar Sesion"
    />
  }

  const center = await getListings({ centerId: searchParams.centerId })

  if (!center) {
    return <EmptyState
      title="No hay un centro registrado"
      subtitle="Debes Crear uno"
    />
  }

  return ( <MultimediaClient center={center[0]}/> )
}

export default MultimediaCenter