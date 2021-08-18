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
    Checkbox,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import useDialogFormStyles from "./hooks/useDialogFormStyles";
import { useMainContext } from "./data/MainContext";
import ActivityTypeSelect from "./ActivityTypeSelect";
import useDateTimeStyles from "./hooks/useDateTimeStyles";

const TuneSearchDialog = ({
    isOpen,
    onClose,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    doSearchBetweenDates,
    setDoSearchBetweenDates,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
}) => {
    const classes = useDialogFormStyles();
    const dateTimeClasses = useDateTimeStyles();

    const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
    useEffect(() => {
        setTempSearchTerm(searchTerm);
    }, [searchTerm]);

    const [tempSelectedType, setTempSelectedType] = useState(selectedType);
    const [tempDoSearchBetweenDates, setTempDoSearchBetweenDates] =
        useState(doSearchBetweenDates);
    const [tempFromDate, setTempFromDate] = useState(fromDate);
    const [tempToDate, setTempToDate] = useState(toDate);

    const handleSearch = () => {
        setSearchTerm(tempSearchTerm);
        setSelectedType(tempSelectedType);
        setDoSearchBetweenDates(tempDoSearchBetweenDates);
        setFromDate(tempFromDate);
        setToDate(tempToDate);
        onClose();
    };

    const handleCancel = () => {
        setTempSearchTerm(searchTerm);
        setTempSelectedType(selectedType);
        setTempDoSearchBetweenDates(doSearchBetweenDates);
        setTempFromDate(fromDate);
        setTempToDate(toDate);
        onClose();
    };

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <Box className={classes.form}>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Search Term
                        </Typography>
                        <TextField
                            className={classes.inputLong}
                            value={tempSearchTerm}
                            onChange={(e) => setTempSearchTerm(e.target.value)}
                            margin="dense"
                            variant="outlined"
                        />
                    </FormControl>
                    <Box className={classes.inputShort}>
                        <ActivityTypeSelect
                            selectedType={tempSelectedType}
                            setSelectedType={setTempSelectedType}
                        />
                    </Box>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Search Between Dates
                        </Typography>
                        <Checkbox
                            checked={tempDoSearchBetweenDates}
                            onChange={(e) =>
                                setTempDoSearchBetweenDates(e.target.checked)
                            }
                        />
                    </FormControl>
                    {tempDoSearchBetweenDates && (
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
                                        value={tempFromDate}
                                        onChange={setTempFromDate}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        label="start time"
                                        className={dateTimeClasses.time}
                                        variant="dialog"
                                        value={tempFromDate}
                                        margin="normal"
                                        onChange={setTempFromDate}
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
                                        value={tempToDate}
                                        onChange={setTempToDate}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        label="end time"
                                        className={dateTimeClasses.time}
                                        variant="dialog"
                                        value={tempToDate}
                                        margin="normal"
                                        onChange={setTempToDate}
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
                <Button onClick={handleCancel} variant="outlined">
                    Cancel
                </Button>
                <Button
                    onClick={handleSearch}
                    variant="contained"
                    color="primary"
                >
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TuneSearchDialog;
