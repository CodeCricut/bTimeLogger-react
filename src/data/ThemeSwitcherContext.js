import { ThemeProvider } from "@material-ui/core";
import React, { createContext, useContext, useReducer, useState } from "react";

import { DARK, darkTheme, LIGHT, lightTheme } from "../theme";

const ThemeSwitcherContext = createContext();

// const TOGGLE_THEME = "TOGGLE_THEME",
//     SET_DARK_THEME = "SET_DARK_THEME",
//     SET_LIGHT_THEME = "SET_LIGHT_THEME";

// const reducer = (state, { type, payload }) => {
//     switch (type) {
//         case TOGGLE_THEME:
//             const newTheme = state.isDarkTheme
//                 ? { ...lightTheme }
//                 : { ...darkTheme };
//             return {
//                 ...state,
//                 isDarkTheme: !state.isDarkTheme,
//                 theme: { newTheme },
//             };
//         case SET_DARK_THEME:
//             return {
//                 ...state,
//                 isDarkTheme: true,
//                 theme: { ...darkTheme },
//             };
//         case SET_LIGHT_THEME:
//             return {
//                 ...state,
//                 isDarkTheme: false,
//                 theme: { ...lightTheme },
//             };
//     }
// };

// const initialState = {
//     isDarkTheme: true,
//     theme: {...}
// }

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
