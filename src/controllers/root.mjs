export const getRootHandler = (req, res) => {
    res.render('index', { title: 'Home' });
};

export const postThemeHandler = (req, res) => {
    const allowedThemes = ['light', 'dark'];
    const requestedTheme = req.body.theme;
    const theme = allowedThemes.includes(requestedTheme) ? requestedTheme : 'light';

    res.cookie('theme', theme, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
    });

    const redirectTo =
        typeof req.body.redirectTo === 'string' && req.body.redirectTo.startsWith('/')
            ? req.body.redirectTo
            : '/';

    res.redirect(redirectTo);
};
