import React from "react";
import { Box, Typography } from "@mui/material";

const style = {
    name: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
        color: "text.secondary",
    },
};
const ActivityTypeHeader = ({ activity }) => {
    return (
        <Box>
            <Typography variant="h6" sx={style.name}>
                Activity type name
            </Typography>
            <Typography variant="subtitle1" sx={style.subtitle}>
                (trashed?)
            </Typography>
        </Box>
    );
};

export default ActivityTypeHeader;
