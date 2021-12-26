import { useEffect, useState } from "react";
import { ActivityModel } from "../activities/ActivityModel.js";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel.js";

const defaultActivityModel = new ActivityModel(
    "",
    new ActivityTypeModel("", ""),
    "",
    new Date(),
    new Date(),
    false
);

/**
 * @param {ActivityModel} activity The original activity.
 * @returns {Array<{activity: ActivityModel, invalidState:boolean, isActivityRunning: boolean}|{setComment, setFromDate, setToDate, setType}>} Array where the first element is the form state object, and the second is an object with functions for modifying the form state.
 */
const useActivityFormState = (activityModel = defaultActivityModel) => {
    const [activity, setActivity] = useState(activityModel);

    const [typeName, setTypeName] = useState(activity.type.name);
    const [comment, setComment] = useState(activity.comment);
    const [fromDate, setFromDate] = useState(activity.startTimeDate);
    const [toDate, setToDate] = useState(activity.endTimeDate);

    const [isActivityRunning, setIsActivityRunning] = useState(true);

    const [invalidState, setInvalidState] = useState(false);

    useEffect(() => {
        const activity = new ActivityModel(
            "",
            new ActivityTypeModel("", typeName),
            comment,
            fromDate,
            toDate,
            false
        );
        setActivity(activity);
    }, [typeName, comment, fromDate, toDate, isActivityRunning]);

    return [
        {
            activity,
            typeName,
            comment,
            fromDate,
            toDate,
            isActivityRunning,
            invalidState,
        },
        {
            setTypeName,
            setComment,
            setFromDate,
            setToDate,
            setIsActivityRunning,
        },
    ];
};

export default useActivityFormState;
