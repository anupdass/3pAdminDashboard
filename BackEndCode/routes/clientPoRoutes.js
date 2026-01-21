const express = require("express");
const router = express.Router();

const { createClientPo, getAllClientPo, updateClientPo, getClientPoById } = require("../controllers/ClientPoController");

const protect = require('../middlewares/authMiddleware');

router.post('/createClientPo', protect, createClientPo);
router.get('/getallclientpo', protect, getAllClientPo);
router.put('/updateClientPo/:id', protect, updateClientPo);
router.get('/getClientPoById/:id', protect, getClientPoById);

module.exports = router;