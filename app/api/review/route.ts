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
    const { centerId, description } = body;
    
    const review = await prisma.reviews.create({
        data: {
            userId: currentUser.id,
            centerId,
            description,
        },
    });

    return NextResponse.json(review);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
