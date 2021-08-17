import React, { useEffect, useState } from "react";
import { IconButton, Box, Typography } from "@material-ui/core";
import { Stop as StopIcon } from "@material-ui/icons";
import Moment from "react-moment";
import useRunningActivityStyles from "./hooks/useRunningActivityStyles";
import useDate from "./hooks/useDate";
import moment from "moment";
import { formatDuration } from "./util/timeFormatters";

const RunningActivity = ({ activity }) => {
    const classes = useRunningActivityStyles();
    const date = useDate(1000);

    return (
        <Box className={classes.activityBox}>
            <Typography variant="h6" className={classes.activityName}>
                {activity.type.name}
            </Typography>
            <IconButton className={classes.stopButton}>
                <StopIcon />
            </IconButton>
            <Typography
                variant="subtitle1"
                className={`${classes.time} ${classes.subtitle}`}
            >
                <Moment>{activity.startTime}</Moment> - now
            </Typography>
            <Typography
                variant="subtitle1"
                className={`${classes.duration} ${classes.subtitle}`}
                aria-rowcount
            >
                {formatDuration(activity.startTime, date)}
            </Typography>
        </Box>
    );
};

export default RunningActivity;
