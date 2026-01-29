const express = require("express");
const router = express.Router();

const { createSe, getAllSe, updateSe, getSeById } = require("../controllers/SeController");


router.get("/selist", getAllSe);
router.get("/se/:id", getSeById);

router.post("/create-se", createSe);
router.put("/update-se/:id", updateSe);

module.exports = router;