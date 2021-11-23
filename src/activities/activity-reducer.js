const Methods = {
    LOADING_ACTIVITIES: "LOADING_ACTIVITIES",
    DONE_LOADING_ACTIVITIES: "DONE_LOADING_ACTIVITIES",
    ACTIVITIES_ERROR: "ACTIVITIES_ERROR",
};

const initialState = {
    isLoading: false,
    activities: [],
    error: null,
};

const reducer = (state, { type, payload }) => {
    if (!state) throw new Error("No state passed to activity-reducer.");

    switch (type) {
        case Methods.LOADING_ACTIVITIES:
            const newState = {
                ...state,
                isLoading: true,
                error: null,
                activities: state.activities,
            };
            console.dir(newState);
            return newState;
        case Methods.DONE_LOADING_ACTIVITIES:
            return {
                ...state,
                activities: payload.activities,
                isLoading: false,
                error: null,
            };
        case Methods.ACTIVITIES_ERROR:
            return { ...state, isLoading: false, error: payload.error };
        default:
            return { ...state };
    }
};

export default reducer;
export { Methods, initialState };
