import express from 'express';
import { adminLogin, deleteUser, getAllUser, getUser } from '../controller/adminController';
const router = express.Router()

router.post('/signIn', adminLogin)
router.get('/getUser', getAllUser)
router.delete('/delete_user/:id', deleteUser)
router.get('/getUser/:id',getUser)



export default router