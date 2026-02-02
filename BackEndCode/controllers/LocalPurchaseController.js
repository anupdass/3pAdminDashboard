const LocalPurchase = require('../models/localPurchaseModel');


exports.getAllLocalPurchase = async (req, res) => {
    try {
        const localPurchase = await LocalPurchase.find();
        res.status(200).json(localPurchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getLocalPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const localPurchase = await LocalPurchase.findById(id);
        if (!localPurchase) {
            return res.status(404).json({ message: "Local Purchase not found" });
        }
        res.status(200).json(localPurchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createLocalPurchase = async (req, res) => {
    try {
        const localPurchase = await LocalPurchase.create(req.body);
        res.status(201).json(localPurchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateLocalPurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedLocalPurchase = await LocalPurchase.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedLocalPurchase) {
            return res.status(404).json({ message: "Local Purchase not found" });
        }
        res.status(200).json(updatedLocalPurchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.deleteLocalPurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLocalPurchase = await LocalPurchase.findByIdAndDelete(id);
        if (!deletedLocalPurchase) {
            return res.status(404).json({ message: "Local Purchase not found" });
        }
        res.status(200).json({ message: "Local Purchase deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


