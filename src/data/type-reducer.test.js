// import { addType, removeType } from "./type-reducer";

// const existingState = [
//     {
//         name: "Coding",
//         id: "000",
//     },
//     {
//         name: "Reading",
//         id: "001",
//     },
// ];
// const existingCount = 2;

// // ============================== addType ==============================
// test("adds new type with valid type, expects type to be purely added", () => {
//     const newType = {
//         name: "new type",
//     };
//     const newState = addType(existingState, newType);

//     expectExistingToBePure();
//     expectTypeToBeInNewState(newType, newState);
// });

// test("adds new type with invalid type, expects thrown error and pure state", () => {
//     const newType = {
//         name: "",
//     };

//     expect(() => addType(existingState, newType)).toThrow();

//     expectExistingToBePure();
// });

// test("adds existing type, expects unaltered state and pure initial state", () => {
//     const existingType = existingState[0];

//     const newState = addType(existingState, existingType);

//     expect(newState.length).toBe(existingCount);
//     expectTypeToBeInNewState(existingType, newState);
//     expectExistingToBePure();
// });

// // ============================== removeType ==============================
// test("removes type with existing id, expects type to be purely removed", () => {
//     const existingType = existingState[0];

//     const newState = removeType(existingState, existingType.id);

//     expectTypeNotInState(existingType, newState);
//     expectExistingToBePure();
// });

// test("removes type with invalid id, expects error to be thrown and pure initial state", () => {
//     expect(() => removeType(existingState, -99)).toThrow();
//     expectExistingToBePure();
// });

// test("removes type with null id, expects error to be thrown and pure initial state", () => {
//     expect(() => removeType(existingState, null)).toThrow();
//     expectExistingToBePure();
// });

// const expectExistingToBePure = () => {
//     expect(existingState.length).toBe(existingCount);
// };

// const expectTypeToBeInNewState = (type, newState) => {
//     const inState = newState.some((t) => t.name === type.name);
//     expect(inState).toBeTruthy();
// };

// const expectTypeNotInState = (type, state) => {
//     const inState = state.some((t) => t.id === type.id || t.name === type.name);
//     expect(inState).toBeFalsy();
// };
