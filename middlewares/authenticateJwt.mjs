import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, JWT_SECRET } from '../src/constants/auth.mjs';

export const authenticateJwt = (req, res, next) => {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ error: 'Токен автентифікації відсутній' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: payload.sub,
            name: payload.name,
            email: payload.email
        };

        next();
    } catch {
        return res.status(401).json({ error: 'Недійсний або прострочений токен автентифікації' });
    }
};
