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
} from "@material-ui/pickers";
import useDialogFormStyles from "./hooks/useDialogFormStyles";

import { RUNNING, COMPLETED } from "./data/activity-statuses";
import { useMainContext } from "./data/MainContext";
import { EDIT_ACTIVITY } from "./data/activity-reducer";
import { ADD_TYPE } from "./data/type-reducer";
import ActivityTypeSelect from "./ActivityTypeSelect";

const EditActivityDialog = ({ isOpen, onClose, activity }) => {
    const classes = useDialogFormStyles();
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
