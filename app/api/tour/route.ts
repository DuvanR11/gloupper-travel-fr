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
      centerId,
      name,
      slug,
      description,
      price,
      image,
      images,
    } = body;
    
    const tour = await prisma.tour.create({
      data: {
        name,
        slug,
        description,
        price,
        image,
        images,
        center: {
          connect: {
            id:  centerId,
          },
        },
      },
    });
    

    return NextResponse.json(tour);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
