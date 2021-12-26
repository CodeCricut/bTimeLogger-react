import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import SettingsForm from "./SettingsForm.js";
const SettingsDialog = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <SettingsForm />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
