const express = require('express');
const router = express.Router();

const { registerController, loginController } = require('../controllers/authController');
//register route
router.post('/register', registerController);


//login route
router.get('/login', loginController);
module.exports = router;