const { users } = require("../database/users");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
    findAll() {
        return users;
    }

    findById(id) {
        return users.find((user) => user.id === id);
    }

    findByUsername(username) {
        return users.find((user = user.username === username));
    }

    findByEmail(email) {
        return users.find((user) => user.email === email);
    }

    create(userData) {
        const newUser = {
            id: uuidv4(),
            ...userData,
            role: userData.role || "user",
        };

        users.push(newUser);
        return newUser;
    }
}

module.exports = new UserRepository();
