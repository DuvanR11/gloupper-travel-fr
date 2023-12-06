
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  attractionsId?: string;
  center: any;
}

export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {

  const { attractionsId } = params;

  if (!attractionsId || typeof attractionsId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.attraction.findFirst({
    where: {
      id: attractionsId,
    }
  });

  return NextResponse.json(listing);
}

export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
  
    const { attractionsId } = params;
  
    if (!attractionsId || typeof attractionsId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const attraction = await prisma.attraction.deleteMany({
      where: {
        id: attractionsId,
      }
    });
    return NextResponse.json(attraction);
  }

  
  export async function PUT(request: Request, 
    { params }: { params: IParams }
  ) {
    const { attractionsId } = params;
  
    if (!attractionsId || typeof attractionsId !== 'string') {
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
  
    const attraction = await prisma.attraction.update({
      where: {
        id: attractionsId,
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
  
    return NextResponse.json(attraction);
  }