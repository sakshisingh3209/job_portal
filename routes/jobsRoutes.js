const express = require('express');
const router = express.Router();
const userAuth = require('../middelwares/authMiddleware')
const createJobController = require('../controllers/jobsController');

//create job
router.post("/create-job", userAuth, createJobController);


module.exports = router;