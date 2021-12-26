export default {
    form: {
        "& > *": {
            width: 1,
            marginBottom: "5px",
        },
        minWidth: {
            xs: "50vw",
            md: "30vw",
        },
    },
    labeledInput: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            sm: "2fr 4fr",
        },
        alignItems: "center",
    },
    label: {
        color: "secondary.main",
        fontSize: "12",
    },
    inputShort: {
        gridColumn: {
            xs: "1",
            sm: "2",
        },
    },
    inputLong: {
        gridColumn: "1 / -1",
    },
    dateTimeContainer: {
        gridColumn: "1 / -1",
        padding: "10px 0",
    },
};
