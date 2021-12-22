import React from "react";
import {
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    AppBar,
    Box,
} from "@mui/material";

import AppBarHeader from "./AppBarHeader";
import AppBarSearchBox from "./AppBarSearchBox";
import SettingsButton from "./SettingsButton";
import InlineStartActivity from "./InlineStartActivity";
import ActivityTypeSelect from "./ActivityTypeSelect";

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
    searchContainer: {
        display: "flex",
    },
    rightSideContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        marginLeft: {
            xs: 2,
        },
    },
};

const SearchAppBar = ({ openDrawer }) => {
    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box sx={styles.toolbarHeader}>
                    <AppBarHeader
                        title={"bTimeLogger"}
                        handleOpenDrawer={openDrawer}
                    />
                </Box>
                <Box sx={styles.searchContainer}>
                    <AppBarSearchBox
                        handleSearch={(term) => console.log(term)}
                        handleTune={() => console.log("tune")}
                        originalTerm="original"
                    />
                </Box>
                <Box sx={styles.rightSideContainer}>
                    <SettingsButton
                        onClick={() => console.log("open settings")}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SearchAppBar;
