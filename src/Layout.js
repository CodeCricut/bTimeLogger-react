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

import InlineStartActivity from "./InlineStartActivity";
import RunningActivity from "./RunningActivity";
import CompletedActivity from "./CompletedActivity";
import TuneSearchDialog from "./TuneSearchDialog";
import useLayoutStyles from "./hooks/useLayoutStyles";

import { completedActivities, runningActivities } from "./data/activities";

const Layout = () => {
    const classes = useLayoutStyles();

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
                {["Intervals", "Stastics", "Trash"].map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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
