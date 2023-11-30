import { IParamsCenter } from "@/interfaces";
import prisma from "@/libs/prismadb";


export async function getReviews(
  params: IParamsCenter
) {
  try {
    const { centerId } = params;
    console.log(centerId)
    const reviews = await prisma.reviews.findMany({
        where: {
          centerId: centerId,
        },
        include: {
            user: true,
        }
      });

   
    if (!reviews) {
      return null;
    }

    const SafeReviews = reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    }));

    return SafeReviews

  } catch (error: any) {
    throw new Error(error);
  }
}
