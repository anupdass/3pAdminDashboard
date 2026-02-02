// models/LocalPurchase.js
const mongoose = require('mongoose');

const LocalPurchaseSchema = new mongoose.Schema(
    {
        projectName: { type: String, required: true, trim: true, },
        date: { type: Date, required: true, },
        description: { type: String, required: true, trim: true, },
        requisitionAmount: { type: Number, required: true, min: 0, },
        paidSNS: { type: Number, default: 0, min: 0, },
        paidMWTIL: { type: Number, default: 0, min: 0, },
        pettyCash: { type: Number, default: 0, min: 0, },
        totalPaid: { type: Number, default: 0, min: 0, },
        dueAmount: { type: Number, default: 0, min: 0, },

        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
        createBy: { type: String },
        updateBy: { type: String },
    },
    { timestamps: true }
);


module.exports = mongoose.model('LocalPurchase', LocalPurchaseSchema);
