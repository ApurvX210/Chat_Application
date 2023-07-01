import express from 'express'
import { allusers, loginUser,signupUser } from '../Controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.get('/users',protect,allusers);

export default router;