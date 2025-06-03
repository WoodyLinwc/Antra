const { Router } = require("express");
const {
    getTodo,
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todosController");

const router = Router();

// READ
router.get("/", getAllTodos);

router.get("/:id", getTodo);

// CREATE
router.post("/", createTodo);

// UPDATE
// PUT replaces the entire resource, so PATCH only update the filed you send
router.patch("/:id", updateTodo);

// DELETE
router.delete("/:id", deleteTodo);

module.exports = router;
