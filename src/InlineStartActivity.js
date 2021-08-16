import React, { useState } from "react";
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

const InlineStartActivity = () => {
    const classes = useInlineStartActivityStyles();

    const [existingSelectedType, setExistingSelectedType] = useState("");
    const [newSelectedType, setNewSelectedType] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const startActivity = () => {};

    const tuneActivity = () => {
        console.log("tune");
        setIsDialogOpen(true);
    };

    return (
        <React.Fragment>
            <StartActivityDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                selectedType={newSelectedType}
                setSelectedType={setNewSelectedType}
            />
            <Paper variant="outlined" className={classes.outline}>
                <FormControl className={classes.formControl}>
                    <Box className={classes.select}>
                        <ActivityTypeSelect
                            selectedValue={existingSelectedType}
                            setSelectedValue={setExistingSelectedType}
                            inputValue={newSelectedType}
                            setInputValue={setNewSelectedType}
                        />
                    </Box>

                    <Box className={classes.formButtons}>
                        <Tooltip title="Start Activity">
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="start activity"
                                onClick={startActivity()}
                            >
                                <AddIcon />
                            </IconButton>
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
