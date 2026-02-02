const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        officeExpenditure: { type: String, required: [true] },
        costingAmount: { type: Number, required: [true], },
        paidAmount: { type: Number, required: [true,], },
        remarks: { type: String, trim: true, default: "", },
        receivedDate: { type: Date, default: null, },
        receivedName: { type: String, trim: true, default: "", },
        receivedAmount: { type: Number, default: 0, },

        status: { type: Number, default: 1 },
        updatedAt: { type: Date, },
        createdAt: { type: Date, default: Date.now },
        createBy: { type: String },
        updateBy: { type: String },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

module.exports = mongoose.model('Expense', expenseSchema);
