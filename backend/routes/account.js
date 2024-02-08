const express = require("express");
const z = require("zod");
const authMiddleware = require("../middleware");
const { Account, User } = require("../database/Schema");
const mongoose = require("mongoose");
const router = express.Router();

// to get balance
router.get("/balance", authMiddleware, async function (req, res) {
  try {
    const account = await Account.findOne({ userId: req.userId });

    res.status(200).json({
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).json({
      msg: "unable to fetch the bank balance!",
    });
  }
});

// to transfer money

const transferBody = z.object({
  toUser: z.string(),
  amount: z.number(),
});

router.post("/transfer", authMiddleware, async function (req, res) {
  const { success } = transferBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  try {
    const senderUserInfo = await User.findOne({ username: req.username });

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, toUser } = req.body;

    // fetching the account for sender
    const senderAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(402).json({
        msg: "Insufficient balance",
      });
    }

    const recieverAccount = await Account.findOne({ userId: toUser }).session(
      session
    );

    if (!recieverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Invalid account",
      });
    }

    // preforming transfer;
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: toUser },
      { $inc: { balance: amount } }
    ).session(session);


    // commiting the transaction;
    await session.commitTransaction();

    res.status(200).json({
      msg: "Transaction successfully",
      userInfo: senderUserInfo.firstName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "somthing went wrong while sending the money",
      err: err,
    });
  }
});

module.exports = router;