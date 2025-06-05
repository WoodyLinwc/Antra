const checklistService = require("../services/checklistService");

const getAllChecklists = async (req, res) => {
    try {
        const checklists = await checklistService.getAllChecklists();
        res.json(checklists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const checklist = await checklistService.getChecklistById(id);
        res.json(checklist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createChecklist = async (req, res) => {
    try {
        const newChecklist = await checklistService.createChecklist(req.body);
        res.status(201).json(newChecklist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedChecklist = await checklistService.updateChecklist(
            id,
            req.body
        );
        res.json(updatedChecklist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await checklistService.deleteChecklist(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllChecklists,
    getChecklist,
    createChecklist,
    updateChecklist,
    deleteChecklist,
};
