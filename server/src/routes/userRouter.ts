import express from 'express';
const router = express.Router()
import { signUp } from '../controller/userController'

router.post('/signUp',signUp)

export default router