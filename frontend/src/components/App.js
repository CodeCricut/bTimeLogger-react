import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeSwitcherProvider } from "../style/ThemeSwitcherContext";

import Layout from "./Layout";

function App() {
    return (
        <ThemeSwitcherProvider>
            <CssBaseline />
            <Layout />
        </ThemeSwitcherProvider>
    );
}

export default App;
