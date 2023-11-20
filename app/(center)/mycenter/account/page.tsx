
import { getListings } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import EmptyState from '@/components/ui/loads/EmptyState';
import AccountClient from './AccountClient';
import { IParamsCenter } from '@/interfaces';

interface TourPageProps { searchParams: IParamsCenter };

const Account = async ({ searchParams }: TourPageProps) => {

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

  return ( <AccountClient center={center[0]} currentUser={currentUser}/> )
}

export default Account