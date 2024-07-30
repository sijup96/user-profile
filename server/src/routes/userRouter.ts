import express from 'express';
const router = express.Router()
import { getUser, logout, signIn, signUp, updateProfile, userExist } from '../controller/userController'
import { userMiddleware } from '../middlewares/authMiddleware';

router.post('/signUp' ,signUp)
router.post('/signIn',signIn)
router.post('/logout',userMiddleware,logout)
router.post('/profile-update',userMiddleware,updateProfile)
router.post('/userExist',userExist)
router.get('/getUser',getUser)

export default router