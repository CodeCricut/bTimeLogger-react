import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Tooltip } from "@mui/material";

import { ActivityModel } from "../activities/ActivityModel";
import ActivityTimes from "./ActivityTimes";
import ActivityTypeHeader from "./ActivityTypeHeader";
import Duration from "./Duration";

const style = {
    activityBox: {
        display: "grid",
        gridTemplateColumns: "[title-start] 3fr 1fr [title-end] 50px",
        width: "100%",
        overflow: "hidden",
        "& *": {
            overflow: "hidden",
        },
    },
    activityName: {
        gridColumn: "title-start",
    },
    menuContainer: {
        gridRow: "1 / 3",
        gridColumn: "3",
        margin: 0,
        height: "fit-content",
        alignSelf: "center",
    },
    time: {
        gridRow: "2",
        gridColumn: "1",
    },
    duration: {
        gridRow: "2",
        gridColumn: "2",
    },
};

/**
 * @param {object} props
 * @param {ActivityModel} props.activity
 * @param {function(ActivityModel)} props.handleEdit
 * @param {function(ActivityModel)} props.handleResume
 * @param {function(ActivityModel)} props.handleTrash
 */
const Activity = ({ activity, renderMenu, renderDuration }) => {
    return (
        <Box sx={style.activityBox}>
            <Box sx={style.activityName}>
                <ActivityTypeHeader activity={activity} />
            </Box>

            <Box sx={style.menuContainer}>{renderMenu()}</Box>

            <Box sx={style.time}>
                <ActivityTimes activity={activity} />
            </Box>

            <Box sx={style.duration}>{renderDuration()}</Box>
        </Box>
    );
};

export default Activity;
