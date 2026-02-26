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

export const registerHandler = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = findAuthUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = createAuthUser({ name, email, passwordHash });
        const token = createAccessToken(user);

        res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

        res.status(201).json({
            message: 'Registration successful',
            user: toPublicUser(user)
        });
    } catch (error) {
        next(error);
    }
};

export const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = findAuthUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = createAccessToken(user);
        res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

        res.status(200).json({
            message: 'Login successful',
            user: toPublicUser(user)
        });
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

    res.status(204).send();
};
