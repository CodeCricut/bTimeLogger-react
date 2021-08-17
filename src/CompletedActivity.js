import React, { useState } from "react";
import { Select, MenuItem, Box, Typography, Tooltip } from "@material-ui/core";
import {
    MoreVert as VerticalDotsIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from "@material-ui/icons";
import Moment from "react-moment";

import EditActivityDialog from "./EditActivityDialog";
import useCompletedActivityStyles from "./hooks/useCompletedActivityStyles";
import { formatDuration } from "./util/timeFormatters";

const CompletedActivity = ({ activity }) => {
    const classes = useCompletedActivityStyles();

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
                    {activity.type.name}
                </Typography>
                <Box className={classes.dropdownContainer}>
                    {moreDropdownMenu()}
                </Box>
                <Typography
                    variant="subtitle1"
                    className={`${classes.time} ${classes.subtitle}`}
                >
                    <Moment>{activity.startTime}</Moment> -{" "}
                    <Moment>{activity.endTime}</Moment>
                </Typography>
                <Typography
                    variant="subtitle1"
                    className={`${classes.duration} ${classes.subtitle}`}
                >
                    {formatDuration(activity.startTime, activity.endTime)}
                    {activity.duration}
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default CompletedActivity;
