const accountSchema = require('../models/accountSchema');
const mongoose = require('mongoose');

// get all accounts
const getAllAccountsController = async (req, res) => {
    try {
        const accounts = await accountSchema.find();
        if (accounts.length === 0) {
            return res.status(404).json({ message: "No accounts found" });
        }
        res.status(200).json({ accounts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Get All Account controller error ${error}` });
    }
}

// get balance
const getBalanceController = async (req, res) => {
    const accHolder = req.user._id;
    if (!accHolder) {
        return res.status(404).json({ message: "Account not found" });
    }
    try {
        const account = await accountSchema.findOne({ userId: accHolder })
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ balance: account.balance });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Get Balance controller error ${error}` });
    }
}

// transfer
const transferController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = req.body;
    if (amount <= 0) {
        return res.status(400).json({ message: "Amount should greater than 0" });
    }
    const from = req.user._id;
    try {
        // getting both accounts
        const fromAccount = await accountSchema.findOne({ userId: from }).session(session);
        if (!fromAccount) {
            return res.status(404).json({ message: "Senders Account not found" });
        }
        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }
        const toAccount = await accountSchema.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Recipient's account not found" });
        }

        // perform the transfer
        await accountSchema.updateOne({ userId: from }, { $inc: { balance: -amount } }).session(session);
        await accountSchema.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });

    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(500).json({ message: `Transfer controller error ${error}` });

    } finally {
        session.endSession();
    }

}

module.exports = { getAllAccountsController, getBalanceController, transferController }