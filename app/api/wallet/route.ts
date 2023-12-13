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
    const { centerId } = body;
    
    const wallet = await prisma.wallet.create({
      data: {
        centerId,
        balance: 0
      },
    });
    

    return NextResponse.json(wallet);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
