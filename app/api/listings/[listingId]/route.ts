import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/user";
import prisma from "@/libs/prismadb";

interface IParams {
  centerId?: string;
  center: any;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {

  const { centerId } = params;

  if (!centerId || typeof centerId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.center.deleteMany({
    where: {
      id: centerId,
    }
  });

  return NextResponse.json(listing);
}

export async function PUT(request: Request, 
  { params }: { params: IParams }
) {
  const { centerId } = params;

  if (!centerId || typeof centerId !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    services,
    category,
    departament,
    city,
    images,
   } = body;

   console.log('Nuevo ----------', images)

  const UpdateCenter = await prisma.center.update({
    where: {
      id: centerId,
    },
    data: {
      title,
      description,
      imageSrc,
      services,
      category,
      departament,
      city,
      images,
    },
  })

  console.log(UpdateCenter)
  return NextResponse.json(UpdateCenter);
}