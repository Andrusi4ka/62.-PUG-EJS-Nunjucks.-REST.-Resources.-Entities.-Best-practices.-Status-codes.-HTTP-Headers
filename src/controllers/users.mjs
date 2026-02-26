/* Users */

export const getUsersHandler = (req, res) => {
    console.log('Query:', req.query);
    res.render('users/index', { title: 'Users' });
};

export const postUsersHandler = (req, res) => {
    console.log(req.body);
    res.render('users/post-result', { title: 'User created', payload: req.body });
};

export const getUserByIdHandler = (req, res) => {
    console.log('Params:', { ...req.params });
    res.render('users/by-id', { title: 'User by ID', id: req.params.id });
};

export const putUserByIdHandler = (req, res) => {
    console.log(req.body);
    res.render('users/update-result', { title: 'PUT user', method: 'PUT', id: req.params.id, payload: req.body });
};

export const patchUserByIdHandler = (req, res) => {
    console.log(req.body);
    res.render('users/update-result', { title: 'PATCH user', method: 'PATCH', id: req.params.id, payload: req.body });
};

export const deleteUserByIdHandler = (req, res) => {
    console.log(`Deleted user with ID: ${req.params.id}`);
    res.render('users/delete-result', { title: 'DELETE user', id: req.params.id });
};
