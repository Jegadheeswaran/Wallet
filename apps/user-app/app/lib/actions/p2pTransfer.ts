"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return {
      Message: "User not logged in",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      Message: "User not found",
    };
  }

  await prisma.$transaction(async (tx) => {
    //raw query is used to lock the rows --> to ensure
    // that only one transaction can access it at at time,
    // and the other one waits until the first transaction has committed
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(userId),
      },
    });

    if (!balance || balance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    await tx.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await tx.p2PTransaction.create({
      data: {
        amount: amount,
        status: "Success",
        timestamp: new Date(),
        fromUserId: Number(userId),
        toUserId: toUser.id,
      },
    });
  });
}
