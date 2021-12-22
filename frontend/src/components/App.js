import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeSwitcherProvider } from "../style/ThemeSwitcherContext";

import Layout from "./Layout";
import { ActivityProvider } from "../activities/ActivityContext";
import { ActivityTypeProvider } from "../activity-types/ActivityTypeContext";

function App() {
    return (
        <ThemeSwitcherProvider>
            <ActivityProvider>
                <ActivityTypeProvider>
                    <CssBaseline />
                    <Layout />
                </ActivityTypeProvider>
            </ActivityProvider>
        </ThemeSwitcherProvider>
    );
}

export default App;
