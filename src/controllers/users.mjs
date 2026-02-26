import { renderPage } from '../utils/renderPage.mjs';

/* Users */

export const getUsersHandler = (req, res) => {
    console.log('Query:', req.query);
    renderPage('Users', '<h1>Users page</h1>', res);
};

export const postUsersHandler = (req, res) => {
    console.log(req.body);

    renderPage(
        'User created',
        `
        <h1>User created</h1>
        <pre>${JSON.stringify(req.body, null, 2)}</pre>
        <a href="/users">Back to users</a>
        `,
        res
    );
};

export const getUserByIdHandler = (req, res) => {
    console.log('Params:', { ...req.params });
    renderPage('User by ID', `<h1>User ID: ${req.params.id}</h1>`, res);
};

export const putUserByIdHandler = (req, res) => {
    console.log(req.body);
    renderPage('PUT user', `<h1>PUT user ID: ${req.params.id}</h1>`, res);
};

export const patchUserByIdHandler = (req, res) => {
    console.log(req.body);
    renderPage('PATCH user', `<h1>PATCH user ID: ${req.params.id}</h1>`, res);
};

export const deleteUserByIdHandler = (req, res) => {
    console.log(`Deleted user with ID: ${req.params.id}`);
    renderPage('DELETE user', `<h1>DELETE user ID: ${req.params.id}</h1>`, res);
};