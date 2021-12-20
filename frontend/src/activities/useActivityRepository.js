import {
    useActivityReducer,
    LoadActivitiesAction,
    DoneLoadingActivitesAction,
    ActivitiesErrorAction,
} from "./useActivityReducer";
import { ActivityRepository } from "./ActivityRepository";
import { useEffect } from "react";

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

    const reloadAllActivities = async () => {
        await tryModifyActivityStateAsync(async () => {
            const allActivities = await activityRepository.getAll();
            setAllActivities(allActivities);
        });
    };

    const reloadOneActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.getById(id);
            updateSingleActivity(activity);
        });
    };

    const startNewActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            const startedActivity = await activityRepository.startNew(activity);
            addSingleActivity(startedActivity);
        });
    };

    const createCompletedActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            const createdActivity = await activityRepository.createCompleted(
                activity
            );
            addSingleActivity(createdActivity);
        });
    };

    const stopActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.stopActivity(id);
            updateSingleActivity(activity);
        });
    };

    const resumeActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.resumeActivity(id);
            updateSingleActivity(activity);
        });
    };

    const trashActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.trashActivity(id);
            updateSingleActivity(activity);
        });
    };

    const untrashActivity = async (id) => {
        await tryModifyActivityStateAsync(async () => {
            const activity = await activityRepository.untrashActivity(id);
            updateSingleActivity(activity);
        });
    };

    const updateActivity = async (activity) => {
        await tryModifyActivityStateAsync(async () => {
            const updatedActivity = await activityRepository.updateActivity(
                activity._id,
                activity
            );
            updateSingleActivity(updatedActivity);
        });
    };

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
