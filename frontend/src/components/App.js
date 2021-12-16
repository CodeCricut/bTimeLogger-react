import React from "react";
import { CssBaseline } from "@material-ui/core";
import Moment from "react-moment";

import { ActivityTypeProvider } from "../activity-types/ActivityTypeContext.js";
import { ActivityProvider } from "../activities/ActivityContext";
import { ThemeSwitcherProvider } from "../style/ThemeSwitcherContext";

import Layout from "./Layout";

// TODO: move config like this to own file
Moment.globalFormat = "MM/DD HH:mm";

function App() {
    return (
        <ActivityProvider>
            <ActivityTypeProvider>
                <ThemeSwitcherProvider>
                    <CssBaseline />
                    <Layout />
                </ThemeSwitcherProvider>
            </ActivityTypeProvider>
        </ActivityProvider>
    );
}

export default App;
