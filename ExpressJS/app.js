const express = require("express");
const app = express();
const port = 3000;

const todosRoute = require("./routes/todos");
const authRoute = require("./routes/auth");

// built-in middleware function that parse incoming requests with JSON payloads, req.body then works
app.use(express.json());

app.use("/", todosRoute);

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
