import { Card } from "@repo/ui/card";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { P2pTransaction } from "../../../components/P2pTransaction";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";



async function getAllP2PTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2PTransaction.findMany({
   
    where: {
      OR: [
        {
          fromUserId: Number(session?.user?.id),
        },
        {
          toUserId: Number(session?.user?.id),
        },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },  
    include : {
      toUser : true
    }
  });

  return transactions.map((trx) => ({
    time: trx.timestamp,
    amount: trx.amount,
    status: trx.status,
    toUserId: trx.toUserId,
    fromUserId: trx.fromUserId,
    name : trx.toUser.name
  }));
}

async function getAllOnRampTransaction() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    select: {
      startTime: true,
      amount: true,
      status: true,
      provider: true,
    },
    orderBy : {
      startTime : 'desc'
    }
  });

  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const p2pTranactions = await getAllP2PTransactions();
  const getOnRampTransactions = await getAllOnRampTransaction();

  return (
    <div>
      <div className="text-4xl text-[#6a51a6] pl-4 pt-8 mb-8 font-bold">
        Transaction History
      </div>
      <div className="grid grid-cols-2">
        <div className="p-2">
          <OnRampTransaction transactions={getOnRampTransactions} title={"Bank transaction history"} />
        </div>
        <div className="p-2">
          <P2pTransaction  transactions={p2pTranactions} title={"Peer to peer transaction history"} />
        </div>
      </div>
    </div>
  );
}
