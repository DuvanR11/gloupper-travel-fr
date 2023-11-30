import { getListings, getFoods } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import EmptyState from '@/components/ui/loads/EmptyState';
import FoodClient from './FoodClient';
import { IParamsCenter } from '@/interfaces';

interface FoodPageProps { searchParams: IParamsCenter };

const FoodPage = async ({ searchParams }: FoodPageProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
        title="No autorizado"
        subtitle="Debes Iniciar Sesion"
        />
    }
    
    const center = await getListings({ centerId: searchParams.centerId })
    const foods = await getFoods({ centerId: center[0]?.id })

  if (!center) {
    return <EmptyState
      title="No hay un centro registrado"
      subtitle="Debes Crear uno"
    />
  }

  return ( <FoodClient foods={foods} center={center[0]}/> )
}

export default FoodPage