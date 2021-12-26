import React from "react";
import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import formStyles from "../style/formStyles.js";
import { useThemeSwitcherContext } from "../style/ThemeSwitcherContext";
import { DARK, LIGHT } from "../style/theme";

const settingsStyles = {
    content: {
        minWidth: "40vw",
    },
};

const SettingsForm = () => {
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
        <Box
            sx={{
                ...formStyles.form,
                ...settingsStyles.content,
            }}
        >
            <FormControl sx={formStyles.labeledInput}>
                <FormControlLabel
                    sx={formStyles.label}
                    control={
                        <Switch
                            sx={formStyles.inputShort}
                            checked={isDarkTheme}
                            color="primary"
                            onChange={handleDarkThemeChange}
                        />
                    }
                    label="Dark Theme"
                />
            </FormControl>
        </Box>
    );
};

export default SettingsForm;
