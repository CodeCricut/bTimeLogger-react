import React, { useState, useEffect } from "react";
import { FormControl, IconButton, Box, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ActivityTypeSelect from "./ActivityTypeSelect";
import { useTypeRepository } from "../activity-types/useTypeRepository";
import { useActivityRepository } from "../activities/useActivityRepository";
import { ActivityModel } from "../activities/ActivityModel";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel";

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
        width: 0.9,
    },
    formButtons: {
        display: "flex",
    },
    menuButton: {},
};

const InlineStartActivity = ({ openMakeActivityDialog }) => {
    const [typeState, { addType }] = useTypeRepository();
    const [activityState, { startNewActivity }] = useActivityRepository();
    const [selectedType, setSelectedType] = useState("");
    const [invalidType, setInvalidType] = useState(false);

    async function startActivity() {
        // TODO: it is pretty messy to have to add a type just to add an activity. Ideally, we would have some nice function like startNewActivity(selectedTypeName).
        if (invalidType) return;
        const type = await addType(new ActivityTypeModel("", selectedType));
        const activity = new ActivityModel(null, type._id, "");
        await startNewActivity(activity);
        setSelectedType("");
    }

    function tuneActivity() {
        openMakeActivityDialog();
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
                        onEnter={async () => await startActivity()}
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
                                onClick={async () => await startActivity()}
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
