import prisma from "@/libs/prismadb";

import { getCurrentUser } from "../user";

export async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) { return [] }

    const favorites = await prisma.center.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
