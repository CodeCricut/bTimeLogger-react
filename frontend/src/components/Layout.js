import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import AppDrawer from "./AppDrawer";
import SearchAppBar from "./SearchAppBar";
import InlineStartActivity from "./InlineStartActivity";
import AppDrawerItems from "./AppDrawerItems";
import FilteredActivityList from "./FilteredActivityList";

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
    const [queryString, setQueryString] = useState("");

    return (
        <React.Fragment>
            <SearchAppBar
                openDrawer={() => setIsDrawerOpen(true)}
                queryString={queryString}
                setQueryString={setQueryString}
            />
            <AppDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <AppDrawerItems />
            </AppDrawer>
            <Container sx={styles.layoutContainer}>
                <Box sx={styles.startActivityContainer}>
                    <InlineStartActivity />
                </Box>
                <Box sx={styles.activityList}>
                    <FilteredActivityList queryString={queryString} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
