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

import activityTypes from "./data/activity-types";

const InlineStartActivity = () => {
    const classes = useInlineStartActivityStyles();

    const [selectedType, setSelectedType] = useState("");
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
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <Paper variant="outlined" className={classes.outline}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="activity-type-label">
                        Activity Type
                    </InputLabel>
                    <Select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        labelId="activity-type-label"
                        className={classes.select}
                    >
                        {activityTypes.map((actType, index) => (
                            <MenuItem value={actType} key={index}>
                                {actType}
                            </MenuItem>
                        ))}
                    </Select>
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
