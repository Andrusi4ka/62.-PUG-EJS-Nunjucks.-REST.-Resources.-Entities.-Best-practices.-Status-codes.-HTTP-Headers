export const AUTH_COOKIE_NAME = 'accessToken';
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
export const JWT_EXPIRES_IN = '1h';

export const getAuthCookieOptions = () => ({
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000
});
