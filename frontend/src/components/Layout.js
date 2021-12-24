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

const styles = {
    layoutContainer: {},
    startActivityContainer: {},
    activityList: {},
};

const Layout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [isMakeActivityDialogOpen, setIsMakeActivityDialogOpen] =
        useState(false);

    const [isTuneSearchDialogOpen, setIsTuneSearchDialogOpen] = useState(false);

    const [queryString, setQueryString] = useState("");

    return (
        <React.Fragment>
            <SearchAppBar
                openDrawer={() => setIsDrawerOpen(true)}
                queryString={queryString}
                setQueryString={setQueryString}
                onOpenTuneDialog={() => setIsTuneSearchDialogOpen(true)}
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
