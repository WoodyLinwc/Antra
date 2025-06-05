const checklistRepository = require("../repositories/checklistRepository");

class ChecklistService {
    async getAllChecklists() {
        return await checklistRepository.findAll();
    }

    async getChecklistById(id) {
        const checklist = await checklistRepository.findById(id);
        if (!checklist) {
            throw new Error(`Checklist with id ${id} not found`);
        }

        return checklist;
    }

    async createChecklist(data) {
        if (!data.title) {
            throw new Error("Title is required");
        }
        return await checklistRepository.create(data);
    }

    async updateChecklist(id, updates) {
        const updatedChecklist = await checklistRepository.update(id, updates);
        if (!updatedChecklist) {
            throw new Error(`Checklist with id ${id} not found`);
        }
        return updatedChecklist;
    }

    async deleteChecklist(id) {
        const result = await checklistRepository.delete(id);
        if (!result) {
            throw new Error(`Checklist with id ${id} not found`);
        }
        return {
            success: true,
            message: `Checklist with id ${id} deleted successfully`,
        };
    }
}

module.exports = new ChecklistService();
