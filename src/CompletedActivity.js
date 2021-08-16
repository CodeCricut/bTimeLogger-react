import React, { useState } from "react";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    makeStyles,
    IconButton,
    Box,
    Paper,
    Typography,
    Tooltip,
} from "@material-ui/core";
import {
    MoreVert as VerticalDotsIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from "@material-ui/icons";
import EditActivityDialog from "./EditActivityDialog";

const useStyles = makeStyles((theme) => ({
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
    },
    moreSelectIcon: {
        fill: theme.palette.text.primary,
    },
}));

const CompletedActivity = ({ activity }) => {
    const classes = useStyles();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
        setIsTooltipOpen(false);
    };
    const handleDropdownClose = () => setIsDropdownOpen(false);

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleEditOpen = () => setIsEditOpen(true);
    const handleEditClose = () => setIsEditOpen(false);

    const moreDropdownMenu = () => (
        <Tooltip title="Options" open={isTooltipOpen}>
            <Select
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
                inputProps={{
                    classes: {
                        root: classes.moreSelectRoot,
                        icon: classes.moreSelectIcon,
                    },
                }}
                open={isDropdownOpen}
                onOpen={handleDropdownOpen}
                onClose={handleDropdownClose}
                disableUnderline
                IconComponent={VerticalDotsIcon}
            >
                <MenuItem className={classes.menuItem} onClick={handleEditOpen}>
                    <EditIcon className={classes.dropdownIcon} />
                    Edit
                </MenuItem>
                <MenuItem className={classes.menuItem}>
                    <DeleteIcon className={classes.dropdownIcon} />
                    Delete
                </MenuItem>
            </Select>
        </Tooltip>
    );
    return (
        <React.Fragment>
            <EditActivityDialog
                isOpen={isEditOpen}
                onClose={handleEditClose}
                activityId={0}
            />
            <Box className={classes.activityBox}>
                <Typography variant="h6" className={classes.activityName}>
                    {activity.name}
                </Typography>
                <Box className={classes.dropdownContainer}>
                    {moreDropdownMenu()}
                </Box>
                <Typography variant="subtitle1" className={classes.time}>
                    {activity.startTime} - {activity.endTime}
                </Typography>
                <Typography variant="subtitle1" className={classes.duration}>
                    {activity.duration}
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default CompletedActivity;
