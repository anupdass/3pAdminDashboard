const express = require('express');
const router = express.Router();

const {
    createConveyance,
    getAllConveyance,
    updateConveyance,
    getCovenyanceById
} = require("../controllers/ConveyanceController");


const protect = require('../middlewares/authMiddleware');


router.get("/conveyancelist", protect, getAllConveyance);
router.get("/conveyance/:id", protect, getCovenyanceById);


router.post("/create-conveyance", protect, createConveyance);
router.put("/update-conveyance/:id", protect, updateConveyance);


module.exports = router;