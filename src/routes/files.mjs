import { Router } from 'express';
import { getFilesHandler, postFilesHandler } from '../controllers/files.mjs';

const router = Router();

router.get('/', getFilesHandler);
router.post('/', postFilesHandler);

export default router;