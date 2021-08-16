import React, { useState } from "react";
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Container,
    Box,
} from "@material-ui/core";
import {
    Search as SearchIcon,
    Menu as MenuIcon,
    Tune as TuneIcon,
} from "@material-ui/icons";

import { makeStyles, alpha } from "@material-ui/core";
import InlineStartActivity from "./InlineStartActivity";
import RunningActivity from "./RunningActivity";
import CompletedActivity from "./CompletedActivity";
import TuneSearchDialog from "./TuneSearchDialog";

const runningActivities = [
    {
        name: "Coding",
        startTime: "10:00 AM",
        endTime: null,
        duration: null,
    },
    {
        name: "Hooping wit da boys",
        startTime: "4:19 PM",
        endTime: null,
        duration: null,
    },
];

const completedActivities = [
    {
        name: "Coding",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        duration: "1 hour",
    },
    {
        name: "Hooping wit da boys",
        startTime: "10:30 AM",
        endTime: "12:00 PM",
        duration: "1.5 hours",
    },
];

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    toolBar: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr 11fr",
        },
    },
    toolBarHeader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",

        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,

        width: "100%",
        [theme.breakpoints.down("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        // position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tuneIcon: {
        marginRight: theme.spacing(1),
        height: "100%",
        color: "inherit",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    searchStart: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 1,
    },
    activities: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    startActivityBox: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        margin: "auto",
        padding: "10px 0",
    },
}));

const Layout = () => {
    const classes = useStyles();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

    const appBar = () => (
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
            </Toolbar>
        </AppBar>
    );

    const drawerList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setIsDrawerOpen(false)}
            onKeyDown={() => setIsDrawerOpen(false)}
        >
            <div className={classes.drawerHeader}>
                <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
            </div>
            <Divider />
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );

    const runningActivityList = () => {
        return (
            <List>
                {runningActivities.map((act, index) => (
                    <React.Fragment>
                        <ListItem key={index}>
                            <RunningActivity activity={act} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        );
    };

    const completedActivityList = () => {
        return (
            <List>
                {completedActivities.map((act, index) => (
                    <React.Fragment>
                        <ListItem key={index}>
                            <CompletedActivity activity={act} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        );
    };

    return (
        <React.Fragment>
            {appBar()}
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                {drawerList()}
            </Drawer>
            <TuneSearchDialog
                isOpen={isSearchDialogOpen}
                onClose={() => setIsSearchDialogOpen(false)}
            />
            <Container>
                <Box className={classes.startActivityBox}>
                    <InlineStartActivity />
                </Box>
                <Box className={classes.activities}>
                    {runningActivityList()}
                    {completedActivityList()}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
