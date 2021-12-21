import React from "react";
import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import MenuDropdown from "./MenuDropdown";

import StopIcon from "@mui/icons-material/Stop";

const style = {
    container: {
        display: "flex",
        width: 1,
        justifyContent: "center",
    },
    button: {
        color: "error.main",
    },
};

const StartedActivityMenu = ({ handleStop }) => {
    return (
        <Box sx={style.container}>
            <IconButton sx={style.button} onClick={handleStop}>
                <StopIcon />
            </IconButton>
        </Box>
    );
};

export default StartedActivityMenu;
