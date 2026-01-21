const mongoose = require('mongoose');

const clientPoSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    poValue: { type: String, required: true },
    poDate: { type: String, required: true },
    poAccountPay: { type: String, },
    poHandPay: { type: String, },
    poDueAmount: { type: String },
    paymentDate: { type: String },
    poRemarks: { type: String },
    poStatus: { type: String, default: 1, },
}, { timestamps: true });

module.exports = mongoose.model('ClientPo', clientPoSchema);