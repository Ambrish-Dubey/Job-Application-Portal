import express from "express";
import {testController} from '../controllers/testController.js'

import {userAuth} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/test-post',userAuth, testController ) //route, then middleware will be called then the controller will be called.
export default router               //always defalt export the router