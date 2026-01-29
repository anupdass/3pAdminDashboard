
const Se = require('../models/seModel');


exports.createSe = async (req, res) => {
    try {
        const se = await Se.create(req.body);
        res.status(201).json(se);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllSe = async (req, res) => {
    try {
        const se = await Se.find();
        res.status(200).json(se);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSe = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            projectName,
            description,
            constingAmount,
            paymentBCBL,
            paymentHand,
            remarks,
            updateBy,
            status } = req.body;

        const updatedSe = await Se.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...(projectName && { projectName }),
                    ...(description && { description }),
                    ...(constingAmount && { constingAmount }),
                    ...(paymentBCBL && { paymentBCBL }),
                    ...(paymentHand && { paymentHand }),
                    ...(remarks && { remarks }),
                    ...(status && { status }),
                    ...(updateBy && { updateBy }),
                    updatedAt: Date.now(),
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedSe) {
            return res.status(404).json({ message: "SE not found" });
        }

        res.status(200).json(updatedSe);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


exports.getSeById = async (req, res) => {
    try {
        const { id } = req.params;
        const se = await Se.findById(id);
        if (!se) {
            return res.status(404).json({ message: "SE not found" });
        }
        res.status(200).json(se);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSe = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSe = await Se.findByIdAndDelete(id);
        if (!deletedSe) {
            return res.status(404).json({ message: "SE not found" });
        }
        res.status(200).json({ message: "SE deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};