import React, { useEffect, useState } from "react";

import {
    FormControl,
    Select,
    MenuItem,
    Box,
    Typography,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Dialog,
    Button,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from "@material-ui/pickers";
import useDialogFormStyles from "../hooks/useDialogFormStyles";

import { RUNNING, COMPLETED } from "../data/activity-statuses";
import ActivityTypeSelect from "./ActivityTypeSelect";
import { useMainContext } from "../data/MainContext";
import useDateTimeStyles from "../hooks/useDateTimeStyles";

const StartActivityDialog = ({
    isOpen,
    onClose,
    selectedType,
    setSelectedType,
}) => {
    const classes = useDialogFormStyles();
    const dateTimeClasses = useDateTimeStyles();
    // Should not use main context; replace with useActivityReducer
    const [_, dispatch] = useMainContext();

    const [comment, setComment] = useState("");

    const [status, setStatus] = useState(RUNNING);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [invalidState, setInvalidState] = useState(!selectedType);
    useEffect(() => {
        const invalidType = !selectedType;
        const invalidDates = toDate < fromDate;
        setInvalidState(invalidType || invalidDates);
    }, [selectedType, fromDate, toDate]);

    const reset = () => {
        setStatus(RUNNING);
        setFromDate(new Date());
        setToDate(new Date());
        setComment("");
        setInvalidState(!selectedType);
    };

    useEffect(reset, [isOpen]);

    const addType = () => {
        const activityType = {
            name: selectedType,
        };
        // dispatch({ type: ADD_TYPE, payload: activityType });
        return activityType;
    };

    const startRunningActivity = (activityType) => {
        const activity = {
            type: activityType,
            comment: comment,
        };
        // dispatch({ type: START_ACTIVITY, payload: activity });
    };

    const createCompletedActivity = (activityType) => {
        const activity = {
            type: activityType,
            comment: comment,
            startTime: fromDate,
            endTime: toDate,
        };
        // dispatch({ type: CREATE_COMPLETED_ACTIVITY, payload: activity });
    };

    const handleCreate = () => {
        const activityType = addType();

        if (status === RUNNING) startRunningActivity(activityType);
        else createCompletedActivity(activityType);
        onClose();
    };
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Start Activity</DialogTitle>
            <DialogContent>
                <Box className={classes.form}>
                    <Box className={classes.inputShort}>
                        <ActivityTypeSelect
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />
                    </Box>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Comment
                        </Typography>
                        <TextField
                            className={classes.inputLong}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
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
                                <Box
                                    className={`${classes.inputLong} ${dateTimeClasses.dateTimeContainer}`}
                                >
                                    <KeyboardDatePicker
                                        className={dateTimeClasses.date}
                                        disableToolbar
                                        variant="dialog"
                                        label="start date"
                                        format="MM/DD/yyyy"
                                        margin="normal"
                                        value={fromDate}
                                        onChange={setFromDate}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        label="start time"
                                        className={dateTimeClasses.time}
                                        variant="dialog"
                                        value={fromDate}
                                        margin="normal"
                                        onChange={setFromDate}
                                        KeyboardButtonProps={{
                                            "aria-label": "change time",
                                        }}
                                    />
                                </Box>
                            </FormControl>

                            <FormControl className={classes.labeledInput}>
                                <Typography className={classes.label}>
                                    To
                                </Typography>
                                <Box
                                    className={`${classes.inputLong} ${dateTimeClasses.dateTimeContainer}`}
                                >
                                    <KeyboardDatePicker
                                        className={dateTimeClasses.date}
                                        disableToolbar
                                        variant="dialog"
                                        label="end date"
                                        format="MM/DD/yyyy"
                                        margin="normal"
                                        value={toDate}
                                        onChange={setToDate}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        label="end time"
                                        className={dateTimeClasses.time}
                                        variant="dialog"
                                        value={toDate}
                                        margin="normal"
                                        onChange={setToDate}
                                        KeyboardButtonProps={{
                                            "aria-label": "change time",
                                        }}
                                    />
                                </Box>
                            </FormControl>
                        </MuiPickersUtilsProvider>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    disabled={invalidState}
                    onClick={handleCreate}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StartActivityDialog;
