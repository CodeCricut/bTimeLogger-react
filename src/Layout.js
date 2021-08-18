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

const Layout = () => {
    const classes = useLayoutStyles();
    const [{ activities }, dispatch] = useMainContext();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    const [searchParams, setSearchParams] = useState({
        searchTerm: "",
        selectedType: "",
        doSearchBetweenDates: false,
        fromDate: new Date(),
        toDate: new Date(),
    });

    const setSearchParam = (paramName, paramValue) => {
        setSearchParams((prev) => ({
            ...prev,
            [paramName]: paramValue,
        }));
    };

    const [searchResultActivities, isShowingSearchResults] = useActivitySearch({
        searchParams,
    });

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
                <List>
                    {searchResultActivities.map((act) => (
                        <React.Fragment key={act.id}>
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
            </React.Fragment>
        );
    };

    const activityList = () => {
        return (
            <List>
                {sortActivitiesByNewest(
                    selectNonTrashedActivities(activities)
                ).map((act) => (
                    <React.Fragment key={act.id}>
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
        );
    };

    return (
        <React.Fragment>
            <SearchAppBar
                setIsDrawerOpen={setIsDrawerOpen}
                setIsSearchDialogOpen={setIsSearchDialogOpen}
                setIsSettingsDialogOpen={setIsSettingsDialogOpen}
                searchTerm={searchParams.searchTerm}
                setSearchTerm={(term) => setSearchParam("searchTerm", term)}
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
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <SettingsDialog
                isOpen={isSettingsDialogOpen}
                onClose={() => setIsSettingsDialogOpen(false)}
            />
            <Container>
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
