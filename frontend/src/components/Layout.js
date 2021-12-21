import React from "react";
import ActivityList from "./ActivityList.js";
import Activity from "./Activity.js";
import CompletedActivityMenu from "./CompletedActivityMenu";
import Duration from "./Duration.js";
import useDate from "../hooks/useDate.js";

import { useActivityRepository } from "../activities/useActivityRepository.js";
import StartedActivityMenu from "./StartedActivityMenu.js";

const Layout = () => {
    const [activityState] = useActivityRepository();
    const currentDate = useDate();

    const handleEdit = () => {
        console.log("handle edit");
    };

    const handleResume = () => {
        console.log("handle resume");
    };

    const handleTrash = () => {
        console.log("handle trash");
    };

    const handleStop = () => {
        console.log("handle stop");
    };

    return (
        <div>
            <ActivityList
                activities={activityState.activities}
                renderCompletedActivity={(activity) => (
                    <Activity
                        activity={activity}
                        renderMenu={() => (
                            <CompletedActivityMenu
                                handleEdit={() => handleEdit(activity)}
                                handleResume={() => handleResume(activity)}
                                handleTrash={() => handleTrash(activity)}
                            />
                        )}
                        renderDuration={() => (
                            <Duration
                                startDate={activity.startTimeDate}
                                endDate={activity.endTimeDate}
                            />
                        )}
                    />
                )}
                renderStartedActivity={(activity) => (
                    <Activity
                        activity={activity}
                        renderMenu={() => (
                            <StartedActivityMenu handleStop={handleStop} />
                        )}
                        renderDuration={() => (
                            <Duration
                                startDate={activity.startTimeDate}
                                endDate={currentDate}
                            />
                        )}
                    />
                )}
            />
        </div>
    );
};

export default Layout;
