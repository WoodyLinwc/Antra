const Checklist = require("../models/checklist");

class ChecklistRepository {
    async findAll() {
        return await Checklist.findAll();
    }

    async findById(id) {
        return await Checklist.findByPk(id);
    }

    async create(data) {
        return await Checklist.create(data);
    }

    async update(id, data) {
        const checklist = await Checklist.findByPk(id);
        if (!checklist) {
            return null;
        }
        return await checklist.update(data);
    }

    async delete(id) {
        const checklist = await Checklist.findByPk(id);
        if (!checklist) {
            return false;
        }
        await checklist.destroy();
        return true;
    }
}

module.exports = new ChecklistRepository();
