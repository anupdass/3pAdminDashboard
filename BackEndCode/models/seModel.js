
const mongoose = require('mongoose');

const seSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    constingAmount: { type: Number, required: true },
    paymentBCBL: { type: Number, required: true },
    paymentHand: { type: Number, required: true },
    remarks: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createBy: { type: String },
    updateBy: { type: String },

    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Se', seSchema);