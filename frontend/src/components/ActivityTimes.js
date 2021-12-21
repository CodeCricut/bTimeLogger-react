import React from "react";
import { Typography, Box } from "@mui/material";
import Moment from "react-moment";

import { ActivityModel } from "../activities/ActivityModel";

const style = {
    fontSize: 12,
    color: "text.secondary",
    dateTime: {
        fontWeight: "bold",
        fontFamily: "Courier",
        fontSize: "80%",
        verticalAlign: "center",
    },
};

/**
 * @param {object} props
 * @param {ActivityModel} props.activity
 */
const ActivityTimes = ({ activity }) => {
    return (
        <Typography variant="subtitle1" sx={style}>
            {activity.endTimeDate ? (
                <React.Fragment>
                    <Box sx={style.dateTime} component="span">
                        <Moment>{activity.startTimeDate}</Moment>
                    </Box>
                    {" - "}
                    <Box sx={style.dateTime} component="span">
                        <Moment>{activity.endTimeDate}</Moment>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    Started at{" "}
                    <Box sx={style.dateTime} component="span">
                        <Moment>{activity.startTimeDate}</Moment>
                    </Box>
                </React.Fragment>
            )}
        </Typography>
    );
};

export default ActivityTimes;
