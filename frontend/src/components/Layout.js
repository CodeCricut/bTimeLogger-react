import React from "react";
import ActivityList from "./ActivityList.js";
import Activity from "./Activity.js";
import CompletedActivityMenu from "./CompletedActivityMenu";

import { useActivityRepository } from "../activities/useActivityRepository.js";
import StartedActivityMenu from "./StartedActivityMenu.js";

const Layout = () => {
    const [activityState] = useActivityRepository();

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
                    />
                )}
                renderStartedActivity={(activity) => (
                    <Activity
                        activity={activity}
                        renderMenu={() => (
                            <StartedActivityMenu handleStop={handleStop} />
                        )}
                    />
                )}
            />
        </div>
    );
};

export default Layout;
