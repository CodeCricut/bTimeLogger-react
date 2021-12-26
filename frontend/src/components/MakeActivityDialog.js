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

const MakeActivityDialog = () => {
    const [typeState, { addType }] = useTypeRepository();
    const [activityState, { startNewActivity, createCompletedActivity }] =
        useActivityRepository();

    const [activityFormState, activityFormDispatch] = useActivityFormState();
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

    const [setModal, unsetModal] = useModalContext();

    async function handleCreate() {
        if (isActivityRunning) await handleCreateRunningActivity();
        else await handleCreateCompletedActivity();

        unsetModal();
    }

    return (
        <Dialog open>
            <DialogTitle>Start Activity</DialogTitle>
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
                    onClick={handleCreate}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );

    async function handleCreateRunningActivity() {
        // TODO: it is pretty messy to have to add a type just to add an activity. Ideally, we would have some nice function like startNewActivity(selectedTypeName, comment).
        if (invalidState) return;
        const type = await addType(new ActivityTypeModel("", typeName));
        const act = new ActivityModel(null, type._id, comment);
        await startNewActivity(act);
        setTypeName("");
    }

    async function handleCreateCompletedActivity() {
        // TODO: it is pretty messy to have to add a type just to add an activity. Ideally, we would have some nice function like
        // createCompletedActivity(typeName, comment, startTime, endTime)
        if (invalidState) return;
        const type = await addType(new ActivityTypeModel("", typeName));
        const act = new ActivityModel(
            null,
            type._id,
            comment,
            fromDate,
            toDate
        );
        await createCompletedActivity(act);
        setTypeName("");
    }
};

export default MakeActivityDialog;
