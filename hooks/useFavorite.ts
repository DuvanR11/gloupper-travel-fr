import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import { useLoginModal } from "./modal/auth";

interface IUseFavorite {
  centerId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ centerId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(centerId);
  }, [currentUser, centerId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${centerId}`);
      } else {
        request = () => axios.post(`/api/favorites/${centerId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    centerId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
