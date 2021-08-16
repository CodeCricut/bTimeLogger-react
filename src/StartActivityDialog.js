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
    Typography,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Dialog,
    Button,
    FormGroup,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import useDialogFormStyles from "./hooks/useDialogFormStyles";

import { RUNNING, COMPLETED } from "./data/activity-statuses";
import activityTypes from "./data/activity-types";
import ActivityTypeSelect from "./ActivityTypeSelect";

const StartActivityDialog = ({
    isOpen,
    onClose,
    selectedType,
    setSelectedType,
}) => {
    const classes = useDialogFormStyles();

    const [status, setStatus] = useState(RUNNING);

    // only show if not running
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [existingSelectedType, setExistingSelectedType] = useState("");
    const [newSelectedType, setNewSelectedType] = useState("");

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Start Activity</DialogTitle>
            <DialogContent>
                <Box className={classes.form}>
                    <Box className={classes.inputShort}>
                        <ActivityTypeSelect
                            selectedValue={existingSelectedType}
                            setSelectedValue={setExistingSelectedType}
                            inputValue={newSelectedType}
                            setInputValue={setNewSelectedType}
                        />
                    </Box>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Comment
                        </Typography>
                        <TextField
                            className={classes.inputLong}
                            multiline
                            margin="dense"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Status
                        </Typography>
                        <Select
                            fullWidth
                            className={classes.inputShort}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            labelId="activity-status-label"
                        >
                            <MenuItem value={COMPLETED} key={COMPLETED}>
                                {COMPLETED}
                            </MenuItem>
                            <MenuItem value={RUNNING} key={RUNNING}>
                                {RUNNING}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {status == COMPLETED && (
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <FormControl className={classes.labeledInput}>
                                <Typography className={classes.label}>
                                    From
                                </Typography>
                                <KeyboardDatePicker
                                    className={classes.inputShort}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/DD/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={fromDate}
                                    onChange={(date) => setFromDate(date)}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.labeledInput}>
                                <Typography className={classes.label}>
                                    To
                                </Typography>
                                <KeyboardDatePicker
                                    className={classes.inputShort}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/DD/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={toDate}
                                    onChange={(date) => setToDate(date)}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </FormControl>
                        </MuiPickersUtilsProvider>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} variant="contained" color="primary">
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StartActivityDialog;
