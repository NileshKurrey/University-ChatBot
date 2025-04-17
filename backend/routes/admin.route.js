import { Router } from 'express';
// import isadminMiddleware from '../middlewares/isadmin.middleware.js';
import { CreateUni } from '../controllers/admin.controller.js';
import multer from 'multer';
const upload = multer({ dest: './uploads/' });
const router = Router();

router.post('/create-bot',upload.array('files'),CreateUni);

export default router;