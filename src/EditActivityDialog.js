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
import useDialogFormStyles from "./hooks/useDialogFormStyles";

import { RUNNING, COMPLETED } from "./data/activity-statuses";
import { useMainContext } from "./data/MainContext";
import { EDIT_ACTIVITY } from "./data/activity-reducer";
import { ADD_TYPE } from "./data/type-reducer";
import ActivityTypeSelect from "./ActivityTypeSelect";
import useDateTimeStyles from "./hooks/useDateTimeStyles";

const EditActivityDialog = ({ isOpen, onClose, activity }) => {
    const classes = useDialogFormStyles();
    const dateTimeClasses = useDateTimeStyles();

    const [{ types }, dispatch] = useMainContext();
    const [selectedType, setSelectedType] = useState(activity.type.name);

    const [invalidType, setInvalidType] = useState(false);
    useEffect(() => {
        if (!selectedType) setInvalidType(true);
        else setInvalidType(false);
    }, [selectedType]);

    const [status, setStatus] = useState(
        activity.endTime ? COMPLETED : RUNNING
    );

    const [comment, setComment] = useState(activity.comment);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const reset = () => {
        setStatus(RUNNING);
        setFromDate(new Date());
        setToDate(new Date());
        setComment("");
    };
    useEffect(() => {
        if (!activity) reset();
        else {
            if (activity.endTime) setStatus(COMPLETED);
            else setStatus(RUNNING);
            setFromDate(activity.startTime);
            setToDate(activity.endTime);
            setComment(activity.comment);
        }
    }, [activity]);

    const addType = () => {
        const activityType = {
            name: selectedType,
        };
        dispatch({ type: ADD_TYPE, payload: activityType });
        return activityType;
    };

    const editAsRunningActivity = (type) => {
        const editedActivity = {
            ...activity,
            type: type,
            comment: comment,
            startTime: fromDate,
            endTime: null,
        };
        dispatch({ type: EDIT_ACTIVITY, payload: editedActivity });
    };

    const editAsCompletedActivity = (type) => {
        const editedActivity = {
            ...activity,
            type: type,
            comment: comment,
            startTime: fromDate,
            endTime: toDate,
        };
        dispatch({ type: EDIT_ACTIVITY, payload: editedActivity });
    };

    const editActivity = () => {
        const type = addType();

        if (status === RUNNING) editAsRunningActivity(type);
        else editAsCompletedActivity(type);

        onClose();
    };

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Edit Activity</DialogTitle>
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
                                    <KeyboardTimePicker
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
                    disabled={invalidType}
                    onClick={editActivity}
                    variant="contained"
                    color="primary"
                >
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditActivityDialog;
