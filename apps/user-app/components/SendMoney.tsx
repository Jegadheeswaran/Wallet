"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useEffect, useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useSearchParams } from "next/navigation";
import { TextInputDisabled } from "@repo/ui/textInputDisabled";

export const SendMoney = () => {
  const searchParams = useSearchParams();

  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setNumber(searchParams.get("number") || "");
  }, [searchParams.get("number")]);

  return (
    <div>
      <Card title="Send Money to Friends">
        {searchParams.get("number") ? (
          <TextInputDisabled label={"Mobile Number"} value={number} />
        ) : (
          <TextInput
            label="Mobile Number"
            onChange={(number) => {
              setNumber(number);
            }}
            placeholder={"Enter Mobile Numer "}
          />
        )}

        <TextInput
          label="Amount"
          onChange={(amount) => {
            setAmount(Number(amount));
          }}
          placeholder={"Enter Amount"}
        />

        <div className="pt-4 flex justify-center">
          <Button
            onClick={async () => {
              console.log("amount " + amount + " Number " + number);
              await p2pTransfer(number, amount * 100);
            }}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};
