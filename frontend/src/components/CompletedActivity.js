import React from "react";
import Activity from "./Activity";

import CompletedActivityMenu from "./CompletedActivityMenu";
import Duration from "./Duration.js";

import StartedActivityMenu from "./StartedActivityMenu.js";
const CompletedActivity = ({ activity, handleEdit }) => {
    return (
        <Activity
            activity={activity}
            renderMenu={() => (
                <CompletedActivityMenu
                    activity={activity}
                    onEdit={() => handleEdit(activity)}
                />
            )}
            renderDuration={() => (
                <Duration
                    startDate={activity.startTimeDate}
                    endDate={activity.endTimeDate}
                />
            )}
        />
    );
};

export default CompletedActivity;
