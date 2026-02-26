import { renderPage } from '../utils/renderPage.mjs';

/* Articles */

export const getArticlesHandler = (req, res) => {
    renderPage('Articles', '<h1>Articles page</h1>', res);
};

export const postArticlesHandler = (req, res) => {
    renderPage('POST Article', '<h1>POST article route</h1>', res);
};

export const getArticleByIdHandler = (req, res) => {
    renderPage('Article by ID', `<h1>Article ID: ${req.params.id}</h1>`, res);
};

export const putArticleByIdHandler = (req, res) => {
    renderPage('PUT article', `<h1>PUT article ID: ${req.params.id}</h1>`, res);
};

export const patchArticleByIdHandler = (req, res) => {
    renderPage('PATCH article', `<h1>PATCH article ID: ${req.params.id}</h1>`, res);
};

export const deleteArticleByIdHandler = (req, res) => {
    renderPage('DELETE article', `<h1>DELETE article ID: ${req.params.id}</h1>`, res);
};