import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      image,
      images,
    } = body;
    
    const accommodation = await prisma.accommodation.create({
      data: {
        name,
        slug,
        description,
        price,
        image,
        images,
        center: {
          connect: {
            id: '652efb576f68c9b7710d72d1',
          },
        },
      },
    });
    

    return NextResponse.json(accommodation);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
