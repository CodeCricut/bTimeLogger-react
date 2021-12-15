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
    makeStyles,
} from "@material-ui/core";
import React from "react";
import { useThemeSwitcherContext } from "../data/ThemeSwitcherContext";
import useDialogFormStyles from "../hooks/useDialogFormStyles";
import { DARK, LIGHT } from "../theme";

const useSettingsStyles = makeStyles((theme) => ({
    content: {
        minWidth: "40vw",
    },
}));

const SettingsDialog = ({ isOpen, onClose }) => {
    const classes = useDialogFormStyles();
    const settingsClasses = useSettingsStyles();

    const [theme, setTheme] = useThemeSwitcherContext();
    const isDarkTheme = theme === DARK;

    const handleDarkThemeChange = (e) => {
        if (e.target.checked) {
            setTheme(DARK);
        } else {
            setTheme(LIGHT);
        }
    };

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
                                    checked={isDarkTheme}
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
                <Button onClick={onClose} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
