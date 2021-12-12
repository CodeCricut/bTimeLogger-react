import { makeStyles } from "@material-ui/core";

const useDateTimeStyles = makeStyles((theme) => ({
    dateTimeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        alignContent: "flex-end",
    },
    date: {
        marginRight: theme.spacing(1),
    },
    time: {
        marginLeft: theme.spacing(1),
    },
}));

export default useDateTimeStyles;
