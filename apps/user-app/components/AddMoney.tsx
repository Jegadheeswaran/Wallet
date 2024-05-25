"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "SBI",
    redirectUrl: "https://www.onlinesbi.sbi/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState("");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(amount) => {
            setAmount(Number(amount));
          } }       />
        <Select
          label="Bank"
          onSelect={(value) => {
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || "",
            );
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "",
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(amount * 100, provider);
              window.location.href = redirectUrl || "";
              // const newTab : Window | any = window.open(redirectUrl || "", '_blank');
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
