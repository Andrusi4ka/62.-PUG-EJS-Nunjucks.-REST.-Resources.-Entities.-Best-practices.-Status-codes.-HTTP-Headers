import { renderEjsPage } from '../utils/renderEjsPage.mjs';

/* Articles */

export const getArticlesHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/index', 'Articles');
};

export const postArticlesHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/post-result', 'POST Article', { payload: req.body });
};

export const getArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/by-id', 'Article by ID', { id: req.params.id });
};

export const putArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/update-result', 'PUT article', {
        method: 'PUT',
        id: req.params.id,
        payload: req.body
    });
};

export const patchArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/update-result', 'PATCH article', {
        method: 'PATCH',
        id: req.params.id,
        payload: req.body
    });
};

export const deleteArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/delete-result', 'DELETE article', { id: req.params.id });
};
