const { v4: uuidv4 } = require("uuid");

let users = [
    {
        id: uuidv4(),
        username: "Woody",
        // This is a hashed version of "admin123"
        password:
            "$2b$10$X5mOE2xl9jJ6ZVUYg5w3/.zvjV.a7JI3NpLGL1H1n7gOKvEhAUJFy",
        role: "admin",
    },
    {
        id: uuidv4(),
        username: "user",
        // This is a hashed version of "user123"
        password:
            "$2b$10$RqH9eXEOvYy3pw7XV/a9WuDsuNhZLAKBYz.4MxKNnRmLoGFhK3kEC",
        role: "user",
    },
];

module.exports = {
    users,
};
