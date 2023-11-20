import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user";
import { IParamsCenter } from "@/interfaces";


export async function getReservations(
  params: IParamsCenter
) {
  try {

    const currentUser = await getCurrentUser();

    if (!currentUser) { return [] }

    const { centerId, userId, authorId } = params;

    const query: any = {};
        
    if (centerId) {
      query.centerId  = centerId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.center = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        center: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.center,
        createdAt: reservation.center.createdAt.toISOString(),
        updatedAt: reservation.center.updatedAt.toISOString(),
      },
      updatedAt: reservation.updatedAt.toISOString(), 
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
