import { createTheme } from "@material-ui/core";

const darkTheme = createTheme({
    palette: {
        text: {
            primary: "#FFFFFF",
            secondary: "#cccccc",
        },
        background: {
            default: "#373547",
            paper: "#2d2b40",
        },
        primary: {
            light: "#879eed",
            main: "#7289DA",
            dark: "#5469b3",
        },
        secondary: {
            light: "#a4aaab",
            main: "#86898a",
            dark: "#3f4242",
        },
        error: {
            main: "#f44336",
        },
    },
});

export { darkTheme };
