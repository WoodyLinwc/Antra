const { v4: uuidv4 } = require("uuid");

let todos = [
    {
        id: uuidv4(),
        title: "ExpressJS and NodeJS",
        description: "Basics of ExpressJS!",
        completed: false,
    },
    {
        id: "1",
        title: "test",
        description: "I'm a test",
        completed: true,
    },
];

module.exports = {
    todos,
};
