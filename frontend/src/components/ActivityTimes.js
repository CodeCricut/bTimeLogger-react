import React from "react";
import { Typography } from "@mui/material";
import Moment from "react-moment";

const style = {
    fontSize: 12,
    color: "text.secondary",
};

const ActivityTimes = ({ activity }) => {
    return (
        <Typography variant="subtitle1" sx={style}>
            <Moment>{activity.startTimeDate}</Moment> -{" "}
            <Moment>{activity.endTimeDate}</Moment>
        </Typography>
    );
};

export default ActivityTimes;
