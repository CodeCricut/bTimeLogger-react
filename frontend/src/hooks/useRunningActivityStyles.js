import { makeStyles } from "@material-ui/core";
const useRunningActivityStyles = makeStyles((theme) => ({
    activityBox: {
        display: "grid",
        gridTemplateColumns: "[title-start] 3fr 1fr [title-end] 50px",
        width: "100%",
        overflow: "hidden",
        "& *": {
            overflow: "hidden",
        },
    },
    activityName: {
        gridColumn: "title-start",
        fontSize: 16,
    },
    stopButton: {
        gridRow: "1 / 3",
        gridColumn: "3",
        margin: 0,
        height: "fit-content",
        alignSelf: "center",
        color: theme.palette.error.main,
    },
    time: {
        gridRow: "2",
        gridColumn: "1",
    },
    duration: {
        gridRow: "2",
        gridColumn: "2 / 3",
    },
    subtitle: {
        fontSize: 12,
        color: theme.palette.text.secondary,
    },
}));

export default useRunningActivityStyles;
