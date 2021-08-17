import { v4 as uuid } from "uuid";
const ADD_TYPE = "ADD_TYPE",
    REMOVE_TYPE = "REMOVE_TYPE";

const addType = (state, type) => {
    if (!type) throw new Error("Tried adding null activity type.");
    const typeExists = state.some((t) => t.name == type.name);
    if (typeExists) return [...state];
    else {
        const newType = {
            ...type,
            id: uuid(),
        };

        return [...state, newType];
    }
};

const removeType = (state, typeId) => {
    if (!typeId)
        throw new Error("Tried adding removing activity type with null id.");

    const typeExists = state.some((t) => t.id === typeId);
    if (!typeExists)
        throw new Error("Tried adding removing activity type with invalid id.");

    return state.filter((t) => t.id !== typeId);
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ADD_TYPE:
            return addType(state, payload);
        case REMOVE_TYPE:
            return removeType(state, payload);
        default:
            return state;
    }
};

export default reducer;
export { ADD_TYPE, REMOVE_TYPE };
