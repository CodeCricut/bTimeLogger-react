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
import useTypeRepository from "./activity-types/useTypeRepository";

const EditActivityDialog = ({ isOpen, onClose, activity }) => {
    const classes = useDialogFormStyles();
    const dateTimeClasses = useDateTimeStyles();

    const [{ types }, addType] = useTypeRepository([]);

    // const [{ types }, dispatch] = useMainContext();

    const [invalidState, setInvalidState] = useState(false);

    const [selectedType, setSelectedType] = useState(activity.type.name);
    useEffect(() => {
        if (!selectedType) {
            setInvalidState(true);
        } else setInvalidState(false);
    }, [selectedType]);

    const [comment, setComment] = useState(activity.comment);

    const [status, setStatus] = useState(
        activity.endTime ? COMPLETED : RUNNING
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
        setStatus(activity.endTime ? COMPLETED : RUNNING);
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
        // dispatch({ type: ADD_TYPE, payload: activityType });
        return activityType;
    };

    const editAsRunningActivity = (type) => {
        // We could give ability to choose start time, but would have to display only fromDate picker when in RUNNING state,
        // then do validation and so on.
        // const editedActivity = {
        //     ...activity,
        //     type: type,
        //     comment: comment,
        // };
        // dispatch({ type: EDIT_ACTIVITY, payload: editedActivity });
    };

    const editAsCompletedActivity = (type) => {
        // const editedActivity = {
        //     ...activity,
        //     type: type,
        //     comment: comment,
        //     startTime: fromDate,
        //     endTime: toDate,
        // };
        // dispatch({ type: EDIT_ACTIVITY, payload: editedActivity });
    };

    const editActivity = () => {
        const type = addTypeX();

        if (status === RUNNING) editAsRunningActivity(type);
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
