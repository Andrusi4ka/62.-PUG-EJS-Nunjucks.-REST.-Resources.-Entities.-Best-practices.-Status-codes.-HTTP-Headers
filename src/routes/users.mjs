import { Router } from 'express'
import { validatePatchUser, validatePostUser, validatePutUser, validateUserId } from '../../validators/userValidator.mjs';

import {
    getUsersHandler,
    postUsersHandler,
    getUserByIdHandler,
    putUserByIdHandler,
    patchUserByIdHandler,
    deleteUserByIdHandler
} from '../controllers/users.mjs'

const router = Router();

/* Users routes */
router.get('/', getUsersHandler);
router.post('/', validatePostUser, postUsersHandler);
router.get('/:id',validateUserId, getUserByIdHandler);
router.put('/:id', validatePutUser, putUserByIdHandler);
router.patch('/:id', validatePatchUser, patchUserByIdHandler);
router.delete('/:id', validateUserId, deleteUserByIdHandler);

export default router;