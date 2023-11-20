
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  foodId?: string;
  center: any;
}

export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {

  const { foodId } = params;

  if (!foodId || typeof foodId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.food.findFirst({
    where: {
      slug: foodId,
    }
  });

  return NextResponse.json(listing);
}

export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
  
    const { foodId } = params;
  
    if (!foodId || typeof foodId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const food = await prisma.food.deleteMany({
      where: {
        slug: foodId,
      }
    });
    console.log(food)
    return NextResponse.json(food);
  }

  
  export async function PUT(request: Request, 
    { params }: { params: IParams }
  ) {
    const { foodId } = params;
  
    if (!foodId || typeof foodId !== 'string') {
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
  
    const updateFood = await prisma.food.update({
      where: {
        id: foodId,
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
  
    return NextResponse.json(updateFood);
  }