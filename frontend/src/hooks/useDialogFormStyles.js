import { makeStyles } from "@material-ui/core";

const useDialogFormStyles = makeStyles((theme) => ({
    form: {
        "& > *": {
            width: "100%",
            marginBottom: theme.spacing(3),
        },
    },
    labeledInput: {
        display: "grid",
        gridTemplateColumns: "100px auto 4fr 2fr",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
        },
        alignItems: "center",
    },
    label: {
        color: theme.palette.secondary.main,
        fontSize: 12,
    },
    inputShort: {
        [theme.breakpoints.up("md")]: {
            gridColumn: "3 / 4",
        },
    },
    inputLong: {
        [theme.breakpoints.up("md")]: {
            gridColumn: "3 / 5",
        },
    },
}));

export default useDialogFormStyles;
