import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { darkTheme } from "./theme";

import Layout from "./Layout";
import { MainProvider } from "./data/MainContext";
import Moment from "react-moment";

Moment.globalFormat = "MM/DD HH:mm";
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <MainProvider>
                {/* <ActivityTypeProvider>
                <ActivityProvider> */}
                <CssBaseline />
                <Layout />
                {/* </ActivityProvider>
            </ActivityTypeProvider> */}
            </MainProvider>
        </ThemeProvider>
    );
}
export default App;
