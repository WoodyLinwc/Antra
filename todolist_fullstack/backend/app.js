const express = require("express");
const app = express();
const port = 3000;

const todosRoute = require("./routes/todos");

app.use(express.json());
app.use("/api/todos", todosRoute);

app.get("/", (req, res) => {
    res.send("Backend for the todo list");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
