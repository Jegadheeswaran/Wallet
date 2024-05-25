import { Card } from "@repo/ui/card";
import { AllTransaction } from "./AllTransaction";

// enum OnRampStatus {
//     Success,
//     Failure,
//     Processing
//   }

export const OnRampTransaction = ({title,
  transactions,
  isButtonRequired
}: {
  title : string,
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[],
  isButtonRequired? : boolean
}) => {
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
          <div className="flex justify-between  border-b-2 p-4">
            <div>
              <div className="text-sm">Received INR from {t.provider}</div>
              <div className="text-slate-600 text-xs pt-2">
                {t.time.toDateString()} {t.time.getHours()} : {t.time.getMinutes()} : {t.time.getSeconds()}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>

      {isButtonRequired && <AllTransaction /> }
    </Card>
  );
};
