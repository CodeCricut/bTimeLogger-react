import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "@fontsource/roboto";
import axios from "axios";

// TODO: move config like this to own file
axios.defaults.baseURL = `http://localhost:3001`;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
