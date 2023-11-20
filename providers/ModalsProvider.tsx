'use client';

import { LoginModal, RegisterModal, RentModal, SearchModal } from "@/components/ui/modals";

export const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal/>
      <RegisterModal/>
      <SearchModal/>
      <RentModal/>
    </>
   );
}
 