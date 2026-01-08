const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth, changePassword } = require('../controllers/authController');

const protect = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-auth', googleAuth);

router.post('/changepassword', protect, changePassword);


module.exports = router;

