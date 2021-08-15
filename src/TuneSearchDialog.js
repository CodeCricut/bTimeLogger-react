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

const TuneSearchDialog = ({ isOpen, onClose }) => {
    const [selectedType, setSelectedType] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <FormControl>
                    <InputLabel id="activity-type-label">
                        Activity Type
                    </InputLabel>
                    <Select
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
                    <TextField helperText="Search term" />

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/DD/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="From"
                            value={fromDate}
                            onChange={(date) => setFromDate(date)}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/DD/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="To"
                            value={toDate}
                            onChange={(date) => setToDate(date)}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
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
