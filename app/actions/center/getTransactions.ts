import { IParamsCenter } from "@/interfaces";
import prisma from "@/libs/prismadb";


export async function getTransactions(
  params: IParamsCenter
) {
  try {
    const { walletId } = params;

    const transactions = await prisma.transaction.findMany({
        where: {
          walletId: "1234567890",
        },
      });

    if (!transactions) {
      return null;
    }

    return {
      ...transactions,
      // createdAt: transactions.createdAt.toString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
