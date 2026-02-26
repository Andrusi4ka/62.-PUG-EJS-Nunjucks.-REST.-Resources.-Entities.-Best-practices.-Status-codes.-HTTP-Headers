import express from 'express'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/root.mjs'
import { logger } from '../middlewares/logger.mjs';
import { errorHandler } from '../middlewares/errorHandler.mjs';
import { notFoundHtmlHandler } from '../middlewares/notFoundHtmlHandler.mjs';

const PORT = 3000;
const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const publicDir = path.join(dirname, '../public');
const THEMES = new Set(['light', 'dark']);

app.set('view engine', 'pug');
app.set('views', path.join(dirname, '../views'));

app.get('/favicon.ico', (req, res) => {
    res.set('Cache-Control', 'public, max-age=0');
    res.type('image/x-icon');
    res.sendFile(path.join(publicDir, 'favicon.ico'));
});

app.use(express.static(publicDir));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const themeFromCookie = req.cookies?.theme;
    res.locals.theme = THEMES.has(themeFromCookie) ? themeFromCookie : 'light';
    res.locals.currentPath = req.originalUrl || '/';
    next();
});

app.use(logger);

app.use(router);

app.use(errorHandler);
app.use(notFoundHtmlHandler);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
