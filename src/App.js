import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { darkTheme } from "./theme";

import Layout from "./Layout";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout />
        </ThemeProvider>
    );
}
export default App;
