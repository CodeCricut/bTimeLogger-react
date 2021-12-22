import React, { useState } from "react";
import {
    Drawer,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
    list: {
        width: 250,
    },
    header: {
        display: "flex",
        alignItems: "center",
        padding: 1,
        justifyContent: "flex-end",
    },
};

const AppDrawer = ({ children, open, onClose }) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box
                sx={styles.list}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <Box sx={styles.header}>
                    <IconButton onClick={onClose}>
                        <CloseIcon color="secondary" />
                    </IconButton>
                </Box>
                <Divider />
                <List>{children}</List>
            </Box>
        </Drawer>
    );
};

export default AppDrawer;
