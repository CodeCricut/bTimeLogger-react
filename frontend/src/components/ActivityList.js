import React from "react";
import { List, ListItem, Divider } from "@mui/material";
import { useActivityRepository } from "../activities/useActivityRepository";
import CompletedActivity from "./CompletedActivity.js";
import StartedActivity from "./StartedActivity.js";

/**
 * Display a list of activities, which may be a combination of `CompletedActivity` and `RunningActivity`
 * components.
 * @param {object} props
 * @param {Array<ActivityModel>} props.activities The list of activity models to display.
 */
const ActivityList = ({ activities }) => {
    const handleEdit = async (activity) => {
        // TODO: open edit dialog
        console.log("handle edit");
    };

    return (
        <List>
            {activities.map((activity) => (
                <React.Fragment key={activity._id}>
                    <ListItem>
                        {activity.endTime ? (
                            <CompletedActivity
                                activity={activity}
                                handleEdit={handleEdit}
                            />
                        ) : (
                            <StartedActivity activity={activity} />
                        )}
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default ActivityList;
