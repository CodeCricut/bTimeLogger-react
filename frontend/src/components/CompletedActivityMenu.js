import React from "react";
import { Box, Typography, Select, MenuItem, Tooltip } from "@mui/material";
import MenuDropdown from "./MenuDropdown";
import { useActivityRepository } from "../activities/useActivityRepository";

import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useModalContext } from "../modals/ModalProvider.js";
import EditActivityDialog from "./EditActivityDialog";

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
const CompletedActivityMenu = ({ activity }) => {
    const [_, { resumeActivity, trashActivity, untrashActivity }] =
        useActivityRepository();
    const [setModal, unsetModal] = useModalContext();

    const handleEdit = () => {
        setModal(<EditActivityDialog activity={activity} />);
    };

    return (
        <Box sx={style.container}>
            <MenuDropdown tooltipText={"Options"} sx={style.menu}>
                <MenuItem onClick={handleEdit}>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={async () => resumeActivity(activity._id)}>
                    <PlayArrowIcon />
                    Resume
                </MenuItem>
                {activity.trashed ? (
                    <MenuItem
                        onClick={async () => untrashActivity(activity._id)}
                    >
                        <RestoreFromTrashIcon />
                        Restore (untrash)
                    </MenuItem>
                ) : (
                    <MenuItem onClick={async () => trashActivity(activity._id)}>
                        <DeleteIcon />
                        Trash
                    </MenuItem>
                )}
            </MenuDropdown>
        </Box>
    );
};

export default CompletedActivityMenu;
