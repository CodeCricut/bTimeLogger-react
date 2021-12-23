import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 4,
        backgroundColor: alpha("#fff", 0.15),
        "&:hover": {
            backgroundColor: alpha("#fff", 0.25),
        },
        width: {
            xs: "auto",
            sm: "100%",
        },
        marginLeft: {
            xs: 1,
            sm: 2,
        },
    },
    searchStart: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    searchIconContainer: {
        padding: (theme) => theme.spacing(0, 2),
        pointerEvents: "none",
        height: 1,
    },
    clearButton: {
        color: "inherit",
    },
    tuneIcon: {
        marginRight: 1,
        height: 1,
        color: "inherit",
    },
};

/**
 * @param {object} props
 * @param {function} props.handleSearch Callback when the user searches for something.
 * @param {function} props.handleTune Callback when the user selects the tune search button.
 * @param {string} props.originalTerm The default value to populate the search box with, if any.
 */
const AppBarSearchBox = ({ handleSearch, handleTune, originalTerm = "" }) => {
    const [term, setTerm] = useState(originalTerm);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(term);
        }
    };

    const handleClearSearch = () => {
        setTerm("");
        handleSearch("");
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.searchStart}>
                <Box sx={styles.searchIconContainer}>
                    <SearchIcon />
                </Box>
                <InputBase
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onKeyPress={handleKeyDown}
                    sx={styles.inputBase}
                    placeholder="Search..."
                    fullWidth
                    inputProps={{ "aria-label": "search" }}
                />
            </Box>
            <IconButton sx={styles.clearButton} onClick={handleClearSearch}>
                <ClearIcon />
            </IconButton>
            <IconButton sx={styles.tuneIcon} onClick={() => handleTune(term)}>
                <TuneIcon />
            </IconButton>
        </Box>
    );
};

export default AppBarSearchBox;
