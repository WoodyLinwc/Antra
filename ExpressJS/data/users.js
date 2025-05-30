const { v4: uuidv4 } = require("uuid");

let users = [
    {
        id: uuidv4(),
        username: "Woody",
        // This is a hashed version of "admin123"
        password: "admin123",
        role: "admin",
    },
    {
        id: uuidv4(),
        username: "user",
        // This is a hashed version of "user123"
        password: "user123",
        role: "user",
    },
];

module.exports = {
    users,
};
