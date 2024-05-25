import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalnce() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransaction() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.onRampTransaction.findMany({
    take: 3,
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

export default async function Page() {
  const balance = await getBalnce();
  const transactions = await getOnRampTransaction();

  return (
    <div className="">
      <div className="text-4xl text-[#6a51a6] pl-4 pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransaction isButtonRequired={true} title="Recent transactions" transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
