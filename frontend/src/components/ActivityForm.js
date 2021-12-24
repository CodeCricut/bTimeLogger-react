import React, { useEffect } from "react";
import {
    Box,
    FormControl,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";

import { useTypeRepository } from "../activity-types/useTypeRepository.js";
import ActivityTypeSelect from "./ActivityTypeSelect";

import styles from "../style/formStyles.js";
import { ActivityModel } from "../activities/ActivityModel.js";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel.js";
import useActivityFormState from "../hooks/useActivityFormState.js";

const ActivityForm = ({ activityFormState, activityFormDispatch }) => {
    const {
        typeName,
        comment,
        fromDate,
        toDate,
        isActivityRunning,
        invalidState,
    } = activityFormState;
    const {
        setTypeName,
        setComment,
        setFromDate,
        setToDate,
        setIsActivityRunning,
    } = activityFormDispatch;

    const [typeState, { addType }] = useTypeRepository();

    return (
        <Box sx={styles.form}>
            <Box sx={styles.inputShort}>
                <ActivityTypeSelect
                    types={typeState.types}
                    onEnter={() => {}}
                    selectedType={typeName}
                    setSelectedType={setTypeName}
                />
            </Box>
            <FormControl sx={styles.labeledInput}>
                <Typography sx={styles.label}>Comment</Typography>
                <TextField
                    sx={styles.inputLong}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    multiline
                    margin="dense"
                    variant="outlined"
                />
            </FormControl>

            <FormControl styles={styles.labeledInput}>
                <Typography styles={styles.label}>Status</Typography>
                <Select
                    fullWidth
                    styles={styles.inputShort}
                    value={isActivityRunning}
                    onChange={(e) => setIsActivityRunning(e.target.value)}
                    labelId="activity-status-label"
                >
                    <MenuItem value={false} key="COMPLETED">
                        Completed
                    </MenuItem>
                    <MenuItem value={true} key="RUNNING">
                        Running
                    </MenuItem>
                </Select>
            </FormControl>

            {!isActivityRunning && (
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
                                label="start date"
                                format="MM/DD/yyyy"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={fromDate}
                                onChange={setFromDate}
                            />
                            <TimePicker
                                sx={styles.time}
                                label="start time"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={fromDate}
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
                                label="end date"
                                format="MM/DD/yyyy"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={toDate}
                                onChange={setToDate}
                            />
                            <TimePicker
                                sx={styles.time}
                                label="end time"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={toDate}
                                onChange={setToDate}
                            />
                        </Box>
                    </FormControl>
                </>
            )}
        </Box>
    );
};

export default ActivityForm;
