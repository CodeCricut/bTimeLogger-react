import { useReducer } from "react";

const Methods = {
    LOADING_TYPES: "LOADING_TYPES",
    DONE_LOADING_TYPES: "DONE_LOADING_TYPES",
    TYPES_ERROR: "TYPES_ERROR",
};

// TODO: make class or add jsdoc
const initialState = {
    isLoading: false,
    types: [],
    error: null,
};

const reducer = (state, { type, payload }) => {
    if (!state) throw new Error("No state passed to type-reducer.");

    switch (type) {
        case Methods.LOADING_TYPES:
            return { ...state, isLoading: true, error: null };
        case Methods.DONE_LOADING_TYPES:
            return {
                ...state,
                types: payload.types,
                isLoading: false,
                error: null,
            };
        case Methods.TYPES_ERROR:
            return { ...state, isLoading: false, error: payload.error };
        default:
            return { ...state };
    }
};

const useTypeReducer = () => useReducer(reducer, initialState);

export { reducer as typeReducer, useTypeReducer, Methods, initialState };
