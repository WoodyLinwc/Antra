const express = require("express");
const cookieParser = require("cookie-parser");
const dashboardRoute = require("./routes/dashboard");
require("dotenv").config(); // Load environment variables
const app = express();
const port = 3000;

const todosRoute = require("./routes/todos");
const authRoute = require("./routes/auth");

// built-in middleware function that parse incoming requests with JSON payloads, req.body then works
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api", todosRoute);
app.use("/api", dashboardRoute);

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
