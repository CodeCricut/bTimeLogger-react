import React, { useState, useEffect } from "react";
import { FormControl, IconButton, Box, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ActivityTypeSelect from "./ActivityTypeSelect";

const styles = {
    outline: {
        width: "100%",
        flexGrow: 1,
        minWidth: 300,
        padding: 1,
        margin: "0 auto",
    },
    formControl: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    select: {
        minWidth: 120,
        width: "50%",
    },
    formButtons: {},
    menuButton: {},
};

const InlineStartActivity = ({
    renderTypeSelect,
    startActivity,
    tuneActivity,
}) => {
    const [selectedType, setSelectedType] = useState("");
    const [invalidType, setInvalidType] = useState(false);

    useEffect(() => {
        if (!selectedType) setInvalidType(true);
        else setInvalidType(false);
    }, [selectedType]);

    return (
        <Paper variant="outlined" sx={styles.outline}>
            <FormControl sx={styles.formControl}>
                <Box sx={styles.select}>{renderTypeSelect()}</Box>
                <Box sx={styles.formButtons}>
                    <Tooltip title="Start Activity">
                        <span>
                            <IconButton
                                disabled={invalidType}
                                className={styles.menuButton}
                                color="inherit"
                                onClick={startActivity}
                            >
                                <AddIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Adjust Activity">
                        <IconButton
                            sx={styles.menuButton}
                            color="inherit"
                            onClick={tuneActivity}
                        >
                            <TuneIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </FormControl>
        </Paper>
    );
};

export default InlineStartActivity;