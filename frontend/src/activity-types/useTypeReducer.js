import { useReducer } from "react";

class TypeState {
    /**
     * All laoded activity types in the current state.
     * @param {Array<ActivityTypeModel>}
     */
    types;

    /**
     * Are the activity types loaded.
     */
    isLoading;

    /**
     * The error, if any, associated with the activity types.
     */
    error;

    constructor(types = [], isLoading = false, error = null) {
        this.types = types;
        this.isLoading = isLoading;
        this.error = error;
    }
}

class TypeReducerAction {
    static LOADING_TYPES = "LOADING_TYPES";
    static DONE_LOADING_TYPES = "DONE_LOADING_TYPES";
    static TYPES_ERROR = "TYPES_ERROR";

    /**
     * The type of action to take (NOT the activity type)
     * @type {string}
     */
    type;

    /** The data associated with the action. Type is associated upon the type of action. */
    payload;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

/** Action for TypeReducer to load activity types. */
class LoadTypesAction extends TypeReducerAction {
    constructor() {
        super(TypeReducerAction.LOADING_TYPES, null);
    }
}

/** Action for TypeReducer indicating activity types are done being loaded. */
class DoneLoadingTypesAction extends TypeReducerAction {
    /**
     * @param {Array<ActivityTypeModel>} types The activity types which were loaded.
     */
    constructor(types) {
        super(TypeReducerAction.DONE_LOADING_TYPES, types);
    }
}

/** Action for TypeReducer indicating there was an error in the type state.*/
class TypesErrorAction extends TypeReducerAction {
    /**
     * @param {Error} error The error that occured in the activity type state.
     */
    constructor(error) {
        super(TypeReducerAction.TYPES_ERROR, error);
    }
}

const initialState = new TypeState();

/**
 * Reducer function for modifying the state with an action. Original state will be unmodified and a new state will be returned.
 * @param {TypeState} state The previous state which will remain unmodified.
 * @param {TypeReducerAction} action The action to apply to the state.
 * @returns {TypeState} The new state which is the resule of the action applied state.
 */
const typeReducer = (state, action) => {
    const { type, payload } = action;

    if (!state) throw new Error("No state passed to type-reducer.");
    if (!type) throw new Error("Called reducer without action type.");

    switch (type) {
        case TypeReducerAction.LOADING_TYPES: {
            const types = [...state.types];
            const isLoading = true;
            return new TypeState(types, isLoading);
        }
        case TypeReducerAction.DONE_LOADING_TYPES: {
            const types = [...payload];
            const isLoading = false;
            return new TypeState(types, isLoading);
        }
        case TypeReducerAction.TYPES_ERROR: {
            const types = [...state.types];
            const isLoading = false;
            const error = payload;
            return new TypeState(types, isLoading, error);
        }
        default:
            throw new Error("Invalid action type.");
    }
};

const useTypeReducer = () => useReducer(typeReducer, initialState);

export {
    typeReducer,
    useTypeReducer,
    TypeState,
    LoadTypesAction,
    DoneLoadingTypesAction,
    TypesErrorAction,
};
