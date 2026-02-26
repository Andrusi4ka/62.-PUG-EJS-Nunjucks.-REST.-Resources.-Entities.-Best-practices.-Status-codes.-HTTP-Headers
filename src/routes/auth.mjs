import { Router } from 'express';
import {
    loginHandler,
    logoutHandler,
    meHandler,
    registerHandler
} from '../controllers/auth.mjs';
import { authenticateJwt } from '../../middlewares/authenticateJwt.mjs';
import { validateLogin, validateRegister } from '../../validators/authValidator.mjs';

const router = Router();

router.post('/register', validateRegister, registerHandler);
router.post('/login', validateLogin, loginHandler);
router.get('/me', authenticateJwt, meHandler);
router.post('/logout', authenticateJwt, logoutHandler);

export default router;
