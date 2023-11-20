'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div className="flex flex-row items-center">
       <Image
        onClick={() => router.push('/')}
        className="hidden md:block cursor-pointer" 
        src="/images/logo.svg" 
        height={50}
        width={50} 
        style={{ height: 50 }}
        alt="Logo" 
      />
      <div className="font-bold text-cyan-600 scale-y-125">
        Gloupper
      </div>
    </div>
   );
}
 
export default Logo;
