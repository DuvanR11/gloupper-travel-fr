
import { getCurrentUser } from '@/app/actions/user'
import ClientOnly from '@/components/layouts/ClientOnly'
import { UserLayout } from '@/components/layouts/UserLayout'
import React from 'react'

const AccountBasic = async () => {
  
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
        <UserLayout title='' user={currentUser}>
          <div>page</div>
        </UserLayout>
    </ClientOnly>
  )
}

export default AccountBasic