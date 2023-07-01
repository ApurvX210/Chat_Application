import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { accessChat, addToGroup, createGroupChat, fetchChat, removeFromGroup, renameGroup } from '../Controllers/chatControllers.js';


const router=express.Router();

router.post('/',protect,accessChat);
router.get('/',protect,fetchChat);
router.post('/group',protect,createGroupChat);
router.put('/rename',protect,renameGroup);
router.put('/groupremove',protect,removeFromGroup);
router.put('/groupadd',protect,addToGroup);


export default router;