import { getCurrentUser } from '@/app/actions/user'
import Navbar from "@/components/ui/navbar/Navbar";

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const currentUser = await getCurrentUser();
    return (
      <>
        <Navbar currentUser={currentUser}/>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </>
    )
  }