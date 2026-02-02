const mongoose = require("mongoose");

const expandReceiveSchema = new mongoose.Schema(
    {
        receivedDate: { type: Date, required: true, },
        receivedName: { type: String, required: true, trim: true, },
        receivedAmount: { type: Number, required: true, min: 0, },
        officeExpenditure: { type: Number, default: 0, min: 0, },

        uom: { type: String, trim: true, default: "", },
        qty: { type: Number, default: 0, min: 0, },
        paidAmount: { type: Number, default: 0, min: 0, },
        totalAmount: { type: Number, required: true, min: 0, },
        projectLocalExp: { type: Number, default: 0, min: 0, },
        conveyance: { type: Number, default: 0, min: 0, },
        officeExp2: { type: Number, default: 0, min: 0, },
        remarks: { type: String, trim: true, default: "", },

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

module.exports = mongoose.model("ExpandReceive", expandReceiveSchema);
