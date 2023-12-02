import { getCurrentUser } from '@/app/actions/user'
import { FooterClient } from '@/components/client/layout';
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
        <div className="pb-10 pt-28">
          {children}
        </div>
        <FooterClient/>
      </>
    )
  }