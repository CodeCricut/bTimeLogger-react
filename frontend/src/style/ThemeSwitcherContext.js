import { ThemeProvider } from "@material-ui/core";
import React, { createContext, useContext, useState } from "react";

import { DARK, darkTheme, lightTheme } from ".";

const ThemeSwitcherContext = createContext();

const ThemeSwitcherProvider = ({ children }) => {
    const [theme, setTheme] = useState(DARK);
    const appTheme = theme === DARK ? { ...darkTheme } : { ...lightTheme };

    return (
        <ThemeSwitcherContext.Provider value={[theme, setTheme]}>
            <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
        </ThemeSwitcherContext.Provider>
    );
};

const useThemeSwitcherContext = () => {
    return useContext(ThemeSwitcherContext);
};

export default ThemeSwitcherContext;
export { ThemeSwitcherProvider, useThemeSwitcherContext };
