const express = require("express");
const app = express();
const port = 3000;

const todosRoute = require("./routes/todos");
const authRoute = require("./routes/auth");
const checklistRoute = require("./routes/checklist");

app.use(express.json());
app.use("/api/todos", todosRoute);
app.use("/api/auth", authRoute);
app.use("/api/checklist", checklistRoute);

const sequelize = require("./models/database");
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synchronized");
});

app.get("/", (req, res) => {
    res.send("Backend for the todo list");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
