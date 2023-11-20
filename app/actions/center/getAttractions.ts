import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user";
import { IParamsCenter } from "@/interfaces";
  
export async function getAttraction(
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

    const attractions = await prisma.attraction.findMany({
      where: query,
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    });

    const SafeAttraction = attractions.map((attraction) => ({
      ...attraction,
    //   createdAt: listing.createdAt.toISOString(),
    }));

    return SafeAttraction;
  } catch (error: any) {
    throw new Error(error);
  }
}
