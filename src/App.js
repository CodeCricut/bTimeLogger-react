import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { DARK, darkTheme, lightTheme } from "./theme";

import Layout from "./Layout";
import { MainProvider } from "./data/MainContext";
import Moment from "react-moment";
import {
    ThemeSwitcherProvider,
    useThemeSwitcherContext,
} from "./data/ThemeSwitcherContext";

Moment.globalFormat = "MM/DD HH:mm";
function App() {
    return (
        <MainProvider>
            <ThemeSwitcherProvider>
                <CssBaseline />
                <Layout />
            </ThemeSwitcherProvider>
        </MainProvider>
    );
}
export default App;
