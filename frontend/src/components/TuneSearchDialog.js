import React from "react";
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
import useTuneFormState from "../hooks/useTuneFormState";
import TuneSearchForm from "./TuneSearchForm";

/**
 * @param {object} props
 * @param {boolean} props.isOpen Is the dialog open.
 * @param {function} props.onClose Callback to be called when the dialog should close.
 * @param {string} props.queryString The query string to base the search on.
 * @param {string} props.setQueryString Callback to be called when the user has confirmed their search settings.
 */
const TuneSearchDialog = ({ isOpen, onClose, queryString, setQueryString }) => {
    const [tuneFormState, tuneFormDispatch] = useTuneFormState(queryString);
    const { searchParams, invalidState } = tuneFormState;

    function handleCancel() {
        // TODO: reset form state
        onClose();
    }

    function handleSearch() {
        setQueryString(searchParams.queryString);
        onClose();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <TuneSearchForm
                    tuneFormState={tuneFormState}
                    tuneFormDispatch={tuneFormDispatch}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} variant="outlined">
                    Cancel
                </Button>
                <Button
                    disabled={invalidState}
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
