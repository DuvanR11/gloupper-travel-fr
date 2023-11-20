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
      title,
      description,
      services,
      category,
      location,
      imageSrc,
      images,
    } = body;

    
    const listing = await prisma.center.create({
      data: {
        title,
        description,
        services,
        category,
        departament: 'Huila',
        city: location,
        imageSrc,
        images,
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
