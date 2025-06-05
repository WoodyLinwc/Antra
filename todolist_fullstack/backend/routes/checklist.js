const { Router } = require("express");
const {
    getAllChecklists,
    getChecklist,
    createChecklist,
    updateChecklist,
    deleteChecklist,
} = require("../controllers/checklistController");

const authMiddleware = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = Router();

// all users can view checklists
router.get("/", authMiddleware, getAllChecklists);
router.get("/:id", authMiddleware, getChecklist);

// only admin can create, update, delete
router.post("/", authMiddleware, authorizeRoles("admin"), createChecklist);
router.patch("/:id", authMiddleware, authorizeRoles("admin"), updateChecklist);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteChecklist);

module.exports = router;
