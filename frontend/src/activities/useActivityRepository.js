import { Methods } from "./useActivityReducer";
import { useActivityContext } from "./ActivityContext";
import { ActivityRepository } from "./ActivityRepository";

const repo = new ActivityRepository();

const useActivityRepository = (dependencyArray = []) => {
    const [state, dispatch] = useActivityContext();

    const addSingleActivity = (activity) => {
        if (state.activities.contains(activity)) {
            dispatch({
                type: Methods.DONE_LOADING_ACTIVITIES,
                payload: { activities: [...state.activities] },
            });
        } else {
            dispatch({
                type: Methods.DONE_LOADING_ACTIVITIES,
                payload: { activities: [...state.activities, activity] },
            });
        }
    };

    const removeSingleActivity = (activity) => {
        if (state.activities.contains(activity)) {
            const index = state.activities.indexOf(activity);
            dispatch({
                type: Methods.DONE_LOADING_ACTIVITIES,
                payload: { activities: [...state.activities.splice(index, 1)] },
            });
        } else {
            dispatch({
                type: Methods.DONE_LOADING_ACTIVITIES,
                payload: { types: [...state.activities] },
            });
        }
    };

    const setAllActivities = (activities) => {
        dispatch({
            type: Methods.DONE_LOADING_TYPES,
            payload: { activities },
        });
    };

    const reloadAll = async () => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const allActivities = await repo.getAll();
            setAllActivities(allActivities);
        } catch (e) {
            dispatch({ type: Methods.ACTIVITIES_ERROR, payload: { error: e } });
        }
    };

    const reloadOne = async (id) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.getById(id);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const startNew = async (activity) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.startNew(activity);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const createCompleted = async (activity) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.createCompleted(activity);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const stopActivity = async (id) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.stopActivity(id);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const resumeActivity = async (id) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.resumeActivity(id);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const trashActivity = async (id) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.trashActivity(id);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const untrashActivity = async (id) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.untrashActivity(id);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const updateActivity = async (activity) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            const activity = await repo.updateActivity(activity._id, activity);
            addSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    const removeActivity = async (activity) => {
        dispatch({ type: Methods.LOADING_ACTIVITIES });
        try {
            await repo.removeActivity(activity._id);
            removeSingleActivity(activity);
        } catch (e) {
            dispatch({
                type: Methods.ACTIVITIES_ERROR,
                payload: { error: e },
            });
        }
    };

    return [
        state,
        {
            reloadAll,
            reloadOne,
            startNew,
            createCompleted,
            stopActivity,
            resumeActivity,
            trashActivity,
            untrashActivity,
            updateActivity,
            removeActivity,
        },
    ];
};

export { useActivityRepository };
