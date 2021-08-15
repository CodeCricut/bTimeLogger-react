import React, { useState } from "react";
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
} from "@material-ui/core";
import { Search as SearchIcon, Menu as MenuIcon } from "@material-ui/icons";

import { makeStyles, alpha } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    toolBar: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr 11fr",
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
        // margin: "auto",
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,

        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const Layout = () => {
    const classes = useStyles();

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const appBar = () => (
        <AppBar position="static">
            <Toolbar className={classes.toolBar}>
                <div className={classes.toolBarHeader}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        bTimeLogger
                    </Typography>
                </div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );

    const drawerList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setIsDrawerOpen(false)}
            onKeyDown={() => setIsDrawerOpen(false)}
        >
            <div className={classes.drawerHeader}>
                <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
            </div>
            <Divider />
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );
    return (
        <React.Fragment>
            {appBar()}
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                {drawerList()}
            </Drawer>
            <Button onClick={() => setIsDrawerOpen(true)}>Open Sidebar</Button>
        </React.Fragment>
    );
};

export default Layout;
