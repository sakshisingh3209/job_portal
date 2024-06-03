const express = require('express');
const updateUserController = require('../controllers/userController');
const router = express.Router();


//update user

router.put('/update-user', updateUserController);
module.exports = router;