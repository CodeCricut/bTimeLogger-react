import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import SettingsForm from "./SettingsForm.js";
import { useModalContext } from "../modals/ModalProvider.js";

const SettingsDialog = () => {
    const [setModal, unsetModal] = useModalContext();

    return (
        <Dialog open>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <SettingsForm />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={unsetModal}
                    variant="contained"
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
