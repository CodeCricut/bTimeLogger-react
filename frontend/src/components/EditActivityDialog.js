import React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
} from "@mui/material";

import ActivityForm from "./ActivityForm.js";
import { ActivityModel } from "../activities/ActivityModel.js";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel.js";
import useActivityFormState from "../hooks/useActivityFormState.js";
import { useActivityRepository } from "../activities/useActivityRepository.js";
import { useTypeRepository } from "../activity-types/useTypeRepository.js";
import { useModalContext } from "../modals/ModalProvider.js";

const EditActivityDialog = ({ activity }) => {
    const [activityFormState, activityFormDispatch] =
        useActivityFormState(activity);
    const [setModal, unsetModal] = useModalContext();

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

    return (
        <Dialog open>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogContent>
                <ActivityForm
                    activityFormState={activityFormState}
                    activityFormDispatch={activityFormDispatch}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={unsetModal}>Cancel</Button>
                <Button
                    disabled={invalidState}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                >
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );

    async function handleEdit() {
        if (isActivityRunning) await handleEditAsRunningActivity();
        else await handleEditAsCompletedActivity();

        unsetModal();
    }

    async function handleEditAsRunningActivity() {}
    async function handleEditAsCompletedActivity() {}
};

export default EditActivityDialog;
