import { getListings, getTours, getWalletById } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import { IParamsCenter } from '@/interfaces';
import WalletClient from './WalletClient';
import { EmptyState } from '@/components/ui/loads';


interface WalletProps { searchParams: IParamsCenter };

const WalletPage = async ({ searchParams }: WalletProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
        title="No autorizado"
        subtitle="Debes Iniciar Sesion"
        />
    }
    
    const center = await getListings({ centerId: searchParams.centerId })
    const wallet = await getWalletById({ centerId: center[0]?.id })

    const tours = await getTours({ centerId: center[0]?.id })

  if (!center) {
    return <EmptyState
      title="No hay un centro registrado"
      subtitle="Debes Crear uno"
    />
  }

  return ( <WalletClient tours={tours} center={center[0]}/> )
}

export default WalletPage