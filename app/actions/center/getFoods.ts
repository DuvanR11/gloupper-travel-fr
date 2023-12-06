import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user";
import { IParamsCenter } from "@/interfaces";


export async function getFoods(
    params: IParamsCenter
) {
  try {

    const currentUser = await getCurrentUser();

    if (!currentUser) { return [] }

    const { centerId, page = 1, pageSize = 5 } = params;

    let query: any = {};

    if ( centerId ) {
        query.centerId = centerId;
    }
    
    const foods = await prisma.food.findMany({
      where: query,
      // skip: (page - 1) * pageSize,
      // take: pageSize,
    });

    const safeFoods = foods.map((food) => ({
      ...food,
    //   createdAt: listing.createdAt.toISOString(),
    }));

    return safeFoods;
  } catch (error: any) {
    throw new Error(error);
  }
}
