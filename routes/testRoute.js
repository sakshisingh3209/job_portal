const express = require('express');
const testPostController = require('../controllers/testController');
const router = express.Router();

router.post('/test', testPostController);

module.exports = router;