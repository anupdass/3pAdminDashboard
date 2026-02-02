
const Expenditure = require('../models/expenditureModel');


exports.createExpenditure = async (req, res) => {
    try {
        const expenditure = await Expenditure.create(req.body);
        res.status(201).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllExpenditure = async (req, res) => {
    try {
        const expenditures = await Expenditure.find();
        res.status(200).json(expenditures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getExpenditureById = async (req, res) => {
    try {
        const { id } = req.params;
        const expenditure = await Expenditure.findById(id);
        if (!expenditure) {
            return res.status(404).json({ message: "Expenditure not found" });
        }
        res.status(200).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateExpenditure = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExpenditure = await Expenditure.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedExpenditure) {
            return res.status(404).json({ message: "Expenditure not found" });
        }
        res.status(200).json(updatedExpenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.deleteExpenditure = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpenditure = await Expenditure.findByIdAndDelete(id);
        if (!deletedExpenditure) {
            return res.status(404).json({ message: "Expenditure not found" });
        }
        res.status(200).json({ message: "Expenditure deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}