import { makeStyles } from "@material-ui/core";

const useInlineStartActivityStyles = makeStyles((theme) => ({
    outline: {
        width: "100%",
        flexGrow: 1,
        minWidth: 300,
        padding: theme.spacing(1),
        margin: "0 auto",
    },
    formControl: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    formButtons: {},
    menuButton: {},
    select: {
        minWidth: 120,
        width: "50%",
    },
}));

export default useInlineStartActivityStyles;
