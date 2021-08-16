import { makeStyles } from "@material-ui/core";
const useCompletedActivityStyles = makeStyles((theme) => ({
    activityBox: {
        display: "grid",
        // gridTemplateColumns: "[title-start] 300px 100px [title-end] 50px",
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
    dropdownContainer: {
        gridRow: "1 / 3",
        gridColumn: "3",
        margin: 0,
        height: "fit-content",
        alignSelf: "center",
    },
    time: {
        gridRow: "2",
        gridColumn: "1",
    },
    duration: {
        gridRow: "2",
        gridColumn: "2 / 3",
    },
    menuItem: {
        minWidth: "200px",
    },
    dropdownIcon: {
        marginRight: "20px",
    },
    moreSelectRoot: {
        "&:before": {
            borderColor: theme.palette.text.primary,
        },
        "&:after": {
            borderColor: theme.palette.text.primary,
        },
        backgroundColor: "transparent!important", // yeah yeah
    },
    moreSelectIcon: {
        fill: theme.palette.text.primary,
    },
    subtitle: {
        fontSize: 12,
        color: theme.palette.text.secondary,
    },
}));

export default useCompletedActivityStyles;
