import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user";
import { IParamsCenter } from "@/interfaces";

  
export async function getTours(
    params: IParamsCenter
) {
  try {

    const currentUser = await getCurrentUser();

    if (!currentUser) { return [] }

    const { centerId } = params;

    let query: any = {};

    if ( centerId ) {
        query.centerId = centerId;
    }

    const tours = await prisma.tour.findMany({
      where: query,
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    });

    const safeTours = tours.map((tour) => ({
      ...tour,
    //   createdAt: listing.createdAt.toISOString(),
    }));

    return safeTours;
  } catch (error: any) {
    throw new Error(error);
  }
}
