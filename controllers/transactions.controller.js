const Transactions = require("./../models/Transaction.js");
const User = require("./../models/User.js");


const createTransaction = async (req,res) => {
    try {
        const {amountUSD, amountUSDC, receiverId} = req.body;
        const senderId = req.user.id;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!receiver || receiver.role !== "partner-receiver") {
            return res.status(400).json({message: "Receiver must be a partner-receiver"});
        }

        const transaction = new Transaction({
            amountUSD,
            amountUSDC,
            sender: senderId,
            receiver: receiverId,
            region: sender.region
        });

        await transaction.save();
        // log the action
            await logAudit({
            action: "create",
            performedBy: senderId,
            targetModel: "Transaction",
            targetId: transaction._id,
            details: {
                amountUSD,
                amountUSDC,
                receiverId
            }
            });
        res.status(201).json(transaction)

    } catch(err) {
        res.status(500).json({message: "server error", error: err.message ? err.message : err});

    }
}

const getMyTransaction = async(req,res) => {
    try {
        const userId = req.user.id;

        const transactions = await Transaction.find({
            $or: [{sender: userId}, {receiver: userId}]
        }).populate('sender receiver', 'username email');

        res.json(transactions)

    } catch(err) {

        res.status(500).json({message :"server error", error: err.message ? err.message : err});

    }
}

// Get all transactions (admin)
const getAllTransactions = async (req, res) => {
  try {
    const { role, region } = req.user;

    let filter = {};
    if (role === 'regional-admin') {
      filter.region = region;
    }

    const transactions = await Transaction.find(filter)
      .populate('sender receiver', 'username email role region');

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update transaction status (admin only)
const updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = status;
    await transaction.save();
    await logAudit({
            action: `status-${status}`, // status-approved or status-rejected
            performedBy: req.user.id,
            targetModel: "Transaction",
            targetId: transaction._id,
            details: { newStatus: status }
        });

    res.json({ message: 'Transaction updated', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = {
    createTransaction,
    getMyTransaction,
    getAllTransactions,
    updateTransactionStatus
}