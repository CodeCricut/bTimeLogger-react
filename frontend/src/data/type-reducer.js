// import { v4 as uuid } from "uuid";
// const ADD_TYPE = "ADD_TYPE",
//     REMOVE_TYPE = "REMOVE_TYPE";

// const addType = (state, type) => {
//     if (!type) throw new Error("Tried adding null activity type.");
//     if (!type.name) throw new Error("Tried adding type with invalid name.");

//     const typeExists = state.some((t) => t.name === type.name);
//     if (typeExists) return [...state];
//     else {
//         const newType = {
//             ...type,
//             id: uuid(),
//         };

//         return [...state, newType];
//     }
// };

// const removeType = (state, typeId) => {
//     if (!typeId)
//         throw new Error("Tried adding removing activity type with null id.");

//     const typeExists = state.some((t) => t.id === typeId);
//     if (!typeExists)
//         throw new Error("Tried adding removing activity type with invalid id.");

//     return state.filter((t) => t.id !== typeId);
// };

// const loadTypes = () => {};
// const reducer = (state, { type, payload }) => {
//     switch (type) {
//         case ADD_TYPE:
//             return addType(state, payload);
//         case REMOVE_TYPE:
//             return removeType(state, payload);
//         default:
//             return state;
//     }
// };

// export default reducer;
// export { addType, removeType, ADD_TYPE, REMOVE_TYPE };