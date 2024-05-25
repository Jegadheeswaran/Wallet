import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //Todo add zod validation
  //check req came from hdfc -- use webhook password
  //amount will be stored without decimal points example Rs: 200.00 will be stored as 20000 in db.
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  if (!paymentInformation.userId) {
    return res
      .status(400)
      .json({ error: "User identifier is missing in the request body" });
  }
  console.log(paymentInformation);
  //update balance in tb and trx ...
  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      Message: "Captured",
    });
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
