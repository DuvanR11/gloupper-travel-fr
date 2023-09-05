import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  locationValue?: string;
  category?: string;
  services?: string[]
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      locationValue,
      category,
      services
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (services && services.length > 0) {
      query.services = {
        hasSome: services
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
