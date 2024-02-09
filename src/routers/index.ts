import {
  isAdmin,
  requireAuth,
  loginValidator,
  isManagerOrAdmin,
  updateUserDetail,
  userNameValidator,
  registerValidator
} from '@/middlewares/auth'
import * as userController from '@/controllers/userController'
import express from 'express'

const router = express.Router()

router.post('/login', loginValidator(), userController.login)
router.post('/register', requireAuth, registerValidator(), isAdmin, userController.register)

router.get('/user', requireAuth, userController.getUserItSelf)
router.patch('/user', requireAuth, userNameValidator(), userController.updateUserItSelf)

router.get('/users', isManagerOrAdmin, userController.getUsers)
router.get('/users/:userID', isManagerOrAdmin, userController.getUserByID)
router.patch('/users/:userID', isAdmin, updateUserDetail(), userController.updateUserByID)


export default router
