export const MOCK_USER = {
    name: "Test User",
    email: "test@example.com",
    password: "test123",
};

export let users = [MOCK_USER];

export function findUserByEmail(email) {
    return users.find((user) => user.email === email);
}

export function createUser(name, email, password) {
    if (findUserByEmail(email)) {
        throw new Error("User already exists");
    }

    const newUser = { name, email, password };
    users.push(newUser);
    return newUser;
}

export function validateCredentials(email, password) {
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
        return null;
    }
    return user;
}
