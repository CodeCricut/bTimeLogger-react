import React from "react";
import { Typography } from "@mui/material";
import moment from "moment";

const style = {
    fontSize: 12,
    color: "text.secondary",
};

const formatDuration = (startTime, endTime) => {
    const duration = moment.duration(
        Math.abs(new Date(endTime) - new Date(startTime))
    );

    return duration.humanize();
};

const Duration = ({ startDate, endDate }) => {
    return (
        <Typography variant="subtitle1" sx={style}>
            {formatDuration(startDate, endDate)}
        </Typography>
    );
};

export default Duration;
