import React, { useState } from "react";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    makeStyles,
    IconButton,
    Box,
    Paper,
    Typography,
} from "@material-ui/core";
import { Stop as StopIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    activityBox: {
        display: "grid",
        // gridTemplateColumns: "[title-start] 300px 100px [title-end] 50px",
        gridTemplateColumns: "[title-start] 3fr 1fr [title-end] 50px",
        // gridTemplateColumns: "[title-start] 6fr 2fr [title-end] 1fr",
        width: "100%",
        overflow: "hidden",
        "& *": {
            overflow: "hidden",
        },
    },
    activityName: {
        gridColumn: "title-start",
    },
    stopButton: {
        gridRow: "1 / 3",
        gridColumn: "3",
        margin: 0,
        height: "fit-content",
        alignSelf: "center",
        color: theme.palette.error.main,
        // color: "#f44336",
    },
    time: {
        gridRow: "2",
        gridColumn: "1",
    },
    duration: {
        gridRow: "2",
        gridColumn: "2 / 3",
    },
}));

const RunningActivity = ({ activity }) => {
    const classes = useStyles();

    return (
        <Box className={classes.activityBox}>
            <Typography variant="h6" className={classes.activityName}>
                {activity.name}
            </Typography>
            <IconButton className={classes.stopButton}>
                <StopIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.time}>
                {activity.startTime} - TODO
            </Typography>
            <Typography
                variant="subtitle1"
                className={classes.duration}
                aria-rowcount
            >
                10 hours
            </Typography>
        </Box>
    );
};

export default RunningActivity;
