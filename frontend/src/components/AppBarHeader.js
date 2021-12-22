import React from "react";

import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const styles = {
    menuButton: {
        marginRight: 2,
    },
    title: {
        display: {
            xs: "none",
            sm: "block",
        },
    },
};
const AppBarHeader = ({ handleOpenDrawer, title }) => {
    return (
        <React.Fragment>
            <IconButton
                edge="start"
                sx={styles.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Typography sx={styles.title} variant="h6" noWrap>
                {title}
            </Typography>
        </React.Fragment>
    );
};

export default AppBarHeader;
