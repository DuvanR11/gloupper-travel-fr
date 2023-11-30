import { IParamsCenter } from "@/interfaces";
import prisma from "@/libs/prismadb";


export async function getWalletById(
  params: IParamsCenter
) {
  try {
    const { centerId } = params;

    const wallet = await prisma.wallet.findUnique({
      where: {
        centerId: centerId,
      }
    });

    if (!wallet) {
      return null;
    }

    return {
      ...wallet,
      createdAt: wallet.createdAt.toString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
