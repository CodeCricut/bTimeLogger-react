import React, { useEffect, useState } from "react";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    IconButton,
    Box,
    Paper,
    Tooltip,
} from "@material-ui/core";
import { Add as AddIcon, Tune as TuneIcon } from "@material-ui/icons";

import StartActivityDialog from "./StartActivityDialog";
import useInlineStartActivityStyles from "./hooks/useInlineStartActivityStyles";

import ActivityTypeSelect from "./ActivityTypeSelect";
import { ADD_TYPE } from "./data/type-reducer";
import { useMainContext } from "./data/MainContext";
import { START_ACTIVITY } from "./data/activity-reducer";

const InlineStartActivity = () => {
    const classes = useInlineStartActivityStyles();
    const [{ types }, dispatch] = useMainContext();

    const [selectedType, setSelectedType] = useState("");
    const [invalidType, setInvalidType] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!selectedType) setInvalidType(true);
        else setInvalidType(false);
    }, [selectedType]);

    const startActivity = () => {
        if (invalidType) return;

        const activityType = {
            name: selectedType,
        };
        const activity = {
            type: activityType, //
        };
        dispatch({ type: ADD_TYPE, payload: activityType });
        dispatch({ type: START_ACTIVITY, payload: activity });
        setSelectedType("");
    };

    const tuneActivity = () => {
        setIsDialogOpen(true);
    };

    return (
        <React.Fragment>
            <StartActivityDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <Paper variant="outlined" className={classes.outline}>
                <FormControl className={classes.formControl}>
                    <Box className={classes.select}>
                        <ActivityTypeSelect
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            onEnter={() => startActivity()}
                        />
                    </Box>

                    <Box className={classes.formButtons}>
                        <Tooltip title="Start Activity">
                            <span>
                                <IconButton
                                    disabled={invalidType}
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="start activity"
                                    onClick={startActivity}
                                >
                                    <AddIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Adjust Activity">
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="tune activity"
                                onClick={tuneActivity}
                            >
                                <TuneIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </FormControl>
            </Paper>
        </React.Fragment>
    );
};

export default InlineStartActivity;
