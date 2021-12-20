import {
    useActivityReducer,
    LoadActivitiesAction,
    DoneLoadingActivitesAction,
    ActivitiesErrorAction,
} from "./useActivityReducer";
import { ActivityRepository } from "./ActivityRepository";
import { useEffect } from "react";

/**
 * Hooks for managing local activity state which syncs with the server. Provides useful abstractions for managing activity
 * state.
 * @param {ActivityRepository} activityRepository Optional repository to use for interacting with activity state. Mostly used for injecting test mocks.
 * @returns {[ActivityState, { reloadAllActivities, reloadOneActivity, startNewActivity, createCompletedActivity, stopActivity, resumeActivity, trashActivity, untrashActivity, updateActivity, removeActivity}]} Array where the first argument is the activity state, and the second is an object with methods to interact with the state.
 */
const useActivityRepository = (
    activityRepository = new ActivityRepository()
) => {
    const [state, dispatch] = useActivityReducer();

    const addSingleActivity = (activity) => {
        if (state.activities.includes(activity)) {
            dispatch(new DoneLoadingActivitesAction([...state.activities]));
        } else {
            dispatch(
                new DoneLoadingActivitesAction([...state.activities, activity])
            );
        }
    };

    const updateSingleActivity = (activity) => {
        const index = state.activities.findIndex(
            (act) => act._id == activity._id
        );
        const updatedActivities = [...state.activities];
        if (index === -1) {
            updatedActivities.push(activity);
        } else {
            updatedActivities[index] = activity;
        }
        dispatch(new DoneLoadingActivitesAction(updatedActivities));
    };

    const removeSingleActivity = (activity) => {
        if (state.activities.includes(activity)) {
            const index = state.activities.indexOf(activity);
            const newArr = [...state.activities];
            newArr.splice(index, 1);
            dispatch(new DoneLoadingActivitesAction(newArr));
        } else {
            throw new Error(
                "Tried to remove activity from activity state which didn't exist."
            );
        }
    };

    const setAllActivities = (activities) => {
        dispatch(new DoneLoadingActivitesAction([...activities]));
    };

    const tryModifyActivityStateAsync = async (action) => {
        dispatch(new LoadActivitiesAction());
        try {
            await action();
        } catch (e) {
            dispatch(new ActivitiesErrorAction(e));
        }
    };

    /**
     * Reload, or refresh, all activities that are present in state. If an activity exists in the
     * server state but not local state, it will be added to local state.
     */
    const reloadAllActivities = async () => {
        await tryModifyActivityStateAsync(async () => {
            const allActivities = await activityRepository.getAll();
            setAllActivities(allActivities);
        });
    };

    /**
     * Reload, or refresh, an activity that is already in the state. If the activity exists in
     * the server state but not local state, it will be added to local state.
     * @param {string} id The id of the activity to reload
     */
    const reloadOneActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.getById(id);
            updateSingleActivity(activity);
        });
    };

    /**
     * Start a new activity and add it to local and server state.
     * @param {ActivityModel} activity The activity to start
     */
    const startNewActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            const startedActivity = await activityRepository.startNew(activity);
            addSingleActivity(startedActivity);
        });
    };

    /**
     * Create a new completed activity and add it to local and server state.
     * @param {ActivityModel} activity The activity to create.
     */
    const createCompletedActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            const createdActivity = await activityRepository.createCompleted(
                activity
            );
            addSingleActivity(createdActivity);
        });
    };

    /**
     * Stop an activity and update in local and server state.
     * @param {string} id The id of the activity to stop.
     */
    const stopActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.stopActivity(id);
            updateSingleActivity(activity);
        });
    };

    /**
     * Resume an activity and update it in local and server state.
     * @param {string} id The id of the activity to resume.
     */
    const resumeActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.resumeActivity(id);
            updateSingleActivity(activity);
        });
    };

    /**
     * Trash an activity and update it in local and server state.
     * @param {string} id The id of the activity to trash.
     */
    const trashActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.trashActivity(id);
            updateSingleActivity(activity);
        });
    };

    /**
     * Untrash an activity and update it in local and server state.
     * @param {string} id The id of the activity to untrash.
     */
    const untrashActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.untrashActivity(id);
            updateSingleActivity(activity);
        });
    };

    /**
     * Update an activity in local and server state.
     * @param {ActivityModel} activity The updated activity model, which must contain the id of the activity to update.
     */
    const updateActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            const updatedActivity = await activityRepository.updateActivity(
                activity._id,
                activity
            );
            updateSingleActivity(updatedActivity);
        });
    };

    /**
     * Remove an activity completely from local and server state. Unlike trashing an activity, this deletes it completely.
     * @param {ActivityModel} activity The activity to remove.
     */
    const removeActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            await activityRepository.removeActivity(activity._id);
            removeSingleActivity(activity);
        });
    };

    useEffect(() => {
        reloadAllActivities();
    }, []);

    return [
        state,
        {
            reloadAllActivities,
            reloadOneActivity,
            startNewActivity,
            createCompletedActivity,
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
