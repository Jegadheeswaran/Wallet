import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { AllTransaction } from "./AllTransaction";

export const P2pTransaction = async ({
  title,
  transactions,
  isButtonRequired
}: {
  title : string,
  transactions: {
    time: Date;
    amount: number;
    status: string;
    toUserId: number;
    fromUserId: number;
    name : string
  }[],
  isButtonRequired? : boolean
}) => {
  const session = await getServerSession(authOptions);
  const currentUser = Number(session?.user?.id);

  if (!transactions.length) {
    return (
      <Card title={title}>
        <div className="text-center py-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title={title}>
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between border-b-2 p-4">
            <div>
              <div className="text-sm">
                {currentUser === t.fromUserId ? " Sent to" : "Recived from"} {t.name[0]?.toUpperCase()+t.name.slice(1)}
              </div>
              <div className="text-slate-600 text-xs  pt-2">
               {t.time.toDateString()} {t.time.getHours()} : {t.time.getMinutes()} : {t.time.getSeconds()}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              {currentUser === t.fromUserId ? "-" : "+"} Rs {t.amount / 100}
            </div>
          </div>
        ))}
        {isButtonRequired && <AllTransaction /> }
        
      </div>
    </Card>
  );
};
