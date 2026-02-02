const express = require("express");
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const { createSe, getAllSe, updateSe, getSeById } = require("../controllers/SeController");


router.get("/selist", protect, getAllSe);
router.get("/se/:id", protect, getSeById);

router.post("/create-se", protect, createSe);
router.put("/update-se/:id", protect, updateSe);


module.exports = router;