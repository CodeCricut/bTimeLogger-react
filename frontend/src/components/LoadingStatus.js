import React from "react";
import { Typography } from "@mui/material";

const styles = {
    textAlign: "center",
};

const LoadingStatus = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <Typography variant="h3" sx={styles}>
                    Loading...
                </Typography>
            )}
        </>
    );
};

export default LoadingStatus;
