import { Methods } from "./useActivityReducer";
import { useActivityContext } from "./ActivityContext";

// TODO: ActivityRepository should be its own unit which this hook references
const useActivityRepository = (dependencyArray = []) => {
    const [state, dispatch] = useActivityContext();

    // TODO
    // const tryRequestAsync = async (request) => {
    //     dispatch({ type: Methods.LOADING_ACTIVITIES });
    //     try {
    //         const response = await request();
    //         if (response.status !== 200)
    //             throw new Error("Server did not indicate success.");
    //         dispatch({
    //             type: Methods.DONE_LOADING_ACTIVITIES,
    //             payload: {
    //                 activities: response.data ?? activityState.activities,
    //             },
    //         });
    //     } catch (e) {
    //         dispatch({ type: Methods.ACTIVITIES_ERROR, payload: { error: e } });
    //     }
    // };

    // const loadActivities = async () => {
    //     await tryRequestAsync(async () => await axios.get("/activities"));
    // };

    // const startActivity = async (activity) => {
    //     await tryRequestAsync(async () => {
    //         const response = await axios.post(
    //             `/activities/start-new`,
    //             activity
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         return await axios.get("/activities");
    //     });
    // };

    // const createCompletedActivity = async (activity) => {
    //     await tryRequestAsync(async () => {
    //         const response = await axios.post(
    //             `/activities/create-completed`,
    //             activity
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         return axios.get("/activities");
    //     });
    // };

    // const stopActivity = async (activityId) => {
    //     dispatch({ type: Methods.LOADING_ACTIVITIES });
    //     try {
    //         const response = await axios.patch(
    //             `/activities/stop/${activityId}`
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         dispatch({
    //             type: Methods.DONE_LOADING_ACTIVITIES,
    //             payload: { activities: response.data },
    //         });
    //     } catch (e) {
    //         dispatch({
    //             type: Methods.ACTIVITIES_ERROR,
    //             payload: { error: e },
    //         });
    //     }
    // };

    // const resumeActivity = async (activityId) => {
    //     dispatch({ type: Methods.LOADING_ACTIVITIES });
    //     try {
    //         const response = await axios.patch(
    //             `/activities/resume/${activityId}`
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         dispatch({
    //             type: Methods.DONE_LOADING_ACTIVITIES,
    //             payload: { activities: response.data },
    //         });
    //     } catch (e) {
    //         dispatch({
    //             type: Methods.ACTIVITIES_ERROR,
    //             payload: { error: e },
    //         });
    //     }
    // };

    // const trashActivity = async (activityId) => {
    //     await tryRequestAsync(async () => {
    //         const response = await axios.patch(
    //             `/activities/trash/${activityId}`
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         return axios.get("/activities");
    //     });
    // };

    // const untrashActivity = async (activityId) => {
    //     dispatch({ type: Methods.LOADING_ACTIVITIES });
    //     try {
    //         const response = await axios.patch(
    //             `/activities/untrash/${activityId}`
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         dispatch({
    //             type: Methods.DONE_LOADING_ACTIVITIES,
    //             payload: { activities: response.data },
    //         });
    //     } catch (e) {
    //         dispatch({
    //             type: Methods.ACTIVITIES_ERROR,
    //             payload: { error: e },
    //         });
    //     }
    // };

    // const updateActivity = async (activity) => {
    //     dispatch({ type: Methods.LOADING_ACTIVITIES });
    //     try {
    //         const response = await axios.put(
    //             `/activities/update/${activity._id}`
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         dispatch({
    //             type: Methods.DONE_LOADING_ACTIVITIES,
    //             payload: { activities: response.data },
    //         });
    //     } catch (e) {
    //         dispatch({
    //             type: Methods.ACTIVITIES_ERROR,
    //             payload: { error: e },
    //         });
    //     }
    // };

    // const removeActivity = async (activityId) => {
    //     dispatch({ type: Methods.LOADING_ACTIVITIES });
    //     try {
    //         const response = await axios.delete(
    //             `/activities/remove/${activityId}`
    //         );
    //         if (response.status !== 200) throw new Error(response.error);
    //         dispatch({
    //             type: Methods.DONE_LOADING_ACTIVITIES,
    //             payload: { activities: response.data },
    //         });
    //     } catch (e) {
    //         dispatch({
    //             type: Methods.ACTIVITIES_ERROR,
    //             payload: { error: e },
    //         });
    //     }
    // };

    // useEffect(() => {
    //     loadActivities();
    // }, dependencyArray);

    // return [
    //     activityState,
    //     {
    //         startActivity,
    //         createCompletedActivity,
    //         stopActivity,
    //         resumeActivity,
    //         trashActivity,
    //         untrashActivity,
    //         updateActivity,
    //         removeActivity,
    //     },
    // ];
};

export { useActivityRepository };
