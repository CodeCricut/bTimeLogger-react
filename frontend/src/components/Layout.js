import React, { useState } from "react";
import { Container, Box, ListItem, ListItemText } from "@mui/material";
import AppDrawer from "./AppDrawer";

import { useActivityRepository } from "../activities/useActivityRepository.js";
import { useTypeRepository } from "../activity-types/useTypeRepository.js";
import SearchAppBar from "./SearchAppBar";
import AppBarHeader from "./AppBarHeader";
import AppBarSearchBox from "./AppBarSearchBox";
import SettingsButton from "./SettingsButton";
import InlineStartActivity from "./InlineStartActivity";
import ActivityTypeSelect from "./ActivityTypeSelect";
import ActivityList from "./ActivityList.js";
import AppDrawerItems from "./AppDrawerItems";
import MakeActivityDialog from "./MakeActivityDialog";
import FilteredActivityList from "./FilteredActivityList";
import TuneSearchDialog from "./TuneSearchDialog";
import LoadingStatus from "./LoadingStatus";
import SettingsDialog from "./SettingsDialog.js";

const styles = {
    layoutContainer: {},
    startActivityContainer: {
        width: {
            xs: 1,
            sm: 1 / 2,
            margin: "auto",
            padding: "10px 0",
        },
    },
    activityList: {
        width: 1,
        maxHeight: 1,
    },
};

const Layout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [isMakeActivityDialogOpen, setIsMakeActivityDialogOpen] =
        useState(false);

    const [isTuneSearchDialogOpen, setIsTuneSearchDialogOpen] = useState(false);

    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    const [queryString, setQueryString] = useState("");

    return (
        <React.Fragment>
            <SearchAppBar
                openDrawer={() => setIsDrawerOpen(true)}
                queryString={queryString}
                setQueryString={setQueryString}
                onOpenTuneDialog={() => setIsTuneSearchDialogOpen(true)}
                onOpenSettingsDialog={() => setIsSettingsDialogOpen(true)}
            />
            <AppDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <AppDrawerItems />
            </AppDrawer>
            <MakeActivityDialog
                isOpen={isMakeActivityDialogOpen}
                onClose={() => setIsMakeActivityDialogOpen(false)}
            />
            <TuneSearchDialog
                isOpen={isTuneSearchDialogOpen}
                onClose={() => setIsTuneSearchDialogOpen(false)}
                queryString={queryString}
                setQueryString={setQueryString}
            />
            <SettingsDialog
                isOpen={isSettingsDialogOpen}
                onClose={() => setIsSettingsDialogOpen(false)}
            />
            <Container sx={styles.layoutContainer}>
                <Box sx={styles.startActivityContainer}>
                    <InlineStartActivity
                        openMakeActivityDialog={() =>
                            setIsMakeActivityDialogOpen(true)
                        }
                    />
                </Box>
                <Box sx={styles.activityList}>
                    <FilteredActivityList queryString={queryString} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
