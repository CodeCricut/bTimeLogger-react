import React from "react";
import { Box, Typography } from "@mui/material";
import { ActivityModel } from "../activities/ActivityModel.js";

const style = {
    name: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
        color: "text.secondary",
    },
};

/**
 * @param {object} props
 * @param {ActivityModel} props.activity
 */
const ActivityTypeHeader = ({ activity }) => {
    return (
        <Box>
            <Typography variant="h6" sx={style.name}>
                {activity.type.name}
            </Typography>
            {activity.trashed && (
                <Typography variant="subtitle1" sx={style.subtitle}>
                    (trashed)
                </Typography>
            )}
        </Box>
    );
};

export default ActivityTypeHeader;
