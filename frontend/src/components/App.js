import React from "react";
import { CssBaseline } from "@material-ui/core";
import Moment from "react-moment";

import { MainProvider } from "../data/MainContext";
import { ThemeSwitcherProvider } from "../data/ThemeSwitcherContext";

import Layout from "./Layout";

// TODO: move config like this to own file
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
