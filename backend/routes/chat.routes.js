import { Router } from 'express';
import { ChatAi } from '../controllers/chat.controller.js';
const router = Router();

router.post('/:collegeId', ChatAi);

 export default router