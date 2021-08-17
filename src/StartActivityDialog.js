import React, { useEffect, useState } from "react";

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
    KeyboardDatePicker,
} from "@material-ui/pickers";
import useDialogFormStyles from "./hooks/useDialogFormStyles";

import { RUNNING, COMPLETED } from "./data/activity-statuses";
import ActivityTypeSelect from "./ActivityTypeSelect";
import { useMainContext } from "./data/MainContext";
import { ADD_TYPE } from "./data/type-reducer";
import {
    CREATE_COMPLETED_ACTIVITY,
    START_ACTIVITY,
} from "./data/activity-reducer";

const StartActivityDialog = ({
    isOpen,
    onClose,
    selectedType,
    setSelectedType,
}) => {
    const classes = useDialogFormStyles();
    const [{ types }, dispatch] = useMainContext();

    const [invalidType, setInvalidType] = useState(false);
    useEffect(() => {
        if (!selectedType) setInvalidType(true);
        else setInvalidType(false);
    }, [selectedType]);

    const [status, setStatus] = useState(RUNNING);

    const [comment, setComment] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    // TODO: need fromTime & toTime

    const reset = () => {
        setStatus(RUNNING);
        setFromDate(new Date());
        setToDate(new Date());
        setComment("");
    };

    useEffect(reset, [isOpen]);

    const addType = () => {
        const activityType = {
            name: selectedType,
        };
        dispatch({ type: ADD_TYPE, payload: activityType });
        return activityType;
    };

    const startRunningActivity = (activityType) => {
        const activity = {
            type: activityType,
        };
        dispatch({ type: START_ACTIVITY, payload: activity });
    };

    const createCompletedActivity = (activityType) => {
        const activity = {
            type: activityType,
            comment: comment,
            startTime: fromDate,
            endTime: toDate,
        };
        dispatch({ type: CREATE_COMPLETED_ACTIVITY, payload: activity });
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
