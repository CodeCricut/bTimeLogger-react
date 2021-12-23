export default {
    form: {
        "& > *": {
            width: 1,
            marginBottom: 3,
        },
    },
    labeledInput: {
        display: "grid",
        gridTemplateColumns: "100px auto 4fr 2fr",
        gridTemplateColumns: {
            xs: "1fr",
            sm: "",
        },
        alignItems: "center",
    },
    label: {
        color: "secondary.main",
        fontSize: "12",
    },
    inputShort: {
        gridColumn: {
            md: "3 / 4",
        },
    },
    inputLong: {
        gridColumn: {
            md: "3 / 4",
        },
    },
};
