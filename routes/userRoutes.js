import express from 'express'
import {updateController} from '../controllers/userController.js'

import {userAuth} from '../middlewares/authMiddleware.js'

const route = express.Router()

route.put('/update-user', userAuth, updateController)

export default route
