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

const RUNNING = "Running",
    COMPLETED = "Completed";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        "& > *": {
            width: "100%",
            marginBottom: theme.spacing(3),
        },
    },
    labeledInput: {
        display: "grid",
        gridTemplateColumns: "100px auto 4fr 2fr",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
        },
        alignItems: "center",
    },
    label: {
        color: theme.palette.secondary.main,
        fontSize: 12,
    },
    inputShort: {
        [theme.breakpoints.up("md")]: {
            gridColumn: "3 / 4",
        },
    },
    inputLong: {
        [theme.breakpoints.up("md")]: {
            gridColumn: "3 / 5",
        },
    },
}));

const StartActivityDialog = ({
    isOpen,
    onClose,
    selectedType,
    setSelectedType,
}) => {
    const classes = useStyles();
    const [comment, setComment] = useState("");

    const [status, setStatus] = useState(RUNNING);

    // only show if not running
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Start Activity</DialogTitle>
            <DialogContent>
                <Box className={classes.form}>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Activity Type
                        </Typography>
                        <Select
                            className={classes.inputShort}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            labelId="activity-type-label"
                        >
                            {["Sleep", "Reading", "Coding"].map(
                                (actType, index) => (
                                    <MenuItem value={actType} key={index}>
                                        {actType}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
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
