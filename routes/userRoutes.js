const express = require('express');
const updateUserController = require('../controllers/userController');
const userAuth = require('../middelwares/authMiddleware');
const router = express.Router();


//update user

router.put('/update-user', userAuth, updateUserController);
module.exports = router;