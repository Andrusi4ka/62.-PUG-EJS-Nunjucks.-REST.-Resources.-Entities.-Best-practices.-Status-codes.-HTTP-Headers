import { renderPage } from '../utils/renderPage.mjs';

export const getRootHandler = (req, res) => {
    renderPage('Home', '<h1>Home page</h1>', res);
};