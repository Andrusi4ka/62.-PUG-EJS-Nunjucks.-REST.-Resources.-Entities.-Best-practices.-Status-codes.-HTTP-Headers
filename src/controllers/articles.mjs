import { renderEjsPage } from '../utils/renderEjsPage.mjs';

/* Articles */

export const getArticlesHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/index', 'Статті');
};

export const postArticlesHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/post-result', 'POST статті', { payload: req.body });
};

export const getArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/by-id', 'Стаття за ID', { id: req.params.id });
};

export const putArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/update-result', 'PUT статті', {
        method: 'PUT',
        id: req.params.id,
        payload: req.body
    });
};

export const patchArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/update-result', 'PATCH статті', {
        method: 'PATCH',
        id: req.params.id,
        payload: req.body
    });
};

export const deleteArticleByIdHandler = async (req, res, next) => {
    await renderEjsPage(res, next, 'articles/delete-result', 'DELETE статті', { id: req.params.id });
};
