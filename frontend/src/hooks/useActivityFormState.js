import { useEffect, useState } from "react";
import { ActivityModel } from "../activities/ActivityModel.js";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel.js";

/**
 * @param {ActivityModel} activity The original activity.
 * @returns {[{activity: ActivityModel, invalidState:boolean, isActivityRunning: boolean}, [setComment, setFromDate, setToDate, setType]]}
 */
const useActivityFormState = () => {
    const [activity, setActivity] = useState(
        new ActivityModel(
            "",
            new ActivityTypeModel("", ""),
            "",
            new Date(),
            new Date(),
            false
        )
    );

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
