import { Router } from 'express'
import { validateArticleId, validatePatchArticle, validatePostArticle, validatePutArticle } from '../../validators/articleValidator.mjs';

import {
    getArticlesHandler,
    postArticlesHandler,
    getArticleByIdHandler,
    putArticleByIdHandler,
    patchArticleByIdHandler,
    deleteArticleByIdHandler
} from '../controllers/articles.mjs'

const router = Router();

/* Articles routes */
router.get('/', getArticlesHandler)
router.post('/', validatePostArticle, postArticlesHandler)
router.get('/:id', validateArticleId, getArticleByIdHandler)
router.put('/:id', validatePutArticle, putArticleByIdHandler)
router.patch('/:id', validateArticleId, validatePatchArticle, patchArticleByIdHandler)
router.delete('/:id', validateArticleId, deleteArticleByIdHandler)

export default router;