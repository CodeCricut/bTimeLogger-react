import React, { useEffect, useState } from "react";
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
    useTheme,
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
    selectActivitesBetweenDates,
    selectActivitiesOfType,
    selectActivitiesWithText,
    selectNonTrashedActivities,
    sortActivitiesByNewest,
} from "./data/activity-selectors";
import useActivitySearch from "./useActivitySearch";

const Layout = () => {
    const classes = useLayoutStyles();
    const [{ activities }, dispatch] = useMainContext();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
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

    const searchResultActivities = useActivitySearch({ searchParams });
    useEffect(() => {
        if (searchResultActivities.length > 0) setIsShowingSearchResults(true);
        else setIsShowingSearchResults(false);
    }, [searchResultActivities]);

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
                            value={searchParams.searchTerm}
                            onChange={(e) =>
                                setSearchParam("searchTerm", e.target.value)
                            }
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
        if (!isShowingSearchResults) return;
        return (
            <React.Fragment>
                <Typography variant="h2">Search Results</Typography>
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
                    {searchResultActivityList()}
                    {activityList()}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
