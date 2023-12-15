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
    const { centerId, title, content, images } = body;
    
    const post = await prisma.post.create({
        data: {
            userId: currentUser.id,
            ...(centerId && { centerId }),
            title,
            content,
            images
        },
    });

    console.log(post)
    
    return NextResponse.json(post);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
