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

const lightTheme = createTheme({
    palette: {
        text: {
            primary: "#23272A",
            secondary: "#2C2F33",
        },
        background: {
            default: "#ECECEC",
            paper: "#F5F5F5",
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

const DARK = "DARK",
    LIGHT = "LIGHT";

export { darkTheme, lightTheme, DARK, LIGHT };
