import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    IconButton,
    Container,
    Box,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import InlineStartActivity from "./InlineStartActivity";
import TuneSearchDialog from "./TuneSearchDialog";
import useLayoutStyles from "../style/useLayoutStyles";

import SettingsDialog from "./SettingsDialog";
import {
    selectNonTrashedActivities,
    sortActivitiesByNewest,
} from "../util/activity-selectors";
import useActivitySearch from "../hooks/useActivitySearch";
import SearchAppBar from "./SearchAppBar";

import SearchParams from "../model/SearchParams";

import { useActivityRepository } from "../activities/useActivityRepository";
import { ActivityList } from "./ActivityList";
const initialQueryString = new SearchParams().queryString;

const Layout = () => {
    // Style
    const classes = useLayoutStyles();

    // Local layout state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    // Activity state
    const [{ activities }] = useActivityRepository();

    // Query string state (for activity filtering)
    const [queryString, setQueryString] = useState(initialQueryString);

    const [searchResultActivities, isShowingSearchResults] =
        useActivitySearch(queryString);

    const clearSearch = () => setQueryString(initialQueryString);

    const drawerList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setIsDrawerOpen(false)}
            onKeyDown={() => setIsDrawerOpen(false)}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => setIsDrawerOpen(false)}>
                    <CloseIcon color="secondary" />
                </IconButton>
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

    const searchResultActivityList = () => {
        return (
            <React.Fragment>
                {searchResultActivities.length > 0 ? (
                    <ActivityList activities={searchResultActivities} />
                ) : (
                    <Typography variant="h4">No search results</Typography>
                )}
            </React.Fragment>
        );
    };

    const activityList = () => {
        const sortedActivities = sortActivitiesByNewest(
            selectNonTrashedActivities(activities)
        );
        return (
            <List>
                {sortedActivities.length > 0 ? (
                    <ActivityList activities={sortedActivities} />
                ) : (
                    <Typography variant="h4">No Activities</Typography>
                )}
            </List>
        );
    };

    return (
        <React.Fragment>
            <SearchAppBar
                setIsDrawerOpen={setIsDrawerOpen}
                setIsSearchDialogOpen={setIsSearchDialogOpen}
                setIsSettingsDialogOpen={setIsSettingsDialogOpen}
                queryString={queryString}
                setQueryString={setQueryString}
                clearSearch={clearSearch}
            />
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
                queryString={queryString}
                setQueryString={setQueryString}
            />
            <SettingsDialog
                isOpen={isSettingsDialogOpen}
                onClose={() => setIsSettingsDialogOpen(false)}
            />
            <Container className={classes.layoutContainer}>
                <Box className={classes.startActivityBox}>
                    <InlineStartActivity />
                </Box>
                <Box className={classes.activities}>
                    {isShowingSearchResults
                        ? searchResultActivityList()
                        : activityList()}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
