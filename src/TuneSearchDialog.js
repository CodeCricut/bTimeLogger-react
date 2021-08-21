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
import ActivityTypeSelect from "./ActivityTypeSelect";
import useDateTimeStyles from "./hooks/useDateTimeStyles";
import SearchParams from "./model/SearchParams";

const TuneSearchDialog = ({ isOpen, onClose, queryString, setQueryString }) => {
    const classes = useDialogFormStyles();
    const dateTimeClasses = useDateTimeStyles();

    const tSearchParams = SearchParams.parseQueryString(queryString);
    const [tempSearchParams, setTempSearchParams] = useState(tSearchParams);
    // useEffect(() => {
    //     setTempSearchParams(SearchParams.parseQueryString(queryString));
    // }, [queryString]);

    const setTempSearchParam = (paramName, paramValue) => {
        setTempSearchParams((prev) => ({
            ...prev,
            [paramName]: paramValue,
        }));
    };

    const [doSearchBetweenDates, setDoSearchBetweenDates] = useState(
        !!(tempSearchParams.fromDate || tempSearchParams.toDate)
    );

    const handleSearch = () => {
        const newQueryStr = new SearchParams(tempSearchParams).queryString;
        setQueryString(newQueryStr);
        onClose();
    };

    const handleCancel = () => {
        setTempSearchParams(SearchParams.parseQueryString(queryString));
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
                            value={tempSearchParams.searchTerm}
                            onChange={(e) =>
                                setTempSearchParam("searchTerm", e.target.value)
                            }
                            margin="dense"
                            variant="outlined"
                        />
                    </FormControl>
                    <Box className={classes.inputShort}>
                        <ActivityTypeSelect
                            selectedType={tempSearchParams.selectedType}
                            setSelectedType={(type) =>
                                setTempSearchParam("selectedType", type)
                            }
                        />
                    </Box>
                    <FormControl className={classes.labeledInput}>
                        <Typography className={classes.label}>
                            Search Between Dates
                        </Typography>
                        <Checkbox
                            checked={!!doSearchBetweenDates}
                            onChange={(e) =>
                                setDoSearchBetweenDates(e.target.checked)
                            }
                        />
                    </FormControl>
                    {doSearchBetweenDates && (
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
                                        value={
                                            tempSearchParams.fromDate ??
                                            new Date()
                                        }
                                        onChange={(date) =>
                                            setTempSearchParam("fromDate", date)
                                        }
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        label="start time"
                                        className={dateTimeClasses.time}
                                        variant="dialog"
                                        value={
                                            tempSearchParams.fromDate ??
                                            new Date()
                                        }
                                        margin="normal"
                                        onChange={(date) =>
                                            setTempSearchParam("fromDate", date)
                                        }
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
                                        className={
                                            dateTimeClasses.date ?? new Date()
                                        }
                                        disableToolbar
                                        variant="dialog"
                                        label="end date"
                                        format="MM/DD/yyyy"
                                        margin="normal"
                                        value={
                                            tempSearchParams.toDate ??
                                            new Date()
                                        }
                                        onChange={(date) =>
                                            setTempSearchParam("toDate", date)
                                        }
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        label="end time"
                                        className={dateTimeClasses.time}
                                        variant="dialog"
                                        value={tempSearchParams.toDate}
                                        onChange={(date) =>
                                            setTempSearchParam("toDate", date)
                                        }
                                        margin="normal"
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
