import { IParamsCenter } from "@/interfaces";
import prisma from "@/libs/prismadb";


export async function getListingById(
  params: IParamsCenter
) {
  try {
    const { centerId, slug } = params;

    let search
    if (slug) {
      search = slug 
    } else {
      search = centerId
    }

    const listing = await prisma.center.findUnique({
      where: {
        id: search,
      },
      include: {
        user: true,
        accommodations: true,
        foods: true,
        tours: true,
        attractions: true,
      }
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
