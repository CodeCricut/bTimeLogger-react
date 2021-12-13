import { makeStyles, alpha } from "@material-ui/core";

const useSearchAppBarStyles = makeStyles((theme) => ({
    toolBar: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr auto",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr 11fr auto",
        },
    },
    toolBarHeader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",

        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,

        width: "100%",
        [theme.breakpoints.down("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        // position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tuneIcon: {
        marginRight: theme.spacing(1),
        height: "100%",
        color: "inherit",
    },
    queryString: {
        color: theme.palette.text.secondary,
        margin: "0 10px",
        padding: theme.spacing(1),
        overflow: "hidden",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    searchStart: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 1,
    },
    barRight: {
        display: "flex",
        flexDirection: "row-reverse",
    },
}));

export default useSearchAppBarStyles;