
import { getCurrentUser } from '@/app/actions/user'
import { Navbar, SideMenu } from "@/components/center/layout";

export default async function DashboardLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    
    const currentUser = await getCurrentUser();
    return (
      <>
        <Navbar currentUser={ currentUser }/>
        <SideMenu/>
        <div className="p-4  h-screen sm:ml-64 bg-slate-100">
          <div className="p-4 mt-14">
            {children} 
          </div>
        </div>
      </>
    )
  }