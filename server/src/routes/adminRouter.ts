import express from 'express';
import { adminLogin, deleteUser, getAllUser, getUser, profileUpdate } from '../controller/adminController';
const router = express.Router()

router.post('/signIn', adminLogin)
router.get('/getUser', getAllUser)
router.delete('/delete_user/:id', deleteUser)
router.get('/getUser/:id',getUser)
router.post('/profile-update/:id',profileUpdate)



export default router