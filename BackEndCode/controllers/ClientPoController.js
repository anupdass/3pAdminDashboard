
const { get } = require("mongoose");
const ClientPo = require("../models/clientPoModel");


exports.createClientPo = async (req, res) => {
    try {
        const clientPo = await ClientPo.create(req.body);
        res.status(201).json(clientPo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAllClientPo = async (req, res) => {
    try {
        const clientPo = await ClientPo.find();
        res.status(200).json(clientPo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateClientPo = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedClientPo = await ClientPo.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedClientPo) {
            return res.status(404).json({ message: "Client PO not found" });
        }

        res.status(200).json(updatedClientPo);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};



exports.getClientPoById = async (req, res) => {
    try {
        const { id } = req.params;
        const clientPo = await ClientPo.findById(id);
        if (!clientPo) {
            return res.status(404).json({ message: "Client PO not found" });
        }
        res.status(200).json(clientPo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}