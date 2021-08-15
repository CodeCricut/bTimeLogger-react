import React, { useState } from "react";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    makeStyles,
    IconButton,
    Box,
    Paper,
} from "@material-ui/core";
import { Add as AddIcon, Tune as TuneIcon } from "@material-ui/icons";

const activityTypes = ["Sleep", "Reading", "Coding"];

const useStyles = makeStyles((theme) => ({
    outline: {
        width: "fit-content",
        width: 600,
        minWidth: 300,
        padding: theme.spacing(1),
        margin: "0 auto",
    },
    formControl: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    formButtons: {},
    menuButton: {},
    select: {
        minWidth: 120,
    },
}));
const InlineStartActivity = () => {
    const classes = useStyles();

    const [selectedType, setSelectedType] = useState("");

    const startActivity = () => {};

    const tuneActivity = () => {};
    return (
        <Paper variant="outlined" className={classes.outline}>
            <FormControl className={classes.formControl}>
                <InputLabel id="activity-type-label">Activity Type</InputLabel>
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
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="start activity"
                        onClick={startActivity()}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="tune activity"
                        onClick={tuneActivity}
                    >
                        <TuneIcon />
                    </IconButton>
                </Box>
            </FormControl>
        </Paper>
    );
};

export default InlineStartActivity;
