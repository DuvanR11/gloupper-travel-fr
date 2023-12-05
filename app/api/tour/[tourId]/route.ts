
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  tourId?: string;
  center: any;
}

export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {

  const { tourId } = params;

  if (!tourId || typeof tourId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.tour.findFirst({
    where: {
      id: tourId,
    }
  });

  return NextResponse.json(listing);
}

export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
  
    const { tourId } = params;
  
    if (!tourId || typeof tourId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const food = await prisma.tour.deleteMany({
      where: {
        id: tourId,
      }
    });
    return NextResponse.json(food);
  }

  
  export async function PUT(request: Request, 
    { params }: { params: IParams }
  ) {
    const { tourId } = params;
  
    if (!tourId || typeof tourId !== 'string') {
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
  
    const tour = await prisma.tour.update({
      where: {
        id: tourId,
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
  
    return NextResponse.json(tour);
  }