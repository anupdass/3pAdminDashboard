const express = require("express");
const router = express.Router();

const {
    createExpenditure,
    getAllExpenditure,
    updateExpenditure,
    getExpenditureById
} = require("../controllers/EnpenditureController");

const protect = require('../middlewares/authMiddleware');


router.get("/expenditurelist", protect, getAllExpenditure);
router.get("/expenditure/:id", protect, getExpenditureById);


router.post("/create-expenditure", protect, createExpenditure);
router.put("/update-expenditure/:id", protect, updateExpenditure);

module.exports = router;