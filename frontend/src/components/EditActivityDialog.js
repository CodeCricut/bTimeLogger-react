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
import useDialogFormStyles from "../style/useDialogFormStyles";

import { Status } from "../activities/ActivityModel.js";
import ActivityTypeSelect from "./ActivityTypeSelect";
import useDateTimeStyles from "../style/useDateTimeStyles";
import { useTypeRepository } from "../activity-types/useTypeRepository";

const EditActivityDialog = ({ isOpen, onClose, activity }) => {
    const classes = useDialogFormStyles();
    const dateTimeClasses = useDateTimeStyles();

    const [typeState, addType] = useTypeRepository([]);

    const [invalidState, setInvalidState] = useState(false);

    const [selectedType, setSelectedType] = useState(activity.type.name);
    useEffect(() => {
        if (!selectedType) {
            setInvalidState(true);
        } else setInvalidState(false);
    }, [selectedType]);

    const [comment, setComment] = useState(activity.comment);

    const [status, setStatus] = useState(
        activity.endTime ? Status.COMPLETED : Status.RUNNING
    );

    const [fromDate, setFromDate] = useState(activity.startTime ?? new Date());
    const [toDate, setToDate] = useState(activity.endTime ?? new Date());
    useEffect(() => {
        if (fromDate < toDate) {
            setInvalidState(false);
        } else {
            setInvalidState(true);
        }
    }, [fromDate, toDate]);

    const reset = () => {
        setSelectedType(activity.type.name);
        setComment(activity.comment);
        setStatus(activity.endTime ? Status.COMPLETED : Status.RUNNING);
        setFromDate(activity.startTime);
        setToDate(activity.endTime);
    };

    useEffect(() => {
        reset();
    }, [activity]);

    const addTypeX = () => {
        const activityType = {
            name: selectedType,
        };
        addType(selectedType);
        return activityType;
    };

    const editAsRunningActivity = (type) => {
        // TODO
        console.error("editAsRunningActivity not implemented yet.");
    };

    const editAsCompletedActivity = (type) => {
        // TODO
        console.error("editAsCompletedActivity not implemented yet.");
    };

    const editActivity = () => {
        const type = addTypeX();

        if (status === Status.RUNNING) editAsRunningActivity(type);
        else editAsCompletedActivity(type);

        onClose();
    };

    const cancel = () => {
        reset();
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
                            <MenuItem
                                value={Status.COMPLETED}
                                key={Status.COMPLETED}
                            >
                                {Status.COMPLETED}
                            </MenuItem>
                            <MenuItem
                                value={Status.RUNNING}
                                key={Status.RUNNING}
                            >
                                {Status.RUNNING}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {status == Status.COMPLETED && (
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
                <Button onClick={cancel}>Cancel</Button>
                <Button
                    disabled={invalidState}
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
