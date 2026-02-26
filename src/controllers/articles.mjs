

/* Articles */

export const getArticlesHandler = (req, res) => {
    res.render('articles/index', { title: 'Articles' });
};

export const postArticlesHandler = (req, res) => {
    res.render('articles/post-result', { title: 'POST Article', payload: req.body });
};

export const getArticleByIdHandler = (req, res) => {
    res.render('articles/by-id', { title: 'Article by ID', id: req.params.id });
};

export const putArticleByIdHandler = (req, res) => {
    res.render('articles/update-result', { title: 'PUT article', method: 'PUT', id: req.params.id, payload: req.body });
};

export const patchArticleByIdHandler = (req, res) => {
    res.render('articles/update-result', { title: 'PATCH article', method: 'PATCH', id: req.params.id, payload: req.body });
};

export const deleteArticleByIdHandler = (req, res) => {
    res.render('articles/delete-result', { title: 'DELETE article', id: req.params.id });
};
