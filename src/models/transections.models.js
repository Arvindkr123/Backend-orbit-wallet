import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        required: true
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    transactionDate: { // Fixed typo
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const TransactionModel = mongoose.model('Transactions', transactionsSchema);

export default TransactionModel;
