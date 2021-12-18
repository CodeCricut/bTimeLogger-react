import React from "react";
import { CssBaseline } from "@material-ui/core";
import Moment from "react-moment";

import { ThemeSwitcherProvider } from "../style/ThemeSwitcherContext";

import Layout from "./Layout";

// TODO: move config like this to own file
Moment.globalFormat = "MM/DD HH:mm";

function App() {
    return (
        <ThemeSwitcherProvider>
            <CssBaseline />
            <Layout />
        </ThemeSwitcherProvider>
    );
}

export default App;
