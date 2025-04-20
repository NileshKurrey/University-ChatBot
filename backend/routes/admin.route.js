import { Router } from 'express';
// import isadminMiddleware from '../middlewares/isadmin.middleware.js';
import { AddUniversityData, CreateUni, deleteBot, GetAllUniversity, getBot, updateBot } from '../controllers/admin.controller.js';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });
const router = Router();

router.post('/create-bot',upload.array('files'),CreateUni);
router.post('/add-docs/:collegeId',upload.array('files'),AddUniversityData);
router.put('/updateBot/:collegeId',updateBot);
router.get('/getAllBot',GetAllUniversity);
router.get('/getCurrent/:collegeId',getBot);
router.delete('/deleteBot/:collegeId',deleteBot);

export default router;