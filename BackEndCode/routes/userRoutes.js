const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');


const { getUserProfileByID, updateUserProfile, getAllUsers, updateUserRole } = require('../controllers/UserController');


router.get('/profile/:id', protect, getUserProfileByID);
router.get('/getAllUsers', protect, getAllUsers);
router.get('/getAllUsers', protect, getAllUsers);
router.put('/updateRole', protect, updateUserRole);

router.post('/updateprofile/:id', protect, updateUserProfile);


module.exports = router;