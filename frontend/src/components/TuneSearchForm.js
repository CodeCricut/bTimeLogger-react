import React from "react";

import {
    Box,
    FormControl,
    Typography,
    TextField,
    Checkbox,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";

import { useTypeRepository } from "../activity-types/useTypeRepository.js";
import ActivityTypeSelect from "./ActivityTypeSelect";

import styles from "../style/formStyles.js";
import useDate from "../hooks/useDate.js";

const TuneSearchForm = ({ tuneFormState, tuneFormDispatch }) => {
    const currentDate = useDate();
    const { searchParams, doSearchBetweenDates, invalidState } = tuneFormState;
    const {
        setSearchTerm,
        setSelectedType,
        setDoSearchBetweenDates,
        setFromDate,
        setToDate,
    } = tuneFormDispatch;

    const [typeState, _] = useTypeRepository();

    return (
        <Box sx={styles.form}>
            <FormControl sx={styles.labeledInput}>
                <Typography sx={styles.label}>Search Term</Typography>
                <TextField
                    sx={styles.inputLong}
                    margin="dense"
                    variant="outlined"
                    value={searchParams.searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </FormControl>

            <Box sx={styles.inputShort}>
                <ActivityTypeSelect
                    types={typeState.types}
                    onEnter={() => {}}
                    selectedType={searchParams.selectedType}
                    setSelectedType={setSelectedType}
                />
            </Box>

            <FormControl sx={styles.labeledInput}>
                <Typography sx={styles.label}>Search Between Dates</Typography>
                <Checkbox
                    checked={!!doSearchBetweenDates}
                    onChange={(e) => setDoSearchBetweenDates(e.target.checked)}
                />
            </FormControl>

            {doSearchBetweenDates && (
                <>
                    <FormControl sx={styles.labeledInput}>
                        <Typography sx={styles.label}>From</Typography>
                        <Box
                            sx={{
                                ...styles.inputLong,
                                ...styles.dateTimeContainer,
                            }}
                        >
                            <DatePicker
                                sx={styles.date}
                                label="date"
                                format="MM/DD/yyyy"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={searchParams.fromDate ?? currentDate}
                                onChange={setFromDate}
                            />
                            <TimePicker
                                sx={styles.time}
                                label="time"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={searchParams.fromDate ?? currentDate}
                                onChange={setFromDate}
                            />
                        </Box>
                    </FormControl>

                    <FormControl sx={styles.labeledInput}>
                        <Typography sx={styles.label}>To</Typography>
                        <Box
                            sx={{
                                ...styles.inputLong,
                                ...styles.dateTimeContainer,
                            }}
                        >
                            <DatePicker
                                sx={styles.date}
                                label="date"
                                format="MM/DD/yyyy"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={searchParams.toDate ?? currentDate}
                                onChange={setToDate}
                            />
                            <TimePicker
                                sx={styles.time}
                                label="time"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={searchParams.toDate ?? currentDate}
                                onChange={setToDate}
                            />
                        </Box>
                    </FormControl>
                </>
            )}
        </Box>
    );
};

export default TuneSearchForm;
