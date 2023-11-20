
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  Id?: string;
  center: any;
}

export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {

  const { Id } = params;

  if (!Id || typeof Id !== 'string') {
    throw new Error('Invalid ID');
  }

  const accommodation = await prisma.accommodation.findFirst({
    where: {
      slug: Id,
    }
  });

  return NextResponse.json(accommodation);
}

export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
  
    const { Id } = params;
  
    if (!Id || typeof Id !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const accommodation = await prisma.accommodation.deleteMany({
      where: {
        slug: Id,
      }
    });
    return NextResponse.json(accommodation);
  }

  
  export async function PUT(request: Request, 
    { params }: { params: IParams }
  ) {
    const { Id } = params;
  
    if (!Id || typeof Id !== 'string') {
      throw new Error('Invalid ID');
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
  
    const accommodation = await prisma.accommodation.update({
      where: {
        id: Id,
      },
      data: {
        name,
        slug,
        description,
        price,
        image,
        images,
      },
    })
  
    return NextResponse.json(accommodation);
  }