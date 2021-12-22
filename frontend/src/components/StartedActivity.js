import React from "react";

import useDate from "../hooks/useDate.js";
import { useActivityRepository } from "../activities/useActivityRepository";
import Activity from "./Activity.js";
import CompletedActivityMenu from "./CompletedActivityMenu";
import Duration from "./Duration.js";

import StartedActivityMenu from "./StartedActivityMenu.js";
const StartedActivity = ({ activity }) => {
    const [_, { stopActivity }] = useActivityRepository();
    const currentDate = useDate();

    return (
        <Activity
            activity={activity}
            renderMenu={() => (
                <StartedActivityMenu
                    handleStop={async () => stopActivity(activity._id)}
                />
            )}
            renderDuration={() => (
                <Duration
                    startDate={activity.startTimeDate}
                    endDate={currentDate}
                />
            )}
        />
    );
};

export default StartedActivity;
