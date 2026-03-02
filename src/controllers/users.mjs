/* Users */

export const getUsersHandler = (req, res) => {
    console.log('Query:', req.query);
    res.render('users/index', { title: 'Користувачі' });
};

export const postUsersHandler = (req, res) => {
    console.log(req.body);
    res.render('users/post-result', { title: 'Користувача створено', payload: req.body });
};

export const getUserByIdHandler = (req, res) => {
    console.log('Params:', { ...req.params });
    res.render('users/by-id', { title: 'Користувач за ID', id: req.params.id });
};

export const putUserByIdHandler = (req, res) => {
    console.log(req.body);
    res.render('users/update-result', { title: 'PUT користувача', method: 'PUT', id: req.params.id, payload: req.body });
};

export const patchUserByIdHandler = (req, res) => {
    console.log(req.body);
    res.render('users/update-result', { title: 'PATCH користувача', method: 'PATCH', id: req.params.id, payload: req.body });
};

export const deleteUserByIdHandler = (req, res) => {
    console.log(`Deleted user with ID: ${req.params.id}`);
    res.render('users/delete-result', { title: 'DELETE користувача', id: req.params.id });
};
