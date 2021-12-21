import React from "react";
import { List, ListItem, Divider } from "@mui/material";

/**
 * Display a list of activities, which may be a combination of `CompletedActivity` and `RunningActivity`
 * components.
 * @param {object} props
 * @param {Array<ActivityModel>} props.activities The list of activity models to display.
 */
const ActivityList = ({
    activities,
    renderCompletedActivity,
    renderStartedActivity,
}) => {
    return (
        <List>
            {activities.map((activity) => (
                <React.Fragment key={activity._id}>
                    <ListItem>
                        {activity.endTime
                            ? renderCompletedActivity(activity)
                            : renderStartedActivity(activity)}
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default ActivityList;
