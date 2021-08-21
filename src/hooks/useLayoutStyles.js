import { makeStyles, alpha } from "@material-ui/core";

const useLayoutStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    layoutContainer: {
        height: "500px",
        overflow: "auto",
    },
    activities: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        maxHeight: "100%",
    },
    startActivityBox: {
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        margin: "auto",
        padding: "10px 0",
    },
}));

export default useLayoutStyles;
