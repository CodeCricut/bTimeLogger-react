import React from "react";
import { Box, Typography, Select, MenuItem, Tooltip } from "@mui/material";
import MenuDropdown from "./MenuDropdown";

import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
    },
    menu: {
        alignSelf: "center",
        justifySelf: "center",
        margin: 0,
        padding: 0,
        "& .MuiSelect-select": {
            padding: 0,
            margin: 200,
        },
    },
};
const CompletedActivityMenu = ({ handleEdit, handleResume, handleTrash }) => {
    return (
        <Box sx={style.container}>
            <MenuDropdown tooltipText={"Options"} sx={style.menu}>
                <MenuItem onClick={handleEdit}>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleResume}>
                    <PlayArrowIcon />
                    Resume
                </MenuItem>
                <MenuItem onClick={handleTrash}>
                    <DeleteIcon />
                    Trash
                </MenuItem>
            </MenuDropdown>
        </Box>
    );
};

export default CompletedActivityMenu;
