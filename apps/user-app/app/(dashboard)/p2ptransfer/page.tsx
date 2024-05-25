import { SendMoney } from "../../../components/SendMoney";
import { P2pTransaction } from "../../../components/P2pTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2PTransaction.findMany({
    take: 5,
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

export default async function () {
  const transactions = await getP2PTransactions();
  return (
    <div>
      <div className="text-4xl text-[#6a51a6] pl-4 pt-8 mb-8 font-bold">
        Peer to Peer Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div className="">
          <SendMoney  />
        </div>
        <div className="">
          <P2pTransaction isButtonRequired={true} title="Recent transactions" transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
