const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Number, default: 1 },
    role: {
        type: [Number],      // 👈 supports integers + decimals
        default: [1, 7.1]
    },
    picture: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

