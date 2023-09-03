import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const {
      title,
      description,
      services,
      category,
      location,
      imageSrc,
      images,
      price,
      guestCount,
      roomCount,
      bathroomCount,
    } = body;

    console.log(location)
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        services,
        category,
        departamentValue: location,
        locationValue: location,
        imageSrc,
        images,
        price,
        guestCount,
        roomCount,
        bathroomCount,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    

    return NextResponse.json(listing);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
