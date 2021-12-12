import React, { useEffect, useState } from "react";
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
    Box,
} from "@material-ui/core";
import {
    Search as SearchIcon,
    Menu as MenuIcon,
    Tune as TuneIcon,
    Settings as SettingsIcon,
    Close as CloseIcon,
} from "@material-ui/icons";

import InlineStartActivity from "./InlineStartActivity";
import RunningActivity from "./RunningActivity";
import CompletedActivity from "./CompletedActivity";
import TuneSearchDialog from "./TuneSearchDialog";
import useLayoutStyles from "./hooks/useLayoutStyles";

import SettingsDialog from "./SettingsDialog";
import { useMainContext } from "./data/MainContext";
import {
    selectNonTrashedActivities,
    sortActivitiesByNewest,
} from "./data/activity-selectors";
import useActivitySearch from "./hooks/useActivitySearch";
import SearchAppBar from "./SearchAppBar";

import SearchParams from "./model/SearchParams";

import useActivityRepository from "./activities/useActivityRepository";
const initialQueryString = new SearchParams().queryString;

const Layout = () => {
    console.log("layout rerendered");
    const classes = useLayoutStyles();
    // const [{ activities }, dispatch] = useMainContext();
    const [{ activities }] = useActivityRepository([]);

    console.log(activities);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    const [queryString, setQueryString] = useState(initialQueryString);
    const setSearchParam = (paramName, paramValue) => {
        const searchParams = SearchParams.parseQueryString(queryString);
        searchParams[paramName] = paramValue;
        setQueryString(searchParams.queryString);
    };
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
                    <List>
                        {searchResultActivities.map((act) => (
                            <React.Fragment key={act._id}>
                                <ListItem>
                                    {act.endTime ? (
                                        <CompletedActivity activity={act} />
                                    ) : (
                                        <RunningActivity activity={act} />
                                    )}
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
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
                    sortedActivities.map((act) => (
                        <React.Fragment key={act._id}>
                            <ListItem>
                                {act.endTime ? (
                                    <CompletedActivity activity={act} />
                                ) : (
                                    <RunningActivity activity={act} />
                                )}
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))
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
