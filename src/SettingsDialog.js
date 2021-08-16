import {
    FormControlLabel,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    FormControl,
    DialogActions,
    Button,
    useTheme,
    makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import useDialogFormStyles from "./hooks/useDialogFormStyles";

const useSettingsStyles = makeStyles((theme) => ({
    content: {
        minWidth: "50vw",
    },
}));
const SettingsDialog = ({ isOpen, onClose }) => {
    const classes = useDialogFormStyles();
    const settingsClasses = useSettingsStyles();

    const [darkTheme, setDarkTheme] = useState(true);

    const handleDarkThemeChange = (e) => setDarkTheme(e.target.checked);

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Box className={`${classes.form} ${settingsClasses.content}`}>
                    <FormControl className={classes.labeledInput}>
                        <FormControlLabel
                            className={classes.label}
                            control={
                                <Switch
                                    className={classes.inputShort}
                                    checked={darkTheme}
                                    color="primary"
                                    onChange={handleDarkThemeChange}
                                />
                            }
                            label="Dark Theme"
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
