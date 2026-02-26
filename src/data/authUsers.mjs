const authUsers = [];
let nextUserId = 1;

export const findAuthUserByEmail = (email) => {
    const normalizedEmail = email.toLowerCase();
    return authUsers.find((user) => user.email === normalizedEmail);
};

export const createAuthUser = ({ name, email, passwordHash }) => {
    const user = {
        id: nextUserId++,
        name,
        email: email.toLowerCase(),
        passwordHash
    };

    authUsers.push(user);
    return user;
};
