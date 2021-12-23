import React, { useState, useEffect } from "react";

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
} from "@mui/material";

import ActivityForm from "./ActivityForm.js";
import { ActivityModel } from "../activities/ActivityModel.js";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel.js";
import useActivityFormState from "../hooks/useActivityFormState.js";

const StartActivityDialog = ({ isOpen, onClose }) => {
    const [activityFormState, activityFormDispatch] = useActivityFormState();
    const { activity, isActivityRunning, invalidState } = activityFormState;

    const handleCreate = () => {
        if (isActivityRunning) {
            console.log("create running act");
        } else {
            console.log("create completed act");
        }
        console.dir(activity);
        onClose();
    };

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Start Activity</DialogTitle>
            <DialogContent>
                <ActivityForm
                    activityFormState={activityFormState}
                    activityFormDispatch={activityFormDispatch}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    disabled={invalidState}
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
