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
            id: centerId,
          },
        },
      },
    });
    

    return NextResponse.json(accommodation);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
