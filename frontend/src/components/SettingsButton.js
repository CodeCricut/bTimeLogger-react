import React from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const styles = {
    marginRight: 1,
    height: 1,
    color: "inherit",
};

const SettingsButton = ({ onClick }) => {
    return (
        <IconButton sx={styles} onClick={onClick}>
            <SettingsIcon />
        </IconButton>
    );
};

export default SettingsButton;
