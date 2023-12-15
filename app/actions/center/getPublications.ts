import { IParamsCenter } from "@/interfaces";
import prisma from "@/libs/prismadb";


export async function getPublications(
  params: IParamsCenter
) {
  try {
    const { centerId } = params;
    const post = await prisma.post.findMany({
        where: {
          centerId: centerId,
        },
        include: {
            user: true,
        }
      });

   
    if (!post) {
      return null;
    }

    const SafePost = post.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    }));

    return SafePost

  } catch (error: any) {
    throw new Error(error);
  }
}
