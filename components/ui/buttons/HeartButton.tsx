'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "../../layouts/ClientOnly";

interface HeartButtonProps {
  centerId: string
  currentUser?: SafeUser | null
  text?: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  centerId,
  currentUser,
  text
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    centerId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="
        hover:opacity-80
        transition
        cursor-pointer
        flex
        flex-row
        gap-2
      "
    >
      <div className="relative">
        <AiOutlineHeart
          size={28}
          className="
            fill-white
            absolute
            -top-[2px]
            -right-[2px]
          "
        />
        <AiFillHeart
          size={24}
          className={
            hasFavorited ? 'fill-cyan-500' : 'fill-neutral-500/70'
          }
        />
      </div>
      { text && (
        <p className="fill-neutral-500/20 underline">Guardar</p>
      )}
    </div>
   );
}
 
export default HeartButton;