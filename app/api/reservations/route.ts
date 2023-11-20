import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/user";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    centerId,
    startDate,
    endDate,
    totalPrice
   } = body;

   if (!centerId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.center.update({
    where: {
      id: centerId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation);
}
