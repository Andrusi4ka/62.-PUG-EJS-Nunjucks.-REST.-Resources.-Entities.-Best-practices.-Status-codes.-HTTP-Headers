import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    AUTH_COOKIE_NAME,
    JWT_EXPIRES_IN,
    JWT_SECRET,
    getAuthCookieOptions
} from '../constants/auth.mjs';
import { createAuthUser, findAuthUserByEmail } from '../data/authUsers.mjs';

const getTokenPayload = (user) => ({
    sub: user.id,
    email: user.email,
    name: user.name
});

const toPublicUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email
});

const createAccessToken = (user) => jwt.sign(getTokenPayload(user), JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const wantsJson = (req) => req.accepts(['json', 'html']) === 'json';

const respondAuthSuccess = (req, res, statusCode, message, user) => {
    if (wantsJson(req)) {
        return res.status(statusCode).json({
            message,
            user: toPublicUser(user)
        });
    }

    return res.redirect(303, '/?authSuccess=' + encodeURIComponent(message));
};

const respondAuthError = (req, res, statusCode, message) => {
    if (wantsJson(req)) {
        return res.status(statusCode).json({ error: message });
    }

    return res.redirect(303, '/?authError=' + encodeURIComponent(message));
};

export const registerHandler = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = findAuthUserByEmail(email);
        if (existingUser) {
            return respondAuthError(req, res, 409, 'Користувач з таким email вже існує');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = createAuthUser({ name, email, passwordHash });
        const token = createAccessToken(user);

        res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

        return respondAuthSuccess(req, res, 201, 'Реєстрація успішна', user);
    } catch (error) {
        next(error);
    }
};

export const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = findAuthUserByEmail(email);
        if (!user) {
            return respondAuthError(req, res, 401, 'Невірний email або пароль');
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            return respondAuthError(req, res, 401, 'Невірний email або пароль');
        }

        const token = createAccessToken(user);
        res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

        return respondAuthSuccess(req, res, 200, 'Вхід успішний', user);
    } catch (error) {
        next(error);
    }
};

export const meHandler = (req, res) => {
    res.status(200).json({
        user: req.user
    });
};

export const logoutHandler = (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    if (wantsJson(req)) {
        return res.status(200).json({ message: 'Вихід успішний' });
    }

    return res.redirect(303, '/?authSuccess=' + encodeURIComponent('Ви вийшли з акаунта'));
};
