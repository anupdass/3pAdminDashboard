const Coveyance = require("../models/conveyanceModel");


exports.createConveyance = async (req, res) => {
    try {
        const conveyance = await Coveyance.create(req.body);
        return res.status(200).json(conveyance);
    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.getAllConveyance = async (req, res) => {
    try {
        const conveyance = await Coveyance.find();
        return res.status(200).json(conveyance);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getCovenyanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const conveyance = await Coveyance.findById(id);
        return res.status(200).json(conveyance);
    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.updateConveyance = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedConveyance = await Coveyance.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedConveyance);
    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.deleteConveyance = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedConveyance = await Coveyance.findByIdAndDelete(id);
        return res.status(200).json(deletedConveyance);
    } catch (error) {
        return res.status(500).json(error);
    }
}


