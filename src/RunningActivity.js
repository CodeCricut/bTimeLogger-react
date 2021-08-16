import React from "react";
import { IconButton, Box, Typography } from "@material-ui/core";
import { Stop as StopIcon } from "@material-ui/icons";

import useRunningActivityStyles from "./hooks/useRunningActivityStyles";

const RunningActivity = ({ activity }) => {
    const classes = useRunningActivityStyles();

    return (
        <Box className={classes.activityBox}>
            <Typography variant="h6" className={classes.activityName}>
                {activity.name}
            </Typography>
            <IconButton className={classes.stopButton}>
                <StopIcon />
            </IconButton>
            <Typography
                variant="subtitle1"
                className={`${classes.time} ${classes.subtitle}`}
            >
                {activity.startTime} - TODO
            </Typography>
            <Typography
                variant="subtitle1"
                className={`${classes.duration} ${classes.subtitle}`}
                aria-rowcount
            >
                10 hours
            </Typography>
        </Box>
    );
};

export default RunningActivity;
