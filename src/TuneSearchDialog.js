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
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import useDialogFormStyles from "./hooks/useDialogFormStyles";
import activityTypes from "./data/activity-types";

const TuneSearchDialog = ({ isOpen, onClose }) => {
    const classes = useDialogFormStyles();

    const [selectedType, setSelectedType] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Search</DialogTitle>
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
                            id="activity-type"
                        >
                            {activityTypes.map((actType, index) => (
                                <MenuItem value={actType} key={index}>
                                    {actType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Search Term
                        </Typography>
                        <TextField
                            className={classes.inputLong}
                            margin="dense"
                            variant="outlined"
                        />
                    </FormControl>
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

export default TuneSearchDialog;
