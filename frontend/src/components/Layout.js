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
import StartActivityDialog from "./StartActivityDialog";

const styles = {
    layoutContainer: {},
    startActivityContainer: {},
    activityList: {},
};

const Layout = () => {
    const [activityState, {}] = useActivityRepository();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isStartActivityDialogOpen, setIsStartActivityDialogOpen] =
        useState(false);

    return (
        <React.Fragment>
            <SearchAppBar openDrawer={() => setIsDrawerOpen(true)} />
            <AppDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <AppDrawerItems />
            </AppDrawer>
            <StartActivityDialog
                isOpen={isStartActivityDialogOpen}
                onClose={() => setIsStartActivityDialogOpen(false)}
            />
            <Container sx={styles.layoutContainer}>
                <Box sx={styles.startActivityContainer}>
                    <InlineStartActivity
                        openStartActivityDialog={() =>
                            setIsStartActivityDialogOpen(true)
                        }
                    />
                </Box>
                <Box sx={styles.activityList}>
                    <ActivityList activities={activityState.activities} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
