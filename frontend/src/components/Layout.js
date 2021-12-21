import React from "react";
import { Container, Box } from "@mui/material";

const styles = {
    layoutContainer: {},
    startActivityContainer: {},
    activityList: {},
};
const Layout = ({ renderStartActivity, renderActivityList }) => {
    return (
        <Container sx={styles.layoutContainer}>
            <Box sx={styles.startActivityContainer}>
                {renderStartActivity()}
            </Box>
            <Box sx={styles.activityList}>{renderActivityList()}</Box>
        </Container>
    );
};

export default Layout;
