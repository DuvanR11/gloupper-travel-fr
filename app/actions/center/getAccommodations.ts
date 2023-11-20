import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user";
import { IParamsCenter } from "@/interfaces";

export async function getAccommodations(
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

    const accommodations = await prisma.accommodation.findMany({
      where: query,
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    });

    const SafeAccommodations = accommodations.map((accommodation) => ({
      ...accommodation,
    //   createdAt: listing.createdAt.toISOString(),
    }));

    return SafeAccommodations;
  } catch (error: any) {
    throw new Error(error);
  }
}
