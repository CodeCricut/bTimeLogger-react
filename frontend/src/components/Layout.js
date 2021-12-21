import React from "react";
import { Container, Box } from "@mui/material";

const styles = {
    layoutContainer: {},
    startActivityContainer: {},
    activityList: {},
};
const Layout = ({ renderAppBar, renderStartActivity, renderActivityList }) => {
    return (
        <React.Fragment>
            {renderAppBar()}
            <Container sx={styles.layoutContainer}>
                <Box sx={styles.startActivityContainer}>
                    {renderStartActivity()}
                </Box>
                <Box sx={styles.activityList}>{renderActivityList()}</Box>
            </Container>
        </React.Fragment>
    );
};

export default Layout;
