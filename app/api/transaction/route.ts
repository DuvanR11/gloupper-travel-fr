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
    const { walletId, amount, type } = body;
    
    const transaction = await prisma.transaction.create({
      data: {
        walletId,
        amount,
        type,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
