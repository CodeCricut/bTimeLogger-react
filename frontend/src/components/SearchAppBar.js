import React from "react";
import {
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    AppBar,
    Box,
} from "@mui/material";

const styles = {
    toolbar: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr 11fr auto",
            sm: "1fr 2fr 1fr auto",
        },
    },
    toolbarHeader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    menuButton: {},
    searchContainer: {
        display: "flex",
    },
    rightSideContainer: {},
};

const SearchAppBar = ({ renderHeader, renderSearchbox, renderRightSide }) => {
    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box sx={styles.toolbarHeader}>{renderHeader()}</Box>
                <Box sx={styles.searchContainer}>{renderSearchbox()}</Box>
                <Box sx={styles.rightSideContainer}>{renderRightSide()}</Box>
            </Toolbar>
        </AppBar>
    );
};

export default SearchAppBar;
