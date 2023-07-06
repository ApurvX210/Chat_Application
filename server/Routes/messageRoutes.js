import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allMessages, sendMessage } from "../Controllers/messageController.js";

const router= Router();

router.post('/',protect,sendMessage);
router.get('/:chatId',protect,allMessages);

export default router;