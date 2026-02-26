import { Router } from 'express'
import usersRouter from './users.mjs';
import articlesRouter from './articles.mjs';
import { getRootHandler, postThemeHandler } from '../controllers/root.mjs';
import filesRouter from './files.mjs';

const router = Router();

router.get('/', getRootHandler);
router.post('/theme', postThemeHandler);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/files', filesRouter);

export default router;
