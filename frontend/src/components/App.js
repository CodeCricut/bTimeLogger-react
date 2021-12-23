import React, { useState } from "react";
import { CssBaseline } from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { ThemeSwitcherProvider } from "../style/ThemeSwitcherContext";

import Layout from "./Layout";
import { ActivityProvider } from "../activities/ActivityContext";
import { ActivityTypeProvider } from "../activity-types/ActivityTypeContext";

function App() {
    return (
        <ThemeSwitcherProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ActivityProvider>
                    <ActivityTypeProvider>
                        <CssBaseline />
                        <Layout />
                    </ActivityTypeProvider>
                </ActivityProvider>
            </LocalizationProvider>
        </ThemeSwitcherProvider>
    );
}

export default App;
