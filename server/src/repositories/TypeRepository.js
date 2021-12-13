import ActivityType from "../model/ActivityType.js";

class TypeRepository {
    constructor() {}

    async getAll() {
        return await ActivityType.find({});
    }

    async getById(id) {
        if (!id) throw new Error("ID not provided.");

        let type;
        try {
            type = await ActivityType.findById(id);
        } catch (e) {
            throw new Error("Invalid ID format.");
        }

        if (!type) throw new Error("Invalid ID.");
        return type;
    }

    async add(name) {
        const addAsync = async () => {
            if (!name) throw new Error("Tried to add type without a name.");

            const type = new ActivityType({ name });

            if ((await ActivityType.count({ name: type.name })) > 0) {
                throw new Error(`Already added type with name ${type.name}`);
            }

            await type.save();
        };
        await addAsync();
    }

    async delete(id) {
        if (!id) throw new Error("No ID provided.");
        const type = ActivityType.findById(id);
        if (!type) throw new Error("Invalid id.");

        await ActivityType.findByIdAndDelete(id);
    }
}

export { TypeRepository };
