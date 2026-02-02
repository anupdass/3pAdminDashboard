const express = require("express");
const router = express.Router();

const {
    createLocalPurchase,
    getAllLocalPurchase,
    updateLocalPurchase,
    getLocalPurchaseById
} = require("../controllers/LocalPUrchaseController");

const protect = require('../middlewares/authMiddleware');


router.get("/localpurchaselist", protect, getAllLocalPurchase);
router.get("/localpurchase/:id", protect, getLocalPurchaseById);


router.post("/create-local-purchase", protect, createLocalPurchase);
router.put("/update-local-purchase/:id", protect, updateLocalPurchase);


module.exports = router;