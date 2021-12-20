import { ThemeProvider } from "@material-ui/core";
import React, { createContext, useContext, useState } from "react";

import { DARK, darkTheme, lightTheme } from "./theme.js";

const ThemeSwitcherContext = createContext();

/**
 * Global theme provider.
 */
const ThemeSwitcherProvider = ({ children }) => {
    const [theme, setTheme] = useState(DARK);
    const appTheme = theme === DARK ? { ...darkTheme } : { ...lightTheme };

    return (
        <ThemeSwitcherContext.Provider value={setTheme}>
            <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
        </ThemeSwitcherContext.Provider>
    );
};

/**
 * @returns {setTheme}
 */
const useThemeSwitcherContext = () => {
    return useContext(ThemeSwitcherContext);
};

export default ThemeSwitcherContext;
export { ThemeSwitcherProvider, useThemeSwitcherContext };
