import {
    Button,
    Box,
    Drawer,
    TextField,
    MenuItem,
    Select,
    List,
    ListItem,
    ListItemText,
    Divider,
    Container,
    Paper,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core";
import React, { useRef, useState } from "react";

const activityTypes = ["Sleep", "Coding", "Active Coding"];

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
    form: {
        display: "flex",
        flexDirection: "column",
    },

    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogClose = (value) => {
        console.log(`dialog closed with value ${value}`);
        setIsDialogOpen(false);
    };

    const appBar = () => (
        <AppBar position="static">
            <Toolbar>
                <Button onClick={() => setIsDrawerOpen(true)}>Open</Button>
                <Typography variant="h6">bTimeLogger</Typography>
                <Button>Login</Button>
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
            <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
            <MyDialog onClose={handleDialogClose} open={isDialogOpen} />
        </React.Fragment>
    );
}

const MyDialog = ({ onClose, open }) => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [activityType, setActivityType] = useState("");

    const form = () => (
        <form noValidate autoComplete="off" className={classes.form}>
            <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
            >
                {activityTypes.map((actType, index) => (
                    <MenuItem key={index} value={actType}>
                        {actType}
                    </MenuItem>
                ))}
            </Select>
        </form>
    );

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Start Activity</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Start tracking an activity.
                </DialogContentText>
                {form()}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)}>Cancel</Button>
                <Button onClick={() => onClose(true)}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};
export default App;
