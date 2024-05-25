"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

function generateRandomString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const createOnRampTransaction = async (
  amount: number,
  provider: string,
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  //token needs to come from bank, as we are not connecting to banks
  //we are simulating token in here.
  const token = generateRandomString();
  if (!userId) {
    return {
      Message: "User not logged in",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      token,
      provider,
      amount,
      userId: Number(userId),
      startTime: new Date(),
      status: "Processing",
    },
  });

  return {
    Message: "OnRamp transaction is created", 
  };
};
