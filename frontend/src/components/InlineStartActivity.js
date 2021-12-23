import React, { useState, useEffect } from "react";
import { FormControl, IconButton, Box, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ActivityTypeSelect from "./ActivityTypeSelect";
import { useTypeRepository } from "../activity-types/useTypeRepository";

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

const InlineStartActivity = ({ openStartActivityDialog }) => {
    const [typeState, {}] = useTypeRepository();
    const [selectedType, setSelectedType] = useState("");
    const [invalidType, setInvalidType] = useState(false);

    function startActivity() {
        console.log("start activity " + selectedType);
    }

    function tuneActivity() {
        openStartActivityDialog();
    }

    useEffect(() => {
        if (!selectedType) setInvalidType(true);
        else setInvalidType(false);
    }, [selectedType]);

    return (
        <Paper variant="outlined" sx={styles.outline}>
            <FormControl sx={styles.formControl}>
                <Box sx={styles.select}>
                    <ActivityTypeSelect
                        onEnter={() => startActivity()}
                        types={typeState.types}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                </Box>
                <Box sx={styles.formButtons}>
                    <Tooltip title="Start Activity">
                        <span>
                            <IconButton
                                disabled={invalidType}
                                sx={styles.menuButton}
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
