import express from 'express'
import {userAuth} from '../middlewares/authMiddleware.js'

import {jobsController }from '../controllers/jobsController.js'
import {getAllJobsController }from '../controllers/jobsController.js'
import {updateJobController }from '../controllers/jobsController.js'
import {deleteJobController }from '../controllers/jobsController.js'

import {jobStatsController }from '../controllers/jobsController.js'

const route = express.Router()

route.post('/create-job', userAuth, jobsController )
route.get('/get-job', userAuth, getAllJobsController )
route.patch('/update-job/:id', userAuth, updateJobController )
route.delete('/delete-job/:id', userAuth, deleteJobController )

route.get('/job-stats', userAuth, jobStatsController )
export default route