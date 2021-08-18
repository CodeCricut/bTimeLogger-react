import React from "react";
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Container,
    AppBar,
    Box,
} from "@material-ui/core";

import {
    Search as SearchIcon,
    Menu as MenuIcon,
    Tune as TuneIcon,
    Settings as SettingsIcon,
    Close as CloseIcon,
} from "@material-ui/icons";

import useSearchAppBarStyles from "./hooks/useSearchAppBarStyles";

const SearchAppBar = ({
    setIsDrawerOpen,
    setIsSearchDialogOpen,
    setIsSettingsDialogOpen,
    searchTerm,
    setSearchTerm,
}) => {
    const classes = useSearchAppBarStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolBar}>
                <div className={classes.toolBarHeader}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        bTimeLogger
                    </Typography>
                </div>
                <div className={classes.search}>
                    <div className={classes.searchStart}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            fullWidth={true}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>

                    <IconButton
                        className={classes.tuneIcon}
                        onClick={() => setIsSearchDialogOpen(true)}
                    >
                        <TuneIcon />
                    </IconButton>
                </div>
                <Box className={classes.barRight}>
                    <IconButton
                        className={classes.tuneIcon}
                        onClick={() => setIsSettingsDialogOpen(true)}
                    >
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SearchAppBar;
