import { getListings } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import { EmptyState } from '@/components/ui/loads';
import { IParamsCenter } from '@/interfaces';


interface UserProps { searchParams: IParamsCenter };

const UsersPage = async ({ searchParams }: UserProps) => {
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

  return ( <p>Users</p> )
}

export default UsersPage