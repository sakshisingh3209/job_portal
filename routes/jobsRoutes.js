const express = require('express');
const router = express.Router();
const userAuth = require('../middelwares/authMiddleware');
const { createJobController, getJobController, updateJobController, deleteJobController, jobStatsController } = require('../controllers/jobsController');

//create job
router.post("/create-job", userAuth, createJobController);


//get job
router.get("/get-job", userAuth, getJobController);

//put || update job
router.put("/update-job/:id", userAuth, updateJobController);


//delete
router.delete("/delete-job/:id", userAuth, deleteJobController);


//jobs stats filter|| get
router.get('/job-stats', userAuth, jobStatsController)
module.exports = router;