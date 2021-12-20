import React from "react";
import { List, ListItem, Divider } from "@material-ui/core";

import RunningActivity from "./RunningActivity";
import CompletedActivity from "./CompletedActivity";

/**
 * Display a list of activities, which may be a combination of `CompletedActivity` and `RunningActivity`
 * components.
 * @param {object} props
 * @param {Array<ActivityModel>} props.activities The list of activity models to display.
 */
const ActivityList = ({ activities }) => {
    return (
        <List>
            {activities.map((act) => (
                <React.Fragment key={act._id}>
                    <ListItem>
                        {act.endTime ? (
                            <CompletedActivity activity={act} />
                        ) : (
                            <RunningActivity activity={act} />
                        )}
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export { ActivityList };
